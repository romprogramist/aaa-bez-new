import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { prisma } from "../../../lib/prisma";

interface ApplicationData {
  name: string;
  company?: string;
  position?: string;
  email?: string;
  phone: string;
  comments?: string;
  // анти-спам поля (заполняются формой, не пользователем)
  website?: string; // honeypot: настоящий человек его не видит и не заполняет
  formLoadedAt?: number; // время открытия формы, мс
}

// Минимальное время заполнения формы человеком
const MIN_FILL_MS = 3000;
// Окно дедупликации: та же заявка в этот срок письмо не порождает
const DEDUPE_WINDOW_MS = 10 * 60 * 1000;
// Лимит заявок с одного IP
const IP_LIMIT = 3;
const IP_WINDOW_MS = 10 * 60 * 1000;

const MAX_LEN: Record<string, number> = {
  name: 100,
  company: 150,
  position: 100,
  email: 150,
  phone: 30,
  comments: 2000,
};

const ipHits = new Map<string, number[]>();

function getIp(request: NextRequest): string {
  const fwd = request.headers.get("x-forwarded-for");
  return fwd ? fwd.split(",")[0].trim() : "unknown";
}

function tooManyFromIp(ip: string): boolean {
  const now = Date.now();
  const hits = (ipHits.get(ip) || []).filter((t) => now - t < IP_WINDOW_MS);
  hits.push(now);
  ipHits.set(ip, hits);
  if (ipHits.size > 5000) ipHits.clear(); // страховка от роста памяти
  return hits.length > IP_LIMIT;
}

function esc(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function clean(v: unknown, field: string): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, MAX_LEN[field] ?? 200);
}

// Ссылки в тексте — практически всегда спам-рассылка
function looksLikeSpam(d: { name: string; comments: string; company: string }): boolean {
  const text = `${d.name} ${d.company} ${d.comments}`;
  if (/https?:\/\/|\[url|<a\s|\bwww\./i.test(text)) return true;
  // имя из случайных букв без гласных: lAGhTwGtqupanjEzlsNn
  if (/^[A-Za-z]{12,}$/.test(d.name) && !/[аеёиоуыэюя]/i.test(d.name)) return true;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const ip = getIp(request);

    // Запрос должен приходить с самого сайта, а не из curl/бота
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");
    if (origin && host && !origin.endsWith(host)) {
      return NextResponse.json({ error: "Недопустимый источник" }, { status: 403 });
    }

    const raw: ApplicationData = await request.json();

    // Honeypot: поле скрыто от людей — заполнено, значит бот.
    // Отвечаем «успехом», чтобы бот не подбирал обход.
    if (typeof raw.website === "string" && raw.website.trim() !== "") {
      console.warn(`[application] honeypot triggered, ip=${ip}`);
      return NextResponse.json({ success: true });
    }

    // Слишком быстрое заполнение — тоже бот
    if (
      typeof raw.formLoadedAt === "number" &&
      Date.now() - raw.formLoadedAt < MIN_FILL_MS
    ) {
      console.warn(`[application] too fast, ip=${ip}`);
      return NextResponse.json({ success: true });
    }

    const data = {
      name: clean(raw.name, "name"),
      company: clean(raw.company, "company"),
      position: clean(raw.position, "position"),
      email: clean(raw.email, "email"),
      phone: clean(raw.phone, "phone"),
      comments: clean(raw.comments, "comments"),
    };

    if (!data.name || !data.phone) {
      return NextResponse.json(
        { error: "Имя и телефон обязательны" },
        { status: 400 }
      );
    }

    // В телефоне должно быть хотя бы 5 цифр
    const digits = data.phone.replace(/\D/g, "");
    if (digits.length < 5) {
      return NextResponse.json({ error: "Некорректный телефон" }, { status: 400 });
    }

    if (looksLikeSpam(data)) {
      console.warn(`[application] spam pattern, ip=${ip}, name=${data.name}`);
      return NextResponse.json({ success: true });
    }

    if (tooManyFromIp(ip)) {
      console.warn(`[application] ip rate limit, ip=${ip}`);
      return NextResponse.json(
        { error: "Слишком много заявок. Попробуйте позже или позвоните нам." },
        { status: 429 }
      );
    }

    // Дедупликация: тот же телефон недавно — заявку сохраняем, письмо не дублируем
    const recent = await prisma.application.findFirst({
      where: {
        phone: data.phone,
        createdAt: { gte: new Date(Date.now() - DEDUPE_WINDOW_MS) },
      },
      orderBy: { createdAt: "desc" },
    });

    await prisma.application.create({
      data: {
        ...data,
        company: data.company || null,
        position: data.position || null,
        email: data.email || null,
        comments: data.comments || null,
        ip,
        userAgent: request.headers.get("user-agent")?.slice(0, 300) || null,
        emailed: !recent,
      },
    });

    if (recent) {
      console.warn(`[application] duplicate within window, phone=${data.phone}`);
      return NextResponse.json({ success: true });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const html = `
      <h2>Новая заявка с сайта aaabez.ru</h2>
      <p><b>Имя:</b> ${esc(data.name)}</p>
      <p><b>Телефон:</b> ${esc(data.phone)}</p>
      ${data.company ? `<p><b>Компания:</b> ${esc(data.company)}</p>` : ""}
      ${data.position ? `<p><b>Должность:</b> ${esc(data.position)}</p>` : ""}
      ${data.email ? `<p><b>Email:</b> ${esc(data.email)}</p>` : ""}
      ${data.comments ? `<p><b>Комментарий:</b> ${esc(data.comments)}</p>` : ""}
      <hr>
      <p style="color:#888;font-size:12px">IP: ${esc(ip)}</p>
    `;

    const recipients = (process.env.SMTP_RECIPIENTS || "").split(";").join(", ");

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: recipients,
      subject: "Заявка",
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send application:", error);
    return NextResponse.json(
      { error: "Ошибка отправки" },
      { status: 500 }
    );
  }
}
