import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ApplicationData {
  name: string;
  company?: string;
  position?: string;
  email?: string;
  phone: string;
  comments?: string;
}

export async function POST(request: Request) {
  try {
    const data: ApplicationData = await request.json();

    if (!data.name || !data.phone) {
      return NextResponse.json(
        { error: "Имя и телефон обязательны" },
        { status: 400 }
      );
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
      <p><b>Имя:</b> ${data.name}</p>
      <p><b>Телефон:</b> ${data.phone}</p>
      ${data.company ? `<p><b>Компания:</b> ${data.company}</p>` : ""}
      ${data.position ? `<p><b>Должность:</b> ${data.position}</p>` : ""}
      ${data.email ? `<p><b>Email:</b> ${data.email}</p>` : ""}
      ${data.comments ? `<p><b>Комментарий:</b> ${data.comments}</p>` : ""}
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
