"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const customers = [
  { src: "/images/customers-1.png", alt: "МСУ-1", title: "МСУ-1" },
  { src: "/images/customers-2.png", alt: "ЛУКОЙЛ", title: "ЛУКОЙЛ" },
  { src: "/images/customers-3.png", alt: "Газпром", title: "Газпром" },
];

export default function Customers() {
  return (
    <section id="customers" className="relative bg-[#1A0C0A] py-20 lg:py-28 overflow-hidden">
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-20">
        {/* Header — same style as "Что мы делаем" */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold"
                style={{ backgroundColor: 'rgba(245,209,0,0.15)', color: '#f5d100' }}>
                02
              </div>
            </div>
            <h2
              className="text-white text-3xl lg:text-4xl font-bold uppercase tracking-tight"
              style={{ fontFamily: "'Neutral Face', sans-serif" }}
            >
              Заказчики
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/40 text-base max-w-sm"
          >
            Работаем с ключевыми компаниями отрасли
          </motion.p>
        </div>

        {/* Logo cards — glass style matching "Что мы делаем" */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6">
          {customers.map((customer, i) => (
            <motion.div
              key={customer.alt}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group relative bg-white/[0.04] border border-white/[0.08] rounded-2xl p-10 lg:p-12 flex items-center justify-center min-h-[160px] lg:min-h-[200px] hover:bg-white/[0.07] hover:border-white/[0.12] transition-all duration-500 overflow-hidden"
            >
              <Image
                src={customer.src}
                alt={customer.alt}
                width={240}
                height={100}
                className="object-contain max-h-[80px] lg:max-h-[100px] w-auto opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
              />

              {/* Corner glow on hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[rgba(245,209,0,0.03)] rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
