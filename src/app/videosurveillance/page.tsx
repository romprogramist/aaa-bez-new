import type { Metadata } from "next";
import VideoSurveillanceContent from "./content";

export const metadata: Metadata = {
  title: "Системы видеонаблюдения и СКУД",
  description:
    "Профессиональная установка систем видеонаблюдения и СКУД для жилых комплексов, офисов и промышленных объектов. Электронное бюро пропусков, биометрический контроль доступа, интеграция с 1С. Обслуживание по всей России.",
  keywords: [
    "установка видеонаблюдения",
    "СКУД монтаж",
    "система контроля доступа",
    "электронное бюро пропусков",
    "камеры видеонаблюдения",
    "биометрический контроль",
    "видеонаблюдение для бизнеса",
    "видеонаблюдение для ЖК",
    "IP камеры",
    "распознавание лиц СКУД",
  ],
  openGraph: {
    title: "Системы видеонаблюдения и СКУД | ААА-Безопасность",
    description:
      "Установка и обслуживание систем видеонаблюдения, СКУД и электронного бюро пропусков. Работаем с ведущими застройщиками России.",
    url: "https://aaabez.ru/videosurveillance",
    images: [
      {
        url: "/images/video/hero-surveillance.jpg",
        width: 1200,
        height: 630,
        alt: "Системы видеонаблюдения и СКУД — ААА-Безопасность",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Системы видеонаблюдения и СКУД | ААА-Безопасность",
    description:
      "Установка и обслуживание систем видеонаблюдения, СКУД и электронного бюро пропусков.",
    images: ["/images/video/hero-surveillance.jpg"],
  },
  alternates: {
    canonical: "https://aaabez.ru/videosurveillance",
  },
};

export default function VideoSurveillancePage() {
  return <VideoSurveillanceContent />;
}
