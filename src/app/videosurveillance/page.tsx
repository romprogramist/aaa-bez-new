import type { Metadata } from "next";
import VideoSurveillanceContent from "./content";

export const metadata: Metadata = {
  title: "Системы видеонаблюдения и СКУД | ААА-Безопасность",
  description:
    "Профессиональная установка систем видеонаблюдения и СКУД. Электронное бюро пропусков, биометрический контроль доступа, интеграция с 1С.",
};

export default function VideoSurveillancePage() {
  return <VideoSurveillanceContent />;
}
