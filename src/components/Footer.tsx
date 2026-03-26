import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "О компании" },
  { href: "/videosurveillance", label: "Видеонаблюдение" },
  { href: "/explosionproof", label: "Электротехника" },
];

const socials = [
  { href: "https://t.me/arm014", label: "Telegram", icon: "TG" },
  { href: "https://wa.me/79996989908", label: "WhatsApp", icon: "WA" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0a0f] border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-20">
        {/* Main row */}
        <div className="py-16 lg:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Logo + tagline */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/images/icon/logo-footer.svg"
                alt="ААА-Безопасность"
                width={180}
                height={80}
                className="w-auto h-12"
              />
            </Link>
            <p className="text-white/30 text-sm leading-relaxed max-w-[240px]">
              Комплексные решения в области безопасности и электротехники
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white/50 text-xs font-semibold uppercase tracking-[3px] mb-6">
              Навигация
            </h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/40 text-sm hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-white/50 text-xs font-semibold uppercase tracking-[3px] mb-6">
              Контакты
            </h4>
            <div className="space-y-4">
              <div>
                <span className="text-white/25 text-xs uppercase tracking-wider block mb-1">Телефон</span>
                <a
                  href="tel:+79996989908"
                  className="text-white/70 text-sm hover:text-[#f5d100] transition-colors"
                >
                  +7 999 698-99-08
                </a>
              </div>
              <div>
                <span className="text-white/25 text-xs uppercase tracking-wider block mb-1">Email</span>
                <a
                  href="mailto:com@aaabez.ru"
                  className="text-white/70 text-sm hover:text-[#f5d100] transition-colors"
                >
                  com@aaabez.ru
                </a>
              </div>
            </div>
          </div>

          {/* Social + CTA */}
          <div>
            <h4 className="text-white/50 text-xs font-semibold uppercase tracking-[3px] mb-6">
              Мы в сети
            </h4>
            <div className="flex gap-3 mb-8">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/40 text-xs font-semibold hover:bg-white/[0.1] hover:border-[rgba(245,209,0,0.3)] hover:text-[#f5d100] transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <a
              href="#application"
              className="inline-block px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-[0_4px_20px_rgba(245,209,0,0.25)] hover:-translate-y-0.5"
              style={{ backgroundColor: "#f5d100", color: "#1a0c0a" }}
            >
              Оставить заявку
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} ААА-Безопасность. Все права защищены.
          </p>
          <Link
            href="/privacy"
            className="text-white/20 text-xs hover:text-white/40 transition-colors"
          >
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  );
}
