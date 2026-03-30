import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aaabez.ru"),
  title: {
    default:
      "ААА-Безопасность — Системы видеонаблюдения, СКУД и взрывозащищённое оборудование",
    template: "%s | ААА-Безопасность",
  },
  description:
    "ООО «ААА-Безопасность» — установка систем видеонаблюдения, СКУД, электронного бюро пропусков и поставка взрывозащищённого оборудования для промышленных объектов. Работаем по всей России.",
  keywords: [
    "видеонаблюдение",
    "СКУД",
    "системы безопасности",
    "взрывозащищённое оборудование",
    "контроль доступа",
    "электронное бюро пропусков",
    "установка видеонаблюдения",
    "промышленная безопасность",
    "взрывозащита",
    "ААА-Безопасность",
    "камеры видеонаблюдения",
    "монтаж СКУД",
    "биометрический контроль доступа",
    "взрывозащищённые светильники",
    "кабельные вводы",
    "посты управления взрывозащищённые",
  ],
  authors: [{ name: "ООО «ААА-Безопасность»" }],
  creator: "ООО «ААА-Безопасность»",
  publisher: "ООО «ААА-Безопасность»",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://aaabez.ru",
    siteName: "ААА-Безопасность",
    title:
      "ААА-Безопасность — Системы видеонаблюдения, СКУД и взрывозащищённое оборудование",
    description:
      "Установка систем видеонаблюдения, СКУД и поставка взрывозащищённого оборудования для промышленных объектов. Работаем по всей России.",
    images: [
      {
        url: "/images/video/hero-surveillance.jpg",
        width: 1200,
        height: 630,
        alt: "ААА-Безопасность — системы видеонаблюдения и безопасности",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "ААА-Безопасность — Системы видеонаблюдения, СКУД и взрывозащищённое оборудование",
    description:
      "Установка систем видеонаблюдения, СКУД и поставка взрывозащищённого оборудования для промышленных объектов.",
    images: ["/images/video/hero-surveillance.jpg"],
  },
  alternates: {
    canonical: "https://aaabez.ru",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://aaabez.ru/#organization",
      name: "ООО «ААА-Безопасность»",
      url: "https://aaabez.ru",
      logo: {
        "@type": "ImageObject",
        url: "https://aaabez.ru/images/icon/logo-big.svg",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+7-999-698-99-08",
        contactType: "sales",
        availableLanguage: "Russian",
      },
      email: "com@aaabez.ru",
      sameAs: ["https://t.me/arm014"],
    },
    {
      "@type": "WebSite",
      "@id": "https://aaabez.ru/#website",
      url: "https://aaabez.ru",
      name: "ААА-Безопасность",
      publisher: { "@id": "https://aaabez.ru/#organization" },
      inLanguage: "ru-RU",
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://aaabez.ru/#localbusiness",
      name: "ООО «ААА-Безопасность»",
      url: "https://aaabez.ru",
      telephone: "+7-999-698-99-08",
      email: "com@aaabez.ru",
      image: "https://aaabez.ru/images/icon/logo-big.svg",
      description:
        "Установка систем видеонаблюдения, СКУД, электронного бюро пропусков и поставка взрывозащищённого электрооборудования для промышленных объектов.",
      priceRange: "$$",
      openingHours: "Mo-Fr 09:00-18:00",
      serviceArea: {
        "@type": "Country",
        name: "Россия",
      },
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Установка систем видеонаблюдения",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Монтаж СКУД и контроля доступа",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Поставка взрывозащищённого оборудования",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
