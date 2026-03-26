"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const stats = [
  { num: "4+", label: "Года на рынке" },
  { num: "100+", label: "Реализованных проектов" },
  { num: "89", label: "Регионов работы" },
];

const services = [
  {
    id: "video",
    title: "Видеонаблюдение и СКУД",
    items: [
      "Проектирование, производство, выполнение электромонтажа, сопровождение линии IT и обслуживание системы видеонаблюдения и СКУД на объектах любой сложности",
      'Внедрение и установка "Электронного бюро пропусков"',
    ],
    href: "/videosurveillance",
  },
  {
    id: "electro",
    title: "Электротехника",
    items: [
      "Консультирование и подбор материалов",
      "Управление сроками реализации проекта",
      "Производство и поставка",
      "Логистика",
    ],
    href: "/explosionproof",
  },
];

export default function AboutUs() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="about-us"
      className="relative bg-[#E5E4DA] overflow-hidden"
    >
      {/* ===== TOP: About block ===== */}
      <div className="max-w-[1400px] mx-auto px-6 pt-24 pb-16 lg:px-20 lg:pt-32 lg:pb-20">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="text-[#9B8D8B] text-5xl font-light" style={{ fontFamily: "'Neutral Face', sans-serif" }}>
            01
          </span>
          <div className="h-px flex-1 max-w-[60px] bg-[#B22212]" />
          <h2
            className="text-[#1A0C0A] text-3xl lg:text-4xl font-bold uppercase tracking-tight"
            style={{ fontFamily: "'Neutral Face', sans-serif" }}
          >
            О нас
          </h2>
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: text + stats */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-[#403534] text-lg lg:text-xl leading-relaxed mb-12">
              Производственная компания-интегратор, ведущая деятельность по
              предоставлению инновационных решений в области оборудования систем
              видеонаблюдения, электротехнического взрывозащищённого оборудования
              и металлоконструкций различного назначения.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                  className="relative pt-6"
                >
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#B22212]" />
                  <span className="block text-4xl lg:text-5xl font-bold text-[#1A0C0A] mb-1">
                    {stat.num}
                  </span>
                  <span className="text-sm text-[#403534]">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative rounded-2xl overflow-hidden group"
          >
            <div className="aspect-[4/3] relative">
              <Image
                src="/images/img-about-us.jpg"
                alt="Офис компании ААА-Безопасность"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,12,10,0.4)] to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ===== BOTTOM: What we do ===== */}
      <div className="bg-[#1A0C0A] relative">
        {/* Diagonal cut */}
        <div
          className="absolute top-0 left-0 right-0 h-20 bg-[#E5E4DA]"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 100%)" }}
        />

        <div className="max-w-[1400px] mx-auto px-6 pt-28 pb-20 lg:px-20 lg:pt-36 lg:pb-28">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-white text-3xl lg:text-4xl font-bold uppercase tracking-tight mb-12"
            style={{ fontFamily: "'Neutral Face', sans-serif" }}
          >
            Что мы делаем
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group relative bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 lg:p-10 hover:bg-white/[0.07] hover:border-white/[0.12] transition-all duration-500"
              >
                {/* Number badge */}
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: 'rgba(245,209,0,0.15)', color: '#f5d100' }}>
                    0{i + 1}
                  </div>
                  <h3 className="text-white text-xl lg:text-2xl font-semibold">
                    {service.title}
                  </h3>
                </div>

                {/* Items */}
                <ul className="space-y-3 mb-8">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-white/60 text-sm lg:text-base leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: '#B22212' }} />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={service.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
                  style={{ color: '#f5d100' }}
                >
                  Узнать больше
                  <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>

                {/* Corner glow on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[rgba(245,209,0,0.03)] rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
