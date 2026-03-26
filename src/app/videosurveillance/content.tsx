"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Application from "@/components/Application";

const advantages = [
  { icon: "🛡", title: "Безопасность", text: "Защита от краж, вандализма и несанкционированного доступа" },
  { icon: "💰", title: "Экономия", text: "Оптимизация рабочего времени и снижение затрат до 50%" },
  { icon: "⚙", title: "Гибкость", text: "Настройка уровней доступа для сотрудников и посетителей" },
  { icon: "🔒", title: "Надёжность", text: "Уникальные идентификаторы, не поддающиеся взлому" },
  { icon: "🔗", title: "Интеграция", text: "Совместимость с пожарными сигнализациями и другими системами" },
  { icon: "📊", title: "1С", text: "Быстрый импорт сотрудников и выгрузка детальных отчётов" },
];

const partnerStats = [
  { num: "20", label: "совместных проектов" },
  { num: "10 000", label: "сотрудников" },
  { num: ">80 000", label: "м² площади" },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
};

export default function VideoSurveillanceContent() {
  return (
    <>
      {/* ===== HERO with photo ===== */}
      <section className="relative min-h-screen min-h-[100dvh] overflow-hidden bg-[#0a0a0f]">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/video/hero-surveillance.jpg"
            alt="Системы видеонаблюдения"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(10,10,15,0.92)] via-[rgba(10,10,15,0.7)] to-[rgba(10,10,15,0.4)]" />
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
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-[3px] uppercase mb-8 border"
              style={{ backgroundColor: "rgba(245,209,0,0.1)", color: "#f5d100", borderColor: "rgba(245,209,0,0.2)" }}>
              Видеонаблюдение и СКУД
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold uppercase tracking-[-2px] leading-[0.92] mb-8">
              <span className="text-white block">Системы</span>
              <span className="bg-gradient-to-r from-[#f5d100] via-[#e5c922] to-[#f5d100] bg-clip-text text-transparent bg-[length:200%_100%] animate-[shimmer_4s_ease-in-out_infinite]">
                видео&shy;наблюдения
              </span>
            </h1>

            <p className="text-white/50 text-lg lg:text-xl leading-relaxed max-w-lg mb-10">
              Устанавливаем передовые системы видеонаблюдения и контроля управления доступом на объекты любой сложности
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#application"
                className="inline-block px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-[0_8px_32px_rgba(245,209,0,0.25)] hover:-translate-y-0.5"
                style={{ backgroundColor: "#f5d100", color: "#1a0c0a" }}>
                Оставить заявку
              </a>
              <a href="#skud"
                className="inline-block px-8 py-4 rounded-xl text-sm font-medium text-white/70 border border-white/[0.15] hover:bg-white/[0.06] hover:text-white transition-all duration-300">
                Подробнее
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-2">
          <span className="text-white/20 text-[10px] tracking-[3px] uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[rgba(245,209,0,0.5)] to-transparent animate-[scanline_3s_linear_infinite]" />
        </div>
      </section>

      {/* ===== 01: СКУД — Bento grid ===== */}
      <section id="skud" className="bg-[#0a0a0f] py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-20">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="text-[#f5d100] text-sm font-semibold tracking-[4px] uppercase block mb-4">01</span>
            <h2 className="text-white text-4xl lg:text-5xl font-bold uppercase tracking-tight" style={{ fontFamily: "'Neutral Face', sans-serif" }}>
              Видеонаблюдение и СКУД
            </h2>
          </motion.div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-20">
            {/* Big card — text */}
            <motion.div {...fadeUp} transition={{ duration: 0.5 }}
              className="lg:col-span-2 bg-white/[0.04] border border-white/[0.08] rounded-3xl p-8 lg:p-12 hover:bg-white/[0.06] transition-all duration-500">
              <h3 className="text-white text-2xl lg:text-3xl font-bold mb-6">
                Система контроля и управления доступом
              </h3>
              <div className="text-white/50 text-base leading-relaxed space-y-4 max-w-2xl">
                <p>Системы контроля и управления доступом (СКУД) с бюро пропусков обеспечивают безопасность и эффективность современных предприятий.</p>
                <p>Контролируемый доступ к определённым зонам минимизирует риск несанкционированного проникновения, краж и других преступлений.</p>
                <p className="text-white/30 text-sm italic">От проектирования и установки до обслуживания и модернизации</p>
              </div>
            </motion.div>

            {/* Photo card */}
            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-3xl overflow-hidden border border-white/[0.08] min-h-[280px] relative group">
              <Image src="/images/video/video-surveillance-min-section-one-1.png" alt="Система видеонаблюдения" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </motion.div>

            {/* Photo card 2 */}
            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.15 }}
              className="rounded-3xl overflow-hidden border border-white/[0.08] min-h-[250px] relative group">
              <Image src="/images/video/video-surveillance-min-section-one-2.png" alt="СКУД" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </motion.div>

            {/* Stats mini card */}
            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 bg-gradient-to-r from-[rgba(245,209,0,0.08)] to-[rgba(245,209,0,0.02)] border border-[rgba(245,209,0,0.15)] rounded-3xl p-8 lg:p-10 flex items-center">
              <div className="grid grid-cols-3 gap-8 w-full text-center">
                <div>
                  <span className="text-[#f5d100] text-3xl lg:text-4xl font-bold block">6</span>
                  <span className="text-white/40 text-xs uppercase tracking-wider mt-1 block">преимуществ</span>
                </div>
                <div>
                  <span className="text-[#f5d100] text-3xl lg:text-4xl font-bold block">24/7</span>
                  <span className="text-white/40 text-xs uppercase tracking-wider mt-1 block">мониторинг</span>
                </div>
                <div>
                  <span className="text-[#f5d100] text-3xl lg:text-4xl font-bold block">100%</span>
                  <span className="text-white/40 text-xs uppercase tracking-wider mt-1 block">контроль</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Advantages — horizontal scroll cards */}
          <motion.h3 {...fadeUp} transition={{ duration: 0.5 }}
            className="text-white text-2xl lg:text-3xl font-bold mb-8 text-center" style={{ fontFamily: "'Neutral Face', sans-serif" }}>
            Преимущества СКУД
          </motion.h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {advantages.map((adv, i) => (
              <motion.div
                key={adv.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.06] hover:border-[rgba(245,209,0,0.15)] transition-all duration-500 relative overflow-hidden"
              >
                <span className="text-2xl mb-3 block">{adv.icon}</span>
                <p className="text-white text-sm font-semibold mb-2">{adv.title}</p>
                <span className="text-white/40 text-xs leading-relaxed">{adv.text}</span>
                <div className="absolute top-0 right-0 w-20 h-20 bg-[rgba(245,209,0,0.03)] rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity -translate-y-1/2 translate-x-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 02: ЭБП — split with accent ===== */}
      <section className="relative bg-[#1A0C0A] py-24 lg:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[rgba(245,209,0,0.03)] rounded-full blur-[120px]" />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-20">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="text-[#f5d100] text-sm font-semibold tracking-[4px] uppercase block mb-4">02</span>
            <h2 className="text-white text-4xl lg:text-5xl font-bold uppercase tracking-tight" style={{ fontFamily: "'Neutral Face', sans-serif" }}>
              Электронное бюро пропусков
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
            {/* Image — 2 cols */}
            <motion.div {...fadeUp} transition={{ duration: 0.6 }}
              className="lg:col-span-2 rounded-3xl overflow-hidden border border-white/[0.08] relative min-h-[350px]">
              <Image src="/images/video/electronic-office.png" alt="ЭБП" fill className="object-cover" />
            </motion.div>

            {/* Content — 3 cols */}
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-3 flex flex-col gap-5">
              <div className="bg-white/[0.04] border border-white/[0.08] rounded-3xl p-8 lg:p-10 flex-1">
                <h3 className="text-white text-xl font-semibold mb-5">ЭБП устраняет недостатки традиционной СКУД</h3>
                <div className="text-white/50 text-sm leading-relaxed space-y-3">
                  <p>Электронное бюро пропусков — инновационное IT-решение для оптимизации контроля доступа. Автоматизирует выдачу пропусков и управление ими.</p>
                  <p>Система собирает данные о времени входа и выхода сотрудников, разбивает по подрядчикам, времени и способу входа.</p>
                  <p>Пользователь может получить отчёт за любой период и отследить динамику посещения на графике.</p>
                </div>
              </div>

              {/* Accent card */}
              <div className="rounded-2xl p-6 flex items-center justify-between gap-6 flex-wrap"
                style={{ backgroundColor: "rgba(245,209,0,0.1)", border: "1px solid rgba(245,209,0,0.2)" }}>
                <div>
                  <span className="text-[#f5d100] text-3xl lg:text-4xl font-bold block">30–50%</span>
                  <span className="text-white/50 text-sm">снижение затрат на контроль доступа</span>
                </div>
                <a href="#application"
                  className="inline-block px-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-[0_4px_20px_rgba(245,209,0,0.25)] hover:-translate-y-0.5 whitespace-nowrap"
                  style={{ backgroundColor: "#f5d100", color: "#1a0c0a" }}>
                  Узнайте цены
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 03: Партнёры ===== */}
      <section className="bg-[#0a0a0f] py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-20">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="text-[#f5d100] text-sm font-semibold tracking-[4px] uppercase block mb-4">03</span>
            <h2 className="text-white text-4xl lg:text-5xl font-bold uppercase tracking-tight" style={{ fontFamily: "'Neutral Face', sans-serif" }}>
              Партнёры
            </h2>
            <p className="text-white/40 text-base mt-3">Нам доверяют ведущие компании</p>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white/[0.03] border border-white/[0.08] rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left — dark accent panel */}
              <div className="bg-gradient-to-br from-[rgba(245,209,0,0.08)] to-transparent p-10 lg:p-14 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/[0.06]">
                <Image src="/images/icon/logo-mcy.svg" alt="ГК МСУ-1" width={180} height={70} className="mb-10 brightness-0 invert opacity-80" />
                <div className="grid grid-cols-3 gap-6">
                  {partnerStats.map((stat, i) => (
                    <motion.div key={stat.label}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}>
                      <span className="text-[#f5d100] text-2xl lg:text-3xl font-bold block">{stat.num}</span>
                      <span className="text-white/35 text-[10px] uppercase tracking-wider mt-1 block leading-tight">{stat.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right — text */}
              <div className="p-10 lg:p-14">
                <h3 className="text-white text-2xl font-bold mb-6" style={{ fontFamily: "'Neutral Face', sans-serif" }}>
                  ГК «МСУ-1»
                </h3>
                <div className="text-white/45 text-sm leading-relaxed space-y-4">
                  <p>ГК «МСУ-1» (входит в группу компаний ФСК) является ключевым заказчиком ООО «ААА-Безопасность» в направлении систем видеонаблюдения и СКУД.</p>
                  <p>Управляет проектами разного типа: жилые комплексы, коммерческая недвижимость, объекты социального, медицинского и образовательного назначения.</p>
                  <p>На объектах применяются решения в области установки и обслуживания систем видеонаблюдения и контроля доступа с распознаванием лиц и Электронным Бюро Пропусков.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 04: Форма ===== */}
      <Application />
    </>
  );
}
