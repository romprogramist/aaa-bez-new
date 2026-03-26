"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Application from "@/components/Application";

type Partner = {
  id: string;
  name: string;
  description: string | null;
  logo: string;
  order: number;
};

type AssortmentItem = {
  id: string;
  title: string;
  description: string | null;
  image: string;
  order: number;
};

type Customer = {
  id: string;
  name: string;
  order: number;
};

const industries = [
  {
    icon: "🛢",
    title: "Нефтегазовая промышленность",
    text: "Скважины, платформы и перерабатывающие заводы — оборудование для высокой концентрации углеводородов",
  },
  {
    icon: "⚗",
    title: "Химическая промышленность",
    text: "Производственные цеха, лаборатории и склады с легковоспламеняющимися газами и жидкостями",
  },
  {
    icon: "⛏",
    title: "Горнодобывающая промышленность",
    text: "Шахты и рудники с метаном и угольной пылью — предотвращение аварий",
  },
  {
    icon: "⚡",
    title: "Энергетика",
    text: "Электростанции на ископаемом топливе — оборудование для взрывоопасных сред",
  },
  {
    icon: "🌾",
    title: "Сельское хозяйство",
    text: "Хранилища зерна и кормов — защита от пылевых взвесей, способных привести к взрыву",
  },
];

const stats = [
  { num: "10+", label: "лет на рынке" },
  { num: "500+", label: "проектов" },
  { num: "50+", label: "партнёров" },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
};

export default function ExplosionProofContent() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [assortment, setAssortment] = useState<AssortmentItem[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [activeItem, setActiveItem] = useState<AssortmentItem | null>(null);

  useEffect(() => {
    fetch("/api/partners")
      .then((r) => r.json())
      .then(setPartners);
    fetch("/api/assortment")
      .then((r) => r.json())
      .then(setAssortment);
    fetch("/api/customers")
      .then((r) => r.json())
      .then(setCustomers);
  }, []);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen min-h-[100dvh] overflow-hidden bg-[#0a0a0f]">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-electrical.jpg"
            alt="Взрывозащищённое оборудование"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(10,10,15,0.95)] via-[rgba(10,10,15,0.75)] to-[rgba(10,10,15,0.4)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,15,1)] via-transparent to-[rgba(10,10,15,0.5)]" />
        </div>

        {/* Content */}
        <div className="relative z-2 flex flex-col justify-end min-h-screen min-h-[100dvh] max-w-[1400px] mx-auto px-6 lg:px-20 pb-20 lg:pb-28">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-[3px] uppercase mb-8 border"
              style={{
                backgroundColor: "rgba(245,209,0,0.1)",
                color: "#f5d100",
                borderColor: "rgba(245,209,0,0.2)",
              }}
            >
              Электротехника
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold uppercase tracking-[-2px] leading-[0.92] mb-8">
              <span className="text-white block">Взрыво&shy;защищённое</span>
              <span className="bg-gradient-to-r from-[#f5d100] via-[#e5c922] to-[#f5d100] bg-clip-text text-transparent bg-[length:200%_100%] animate-[shimmer_4s_ease-in-out_infinite]">
                оборудование
              </span>
            </h1>

            <p className="text-white/50 text-lg lg:text-xl leading-relaxed max-w-lg mb-10">
              Предлагаем решения для обеспечения безопасности на промышленных
              объектах любой сложности
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#application"
                className="inline-block px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-[0_8px_32px_rgba(245,209,0,0.25)] hover:-translate-y-0.5"
                style={{ backgroundColor: "#f5d100", color: "#1a0c0a" }}
              >
                Оставить заявку
              </a>
              <a
                href="#about"
                className="inline-block px-8 py-4 rounded-xl text-sm font-medium text-white/70 border border-white/[0.15] hover:bg-white/[0.06] hover:text-white transition-all duration-300"
              >
                Подробнее
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-2">
          <span className="text-white/20 text-[10px] tracking-[3px] uppercase">
            Scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-[rgba(245,209,0,0.5)] to-transparent animate-[scanline_3s_linear_infinite]" />
        </div>
      </section>

      {/* ===== 01: Основа безопасности — Bento grid ===== */}
      <section id="about" className="bg-[#0a0a0f] py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-20">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[#f5d100] text-sm font-semibold tracking-[4px] uppercase block mb-4">
              01
            </span>
            <h2
              className="text-white text-4xl lg:text-5xl font-bold uppercase tracking-tight"
              style={{ fontFamily: "'Neutral Face', sans-serif" }}
            >
              Основа безопасности
            </h2>
          </motion.div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-20">
            {/* Big card — text */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 bg-white/[0.04] border border-white/[0.08] rounded-3xl p-8 lg:p-12 hover:bg-white/[0.06] transition-all duration-500"
            >
              <h3 className="text-white text-2xl lg:text-3xl font-bold mb-6">
                Взрывозащищённое электрооборудование
              </h3>
              <div className="text-white/50 text-base leading-relaxed space-y-4 max-w-2xl">
                <p>
                  Взрывозащищённое электрооборудование предназначено для
                  эксплуатации в условиях, где существует риск взрыва из-за
                  наличия взрывоопасных газов, паров или пыли.
                </p>
                <p>
                  Основная задача — предотвращение возникновения искр или других
                  источников воспламенения, которые могут привести к взрыву и
                  значительным материальным убыткам.
                </p>
                <p className="text-white/30 text-sm italic">
                  От проектирования и поставки до монтажа и обслуживания
                </p>
              </div>
            </motion.div>

            {/* Photo card */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-3xl overflow-hidden border border-white/[0.08] min-h-[280px] relative group"
            >
              <Image
                src="/images/electro/basis-of-security-1.png"
                alt="Система безопасности на производстве"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </motion.div>

            {/* Photo card 2 */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="rounded-3xl overflow-hidden border border-white/[0.08] min-h-[250px] relative group"
            >
              <Image
                src="/images/electro/basis-of-security-2.png"
                alt="Взрывозащищенное оборудование"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </motion.div>

            {/* Stats mini card */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 bg-gradient-to-r from-[rgba(245,209,0,0.08)] to-[rgba(245,209,0,0.02)] border border-[rgba(245,209,0,0.15)] rounded-3xl p-8 lg:p-10 flex items-center"
            >
              <div className="grid grid-cols-3 gap-8 w-full text-center">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <span className="text-[#f5d100] text-3xl lg:text-4xl font-bold block">
                      {stat.num}
                    </span>
                    <span className="text-white/40 text-xs uppercase tracking-wider mt-1 block">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 02: Где используется ===== */}
      <section className="relative bg-[#1A0C0A] py-24 lg:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[rgba(245,209,0,0.03)] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[rgba(191,6,3,0.04)] rounded-full blur-[100px]" />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-20">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[#f5d100] text-sm font-semibold tracking-[4px] uppercase block mb-4">
              02
            </span>
            <h2
              className="text-white text-4xl lg:text-5xl font-bold uppercase tracking-tight"
              style={{ fontFamily: "'Neutral Face', sans-serif" }}
            >
              Где используется
            </h2>
            <p className="text-white/40 text-base mt-3">
              Отрасли, требующие взрывозащищённого оборудования
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group bg-white/[0.03] border border-white/[0.06] rounded-2xl p-7 hover:bg-white/[0.06] hover:border-[rgba(245,209,0,0.15)] transition-all duration-500 relative overflow-hidden"
              >
                <span className="text-3xl mb-4 block">{item.icon}</span>
                <p className="text-white text-base font-semibold mb-3">
                  {item.title}
                </p>
                <span className="text-white/40 text-sm leading-relaxed">
                  {item.text}
                </span>
                <div className="absolute top-0 right-0 w-24 h-24 bg-[rgba(245,209,0,0.03)] rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity -translate-y-1/2 translate-x-1/2" />
              </motion.div>
            ))}

            {/* CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-gradient-to-br from-[rgba(245,209,0,0.1)] to-[rgba(245,209,0,0.03)] border border-[rgba(245,209,0,0.2)] rounded-2xl p-7 flex flex-col justify-between"
            >
              <div>
                <p className="text-white text-base font-semibold mb-3">
                  Оставьте заявку
                </p>
                <span className="text-white/40 text-sm leading-relaxed">
                  Расскажите нам о своём предприятии, и мы подберём оборудование
                  для ваших потребностей
                </span>
              </div>
              <a
                href="#application"
                className="inline-block mt-6 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-[0_4px_20px_rgba(245,209,0,0.25)] hover:-translate-y-0.5 self-start"
                style={{ backgroundColor: "#f5d100", color: "#1a0c0a" }}
              >
                Узнать цены
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 03: Металлоконструкции — split ===== */}
      <section className="bg-[#0a0a0f] py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-20">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[#f5d100] text-sm font-semibold tracking-[4px] uppercase block mb-4">
              03
            </span>
            <h2
              className="text-white text-4xl lg:text-5xl font-bold uppercase tracking-tight"
              style={{ fontFamily: "'Neutral Face', sans-serif" }}
            >
              Металлоконструкции
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
            {/* Images — 2 cols */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 flex flex-col gap-5"
            >
              <div className="rounded-3xl overflow-hidden border border-white/[0.08] relative min-h-[220px] flex-1">
                <Image
                  src="/images/electro/electrical-engineering.png"
                  alt="Электротехническое оборудование"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="rounded-3xl overflow-hidden border border-white/[0.08] relative min-h-[220px] flex-1">
                <Image
                  src="/images/electro/electrical engineering-2.png"
                  alt="Промышленные металлоконструкции"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Content — 3 cols */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-3 flex flex-col gap-5"
            >
              <div className="bg-white/[0.04] border border-white/[0.08] rounded-3xl p-8 lg:p-10 flex-1">
                <h3 className="text-white text-xl font-semibold mb-5">
                  Мачты, опоры и кабеленесущие системы
                </h3>
                <div className="text-white/50 text-sm leading-relaxed space-y-3">
                  <p>
                    Металлоконструкции используются для установки и поддержки
                    электрооборудования. Изготавливаются из высококачественной
                    стали, обеспечивая долговечность и устойчивость к внешним
                    воздействиям.
                  </p>
                  <p>
                    Основные виды применения: установка антенн, освещения и линий
                    электропередач, поддержка проводов и кабелей.
                  </p>
                  <p>
                    Особое внимание уделяется коррозионной стойкости и
                    безопасности, включая антикоррозийное покрытие и соблюдение
                    норм и стандартов.
                  </p>
                </div>
              </div>

              {/* Accent card */}
              <div
                className="rounded-2xl p-6 flex items-center justify-between gap-6 flex-wrap"
                style={{
                  backgroundColor: "rgba(245,209,0,0.1)",
                  border: "1px solid rgba(245,209,0,0.2)",
                }}
              >
                <div>
                  <span className="text-[#f5d100] text-3xl lg:text-4xl font-bold block">
                    100%
                  </span>
                  <span className="text-white/50 text-sm">
                    сертифицированное оборудование
                  </span>
                </div>
                <a
                  href="#application"
                  className="inline-block px-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-[0_4px_20px_rgba(245,209,0,0.25)] hover:-translate-y-0.5 whitespace-nowrap"
                  style={{ backgroundColor: "#f5d100", color: "#1a0c0a" }}
                >
                  Узнайте цены
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 04: Ассортимент ===== */}
      <section id="assortment" className="relative bg-[#0a0a0f] py-24 lg:py-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[rgba(245,209,0,0.02)] rounded-full blur-[150px]" />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-20">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[#f5d100] text-sm font-semibold tracking-[4px] uppercase block mb-4">
              04
            </span>
            <h2
              className="text-white text-4xl lg:text-5xl font-bold uppercase tracking-tight"
              style={{ fontFamily: "'Neutral Face', sans-serif" }}
            >
              Ассортимент
            </h2>
            <p className="text-white/40 text-base mt-3">
              Полный спектр взрывозащищённого оборудования
            </p>
          </motion.div>

          {/* Main grid — featured item + list */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left — active/featured card */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6 }}
              className="rounded-3xl overflow-hidden border border-white/[0.08] bg-white/[0.03] relative group self-start lg:sticky lg:top-24"
            >
              {(activeItem || assortment[0]) && (
                <>
                  <div className="relative aspect-[3/2] bg-[#111118] flex items-center justify-center">
                    <Image
                      src={(activeItem || assortment[0]).image}
                      alt={(activeItem || assortment[0]).title}
                      fill
                      className="object-contain p-6 transition-transform duration-700 group-hover:scale-105 brightness-[0.9]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[rgba(10,10,15,0.15)] to-transparent" />
                  </div>
                  <div className="p-8 lg:p-10 -mt-16 relative z-1">
                    <h3 className="text-white text-2xl lg:text-3xl font-bold mb-4">
                      {(activeItem || assortment[0]).title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-6">
                      {(activeItem || assortment[0]).description}
                    </p>
                    <a
                      href="#application"
                      className="inline-block px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-[0_4px_20px_rgba(245,209,0,0.25)] hover:-translate-y-0.5"
                      style={{ backgroundColor: "#f5d100", color: "#1a0c0a" }}
                    >
                      Узнать цену
                    </a>
                  </div>
                </>
              )}
            </motion.div>

            {/* Right — scrollable grid */}
            <div className="grid grid-cols-2 gap-3 auto-rows-min">
              {assortment.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  onClick={() => setActiveItem(item)}
                  className={`group/card rounded-2xl overflow-hidden border text-left cursor-pointer transition-all duration-400 relative ${
                    (activeItem?.id || assortment[0]?.id) === item.id
                      ? "border-[rgba(245,209,0,0.4)] bg-[rgba(245,209,0,0.06)]"
                      : "border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.12]"
                  }`}
                >
                  <div className="relative aspect-[3/2] bg-[#0a0a0f]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover/card:scale-105 brightness-[0.85]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,15,0.9)] via-[rgba(10,10,15,0.35)] to-[rgba(10,10,15,0.25)]" />
                    {(activeItem?.id || assortment[0]?.id) === item.id && (
                      <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-[#f5d100] shadow-[0_0_10px_rgba(245,209,0,0.5)]" />
                    )}
                  </div>
                  <div className="p-3.5">
                    <p className="text-white/90 text-xs font-semibold leading-tight line-clamp-2">
                      {item.title}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 05: Партнёры ===== */}
      <section className="relative bg-[#1A0C0A] py-24 lg:py-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[rgba(245,209,0,0.03)] rounded-full blur-[120px]" />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-20">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[#f5d100] text-sm font-semibold tracking-[4px] uppercase block mb-4">
              05
            </span>
            <h2
              className="text-white text-4xl lg:text-5xl font-bold uppercase tracking-tight"
              style={{ fontFamily: "'Neutral Face', sans-serif" }}
            >
              Партнёры
            </h2>
            <p className="text-white/40 text-base mt-3">
              Работаем с ключевыми компаниями отрасли
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {partners.map((partner, i) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 hover:bg-white/[0.06] hover:border-[rgba(245,209,0,0.2)] transition-all duration-500 flex flex-col items-center"
              >
                <div className="w-full aspect-square rounded-xl overflow-hidden mb-4 relative">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
                <p className="text-white/80 text-sm font-semibold text-center leading-tight group-hover:text-white transition-colors">
                  {partner.name}
                </p>
                {partner.description && (
                  <p className="text-white/30 text-[11px] leading-snug text-center mt-2 line-clamp-2">
                    {partner.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 06: Наши заказчики ===== */}
      <section className="relative bg-[#0a0a0f] py-24 lg:py-32 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[rgba(245,209,0,0.03)] rounded-full blur-[120px]" />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-20">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[#f5d100] text-sm font-semibold tracking-[4px] uppercase block mb-4">
              06
            </span>
            <h2
              className="text-white text-4xl lg:text-5xl font-bold uppercase tracking-tight"
              style={{ fontFamily: "'Neutral Face', sans-serif" }}
            >
              Наши заказчики
            </h2>
            <p className="text-white/40 text-base mt-3">
              Работаем с ведущими предприятиями отрасли
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {customers.map((customer, i) => (
              <motion.div
                key={customer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 hover:bg-white/[0.06] hover:border-[rgba(245,209,0,0.15)] transition-all duration-500 relative overflow-hidden"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: "rgba(245,209,0,0.1)",
                      border: "1px solid rgba(245,209,0,0.2)",
                    }}
                  >
                    <span className="text-[#f5d100] text-sm font-bold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="text-white/80 text-sm font-semibold leading-tight group-hover:text-white transition-colors">
                    {customer.name}
                  </p>
                </div>
                <div className="absolute top-0 right-0 w-20 h-20 bg-[rgba(245,209,0,0.03)] rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity -translate-y-1/2 translate-x-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 07: Форма ===== */}
      <Application />
    </>
  );
}
