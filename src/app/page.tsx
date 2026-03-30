import type { Metadata } from "next";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Customers from "@/components/Customers";
import Documents from "@/components/Documents";
import Application from "@/components/Application";

export const metadata: Metadata = {
  title:
    "ААА-Безопасность — Системы видеонаблюдения, СКУД и взрывозащищённое оборудование",
  description:
    "ООО «ААА-Безопасность» — установка систем видеонаблюдения, СКУД, электронного бюро пропусков и поставка взрывозащищённого оборудования. Более 500 реализованных проектов. Работаем по всей России.",
  keywords: [
    "ААА-Безопасность",
    "системы безопасности",
    "видеонаблюдение",
    "СКУД",
    "взрывозащищённое оборудование",
    "контроль доступа",
    "установка видеонаблюдения",
    "промышленная безопасность",
    "охранные системы",
    "безопасность предприятий",
  ],
  alternates: {
    canonical: "https://aaabez.ru",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <Customers />
      <Documents />
      <Application />
    </>
  );
}
