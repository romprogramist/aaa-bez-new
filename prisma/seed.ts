import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.document.count();
  if (count > 0) {
    console.log(`Already have ${count} documents, skipping.`);
  } else {

  await prisma.document.createMany({
    data: [
      {
        title: "Сертификат соответствия",
        description: "Сертификат партнёра LUIS+",
        image: "/images/docs/aaa-safety-luis.jpg",
        order: 1,
      },
      {
        title: "Лицензия",
        description: "Лицензия на осуществление деятельности",
        image: "/images/docs/llc-aaa-security.jpg",
        order: 2,
      },
      {
        title: "Свидетельство",
        description: "Свидетельство о регистрации",
        image: "/images/docs/certified-aaa.jpg",
        order: 3,
      },
    ],
  });

    console.log("Seeded 3 documents.");
  }

  // Seed partners
  const partnerCount = await prisma.partner.count();
  if (partnerCount > 0) {
    console.log(`Already have ${partnerCount} partners, skipping.`);
  } else {
    await prisma.partner.createMany({
      data: [
        { name: "ЭЛЕКТРОЛУЧ", description: "Производитель промышленного осветительного оборудования высокого качества", logo: "/images/partners/partners-logo-1.png", order: 1 },
        { name: "Galad", description: "Производитель осветительных устройств наружного, внутреннего, специального назначения. Входит в группу компаний «БЛ ГРУПП»", logo: "/images/partners/partners-logo-2.png", order: 2 },
        { name: "Opora Engineering", description: "Российский производитель металлоконструкций различного назначения. Входит в группу компаний «БЛ ГРУПП»", logo: "/images/partners/partners-logo-3.png", order: 3 },
        { name: "Компания «СМД»", description: "Производитель низковольтного взрывозащищённого электрооборудования", logo: "/images/partners/partners-logo-4.png", order: 4 },
        { name: "Вэлан", description: "Завод-производитель взрывозащищённого электрооборудования", logo: "/images/partners/partners-logo-5.png", order: 5 },
        { name: "Завод Горэлтех", description: "Предприятие полного цикла производства. Выпускает широкий ассортимент взрывозащищённого электрооборудования", logo: "/images/partners/partners-logo-6.png", order: 6 },
        { name: "Спецсветмонтаж", description: "Производитель светодиодных светильников общепромышленного и взрывозащищённого исполнения", logo: "/images/partners/partners-logo-7.png", order: 7 },
        { name: "Ардатовский светотехнический завод", description: "Российский производитель осветительных устройств различного назначения", logo: "/images/partners/partners-logo-8.png", order: 8 },
        { name: "Горэкс-Светотехника", description: "Завод взрывозащищённого и общепромышленного исполнения, специализирующийся на выпуске электрооборудования для шахт", logo: "/images/partners/partners-logo-9.png", order: 9 },
        { name: "Электротехника и Автоматизация", description: "Производитель низковольтных комплектных устройств общепромышленного назначения", logo: "/images/partners/partners-logo-10.png", order: 10 },
      ],
    });
    console.log("Seeded 10 partners.");
  }

  // Seed assortment
  const assortmentCount = await prisma.assortment.count();
  if (assortmentCount > 0) {
    console.log(`Already have ${assortmentCount} assortment items, skipping.`);
  } else {
    await prisma.assortment.createMany({
      data: [
        { title: "Взрывозащищенные распределительные коробки", description: "Распределительные коробки используются для соединения, защиты и распределения электропитания в различных системах. Обеспечение соединения проводов и защиты от коротких замыканий.", image: "/images/assortment/assortment-1-1.png", order: 1 },
        { title: "Взрывозащищенные светильники и прожекторы", description: "Светильники и прожекторы взрывозащищённого исполнения предназначены для освещения в опасных условиях, где требуется высокий уровень защиты от взрывов и механических нагрузок.", image: "/images/assortment/assortment-2-1.png", order: 2 },
        { title: "Наружное и внутреннее освещение", description: "Наружное освещение обеспечивает безопасность на открытых территориях. Внутреннее освещение создаёт комфортную атмосферу в помещениях.", image: "/images/assortment/assortment-3-1.png", order: 3 },
        { title: "Взрывозащищенные посты и шкафы управления", description: "Посты и шкафы управления взрывозащищённого исполнения обеспечивают безопасное управление в взрывоопасных зонах нефтегазовой и химической промышленности.", image: "/images/assortment/assortment-4-1.png", order: 4 },
        { title: "Низковольтные комплектные устройства (НКУ)", description: "НКУ предназначены для распределения и управления электроэнергией в низковольтных сетях до 1000 В. Применяются в промышленности, строительстве и коммунальном хозяйстве.", image: "/images/assortment/assortment-5-1.png", order: 5 },
        { title: "Взрывозащищённые выключатели и переключатели", description: "Выключатели предназначены для управления электрическими цепями, переключатели — для изменения направления потока тока. Изготовлены из металла с защитой Ex d и Ex e.", image: "/images/assortment/assortment-6-1.png", order: 6 },
        { title: "Кабельные вводы и соединители", description: "Кабельные вводы обеспечивают защиту места входа кабеля от пыли, влаги, механических повреждений. Соединители предназначены для надёжного соединения кабелей.", image: "/images/assortment/assortment-7-4.png", order: 7 },
        { title: "Металлоконструкции (мачты, опоры)", description: "Мачты используются для установки осветительных приборов, антенн и метеооборудования. Опоры поддерживают провода линий электропередач и оптоволоконные кабели.", image: "/images/assortment/assortment-8-1.png", order: 8 },
        { title: "Кабеленесущие системы", description: "Кабеленесущие системы включают кабельные лотки, коробы и лестницы для укладки и защиты кабелей. Включают силовые, сигнальные и оптические кабели.", image: "/images/assortment/assortment-9-1.png", order: 9 },
        { title: "Взрывозащищенные табло и сигнализация", description: "Взрывозащищенные табло и устройства сигнализации предназначены для работы в условиях повышенной опасности взрыва на нефтегазовых, химических и горнодобывающих предприятиях.", image: "/images/assortment/assortment-10-1.png", order: 10 },
      ],
    });
    console.log("Seeded 10 assortment items.");
  }

  // Seed customers
  const customerCount = await prisma.customer.count();
  if (customerCount > 0) {
    console.log(`Already have ${customerCount} customers, skipping.`);
  } else {
    await prisma.customer.createMany({
      data: [
        { name: 'АО "Москоллектор"', order: 1 },
        { name: 'ООО "Иркутская нефтяная компания"', order: 2 },
        { name: 'ООО "Лукойл-Пермь"', order: 3 },
        { name: 'АО "Метафракс Кемикалс"', order: 4 },
        { name: 'АО "Газпромнефть-МНПЗ"', order: 5 },
        { name: 'ПАО "Распадская"', order: 6 },
        { name: 'АО "ОХК "Уралхим"', order: 7 },
        { name: 'ФКП "Пермский Пороховой Завод"', order: 8 },
        { name: 'АО "Ненецкая Нефтяная Компания"', order: 9 },
      ],
    });
    console.log("Seeded 9 customers.");
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
