"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Application() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    position: "",
    email: "",
    phone: "",
    comments: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", company: "", position: "", email: "", phone: "", comments: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const inputClass =
    "w-full bg-white/[0.06] border border-white/[0.1] rounded-xl px-5 py-4 text-white text-sm outline-none placeholder-white/30 focus:border-[#f5d100] focus:bg-white/[0.08] transition-all duration-300";

  return (
    <section id="application" className="relative overflow-hidden">
      {/* Background — gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#0a0a0f]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[rgba(245,209,0,0.04)] rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[rgba(191,6,3,0.03)] rounded-full blur-[120px]" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-20 py-16 md:py-24 lg:py-32">
        {/* Top: centered header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 lg:mb-16"
        >
          <span className="text-[#f5d100] text-sm font-semibold tracking-[4px] uppercase block mb-4">
            04
          </span>
          <h2
            className="text-white text-2xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight mb-4"
            style={{ fontFamily: "'Neutral Face', sans-serif" }}
          >
            Свяжитесь с нами
          </h2>
          <p className="text-white/40 text-lg max-w-md mx-auto">
            Узнайте больше о работе компании и оформите первый заказ
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-[900px] mx-auto"
        >
          <form
            onSubmit={handleSubmit}
            className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-3xl p-8 lg:p-12"
          >
            {/* Row 1: name, company, position */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
              <div>
                <label className="text-white/50 text-xs font-medium uppercase tracking-wider block mb-2">
                  Имя <span className="text-[#f5d100]">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Ваше имя"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-white/50 text-xs font-medium uppercase tracking-wider block mb-2">
                  Компания
                </label>
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Название компании"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-white/50 text-xs font-medium uppercase tracking-wider block mb-2">
                  Должность
                </label>
                <input
                  type="text"
                  name="position"
                  value={form.position}
                  onChange={handleChange}
                  placeholder="Ваша должность"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Row 2: email, phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="text-white/50 text-xs font-medium uppercase tracking-wider block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-white/50 text-xs font-medium uppercase tracking-wider block mb-2">
                  Телефон <span className="text-[#f5d100]">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+7 (___) ___-__-__"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Row 3: comments */}
            <div className="mb-8">
              <label className="text-white/50 text-xs font-medium uppercase tracking-wider block mb-2">
                Комментарий
              </label>
              <textarea
                name="comments"
                value={form.comments}
                onChange={handleChange}
                placeholder="Что вас интересует?"
                rows={4}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Submit row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <button
                type="submit"
                disabled={status === "sending"}
                className="group relative px-10 py-4 rounded-xl text-sm font-semibold cursor-pointer disabled:opacity-60 overflow-hidden transition-all duration-300 hover:shadow-[0_8px_32px_rgba(245,209,0,0.25)] hover:-translate-y-0.5"
                style={{ backgroundColor: "#f5d100", color: "#1a0c0a" }}
              >
                <span className="relative z-[1]">
                  {status === "sending" ? "Отправка..." : "Отправить заявку"}
                </span>
                {/* Shine effect */}
                <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:left-[100%] transition-[left] duration-700" />
              </button>

              <p className="text-white/20 text-xs max-w-xs">
                Нажимая кнопку, вы соглашаетесь с{" "}
                <a href="#" className="underline hover:text-white/40 transition-colors">
                  политикой конфиденциальности
                </a>
              </p>
            </div>

            {/* Status messages */}
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-xl bg-[rgba(245,209,0,0.1)] border border-[rgba(245,209,0,0.2)]"
              >
                <p className="text-[#f5d100] text-sm font-medium">
                  ✓ Заявка отправлена! Мы свяжемся с вами в ближайшее время.
                </p>
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-xl bg-[rgba(178,34,18,0.1)] border border-[rgba(178,34,18,0.2)]"
              >
                <p className="text-[#ff6b6b] text-sm font-medium">
                  Что-то пошло не так. Попробуйте позже или позвоните +7 999 698-99-08
                </p>
              </motion.div>
            )}
          </form>

          {/* Contact row under form */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-10">
            <a href="tel:+79996989908" className="flex items-center gap-3 text-white/40 hover:text-white transition-colors group">
              <div className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center group-hover:border-[rgba(245,209,0,0.3)] transition-colors">
                <span className="text-sm">☎</span>
              </div>
              <span className="text-sm">+7 999 698-99-08</span>
            </a>
            <a href="mailto:com@aaabez.ru" className="flex items-center gap-3 text-white/40 hover:text-white transition-colors group">
              <div className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center group-hover:border-[rgba(245,209,0,0.3)] transition-colors">
                <span className="text-sm">✉</span>
              </div>
              <span className="text-sm">com@aaabez.ru</span>
            </a>
            <a href="https://t.me/arm014" className="flex items-center gap-3 text-white/40 hover:text-white transition-colors group">
              <div className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center group-hover:border-[rgba(245,209,0,0.3)] transition-colors">
                <span className="text-sm">TG</span>
              </div>
              <span className="text-sm">Telegram</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
