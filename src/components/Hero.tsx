"use client";

import { motion } from "framer-motion";

const stats = [
  { num: "4", suffix: "+", label: "Года" },
  { num: "100", suffix: "+", label: "Проектов" },
  { num: "89", suffix: "", label: "Регионов" },
];

const titleLines = ["ВЕРШИНА", "ВАШЕГО"];

export default function Hero() {
  return (
    <section className="relative min-h-screen min-h-[100dvh] overflow-hidden flex flex-col items-stretch justify-end bg-[#0a0a0f] z-[11]
      max-lg:justify-end max-md:items-center">

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f1a] via-[#16213e] to-[#1a1a2e]" />
      <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-b from-transparent to-[rgba(10,10,15,0.95)]" />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Scanline */}
      <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[rgba(245,209,0,0.15)] to-transparent z-[1] animate-[scanline_6s_linear_infinite] max-sm:hidden" />

      {/* Blobs */}
      <div className="absolute w-[500px] h-[500px] rounded-full opacity-40 blur-[80px] bg-[rgba(245,209,0,0.08)] top-[10%] left-[-10%] animate-[blobFloat1_20s_ease-in-out_infinite]
        max-md:w-[300px] max-md:h-[300px] max-md:blur-[60px]
        max-sm:w-[200px] max-sm:h-[200px]" />
      <div className="absolute w-[400px] h-[400px] rounded-full opacity-40 blur-[80px] bg-[rgba(191,6,3,0.06)] top-[30%] right-[-5%] animate-[blobFloat2_25s_ease-in-out_infinite]
        max-md:w-[250px] max-md:h-[250px] max-md:blur-[60px]
        max-sm:w-[180px] max-sm:h-[180px]" />
      <div className="absolute w-[300px] h-[300px] rounded-full opacity-40 blur-[80px] bg-[rgba(22,33,62,0.3)] bottom-[20%] left-[40%] animate-[blobFloat3_18s_ease-in-out_infinite]
        max-md:hidden" />

      {/* Side text */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 rotate-180 text-[11px] text-white/20 tracking-[3px] uppercase z-2 max-md:hidden"
        style={{ writingMode: "vertical-rl" }}>
        AAA-BEZOPASNOST
      </div>

      {/* CTA Circle - desktop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute top-[45%] right-20 -translate-y-1/2 z-3
          max-lg:right-10 max-md:static max-md:translate-y-0 max-md:flex max-md:justify-center max-md:w-full max-md:my-5 max-md:order-2"
      >
        <div
          className="relative w-[130px] h-[130px] rounded-full flex items-center justify-center text-center text-[13px] font-bold leading-tight cursor-pointer transition-transform duration-400 hover:scale-110 animate-[ctaFloat_5s_ease-in-out_infinite]
          max-lg:w-[110px] max-lg:h-[110px] max-lg:text-xs
          max-md:w-[90px] max-md:h-[90px] max-md:text-[10px] max-md:animate-none"
          style={{ backgroundColor: '#f5d100', color: '#1a0c0a' }}
        >
          {/* Ring */}
          <div className="absolute -inset-3 border border-dashed border-[rgba(245,209,0,0.3)] rounded-full animate-[ringRotate_12s_linear_infinite]" />
          Оставить<br />заявку
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-2 w-full px-20 pb-24 flex-1 flex flex-col justify-end order-1
        max-xl:px-16 max-lg:px-10 max-md:px-8 max-md:pb-8 max-md:justify-center
        max-sm:px-5 max-sm:pb-6">

        {/* Title */}
        <h1 className="text-[86px] font-extrabold leading-[0.92] tracking-[-3px] uppercase mb-8 overflow-hidden
          2xl:text-[96px]
          max-xl:text-[72px] max-xl:tracking-[-2px]
          max-lg:text-[60px]
          max-md:text-[48px] max-md:tracking-[-1.5px]
          max-sm:text-[40px] max-sm:tracking-[-1px] max-sm:mb-5">
          {titleLines.map((line, i) => (
            <motion.span
              key={line}
              className="block"
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3 + i * 0.2,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {line}
            </motion.span>
          ))}
          <motion.span
            className="block bg-gradient-to-r from-[#f5d100] via-[#e5c922] to-[#f5d100] bg-clip-text text-transparent bg-[length:200%_100%] animate-[shimmer_4s_ease-in-out_infinite]"
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.7,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            СПОКОЙСТВИЯ
          </motion.span>
        </h1>

        {/* Bottom bar */}
        <motion.div
          className="flex items-end justify-between gap-10 pt-8 border-t border-white/[0.08]
            max-md:flex-col max-md:items-start max-md:gap-5 max-md:pt-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <p className="text-[15px] text-white/45 leading-[1.7] max-w-[480px] font-light
            max-sm:text-[13px] max-sm:max-w-full">
            Передовые системы видеонаблюдения и взрывозащищённое электрооборудование для надёжной и безопасной работы промышленных объектов
          </p>
          <div className="flex gap-10 max-md:gap-0 max-md:w-full max-md:justify-between">
            {stats.map((stat) => (
              <div key={stat.label} className="text-right max-md:text-center max-md:flex-1">
                <span className="text-[32px] font-bold block max-sm:text-[24px]">
                  {stat.num}
                  {stat.suffix && (
                    <span className="text-[#f5d100]">{stat.suffix}</span>
                  )}
                </span>
                <span className="text-[11px] text-white/35 uppercase tracking-[1px] block mt-0.5 max-sm:text-[9px]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
