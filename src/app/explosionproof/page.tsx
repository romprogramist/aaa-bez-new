import type { Metadata } from "next";
import ExplosionProofContent from "./content";

export const metadata: Metadata = {
  title: "Взрывозащищенное оборудование | ААА-Безопасность",
  description:
    "Поставка взрывозащищенного электрооборудования для промышленных объектов. Светильники, коробки, посты управления, кабельные вводы. Сертифицированное оборудование от ведущих производителей.",
};

export default function ExplosionProofPage() {
  return <ExplosionProofContent />;
}
