"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "О компании" },
  { href: "/videosurveillance", label: "Видеонаблюдение" },
  { href: "/explosionproof", label: "Электротехника" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", menuOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          scrolled
            ? "bg-[rgba(10,10,15,0.75)] backdrop-blur-[24px] border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent"
        }`}
      >
        <div
          className={`max-w-[1400px] mx-auto px-6 flex items-center justify-between transition-[height] duration-300 ${
            scrolled ? "h-[72px]" : "h-[88px]"
          }`}
        >
          {/* Logo big */}
          <Link href="/" className="flex-shrink-0 hidden sm:block">
            <Image
              src="/images/icon/logo-big.svg"
              alt="ААА-Безопасность"
              width={265}
              height={110}
              className={`transition-[height] duration-300 w-auto ${
                scrolled ? "h-12" : "h-16"
              }`}
              priority
            />
          </Link>

          {/* Logo min */}
          <Link href="/" className="flex-shrink-0 block sm:hidden">
            <Image
              src="/images/icon/logo-min.svg"
              alt="ААА-Безопасность"
              width={58}
              height={78}
              className="h-9 w-auto"
              priority
            />
          </Link>

          {/* Nav */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm px-4 py-2 rounded-lg transition-all duration-300 ${
                  pathname === link.href
                    ? "text-white after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-5 after:h-0.5 after:bg-[#f5d100] after:rounded-full"
                    : "text-white/65 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 xl:gap-5 flex-shrink-0">
            <a
              href="mailto:com@aaabez.ru"
              className="hidden xl:block text-white/80 text-sm font-medium hover:text-white transition-colors"
            >
              com@aaabez.ru
            </a>
            <span className="hidden xl:block text-white/20">|</span>
            <a
              href="tel:+79996989908"
              className="hidden lg:block text-white/80 text-sm font-medium hover:text-white transition-colors"
            >
              +7 999 698-99-08
            </a>
            <a
              href="#application"
              className="hidden sm:inline-block px-6 py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-300 cursor-pointer hover:shadow-[0_4px_20px_rgba(245,209,0,0.3)] hover:-translate-y-px"
              style={{ backgroundColor: '#f5d100', color: '#1a0c0a' }}
            >
              Оставить заявку
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex lg:hidden flex-col justify-center gap-[5px] w-10 h-10 p-2 bg-white/[0.08] border border-white/10 rounded-lg cursor-pointer transition-all hover:bg-white/[0.12]"
              aria-expanded={menuOpen}
              aria-label="Меню"
            >
              <span
                className={`block w-full h-0.5 bg-white rounded-full transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`block w-full h-0.5 bg-white rounded-full transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-full h-0.5 bg-white rounded-full transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Bottom Sheet Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 z-[1001]"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[1002] bg-[rgba(15,15,25,0.97)] backdrop-blur-[30px] rounded-t-3xl border-t border-white/[0.08] px-6 pb-10 pt-3"
            >
              {/* Handle */}
              <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-6" />

              {/* Links */}
              <nav className="flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const icons = ["☉", "☊", "⚡"];
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all text-base ${
                        isActive
                          ? "bg-white/[0.06] text-white"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-[10px] flex items-center justify-center text-base ${
                          isActive
                            ? "bg-[rgba(245,209,0,0.15)]"
                            : "bg-white/[0.06]"
                        }`}
                      >
                        {icons[i]}
                      </div>
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Divider */}
              <div className="h-px bg-white/[0.06] my-2" />

              {/* Contact + CTA */}
              <div className="flex flex-col gap-2.5 mt-1">
                <a
                  href="tel:+79996989908"
                  className="w-full py-3.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white/70 text-[13px] font-medium text-center no-underline"
                >
                  +7 999 698-99-08
                </a>
                <a
                  href="mailto:com@aaabez.ru"
                  className="w-full py-3.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white/70 text-[13px] font-medium text-center no-underline"
                >
                  com@aaabez.ru
                </a>
                <a
                  href="#application"
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-3.5 rounded-xl bg-[#f5d100] text-[#1a0c0a] text-[13px] font-semibold text-center cursor-pointer block no-underline"
                >
                  Оставить заявку
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
