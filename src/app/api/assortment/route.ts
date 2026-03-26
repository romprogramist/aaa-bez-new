import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  const items = await prisma.assortment.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const count = await prisma.assortment.count();

  const item = await prisma.assortment.create({
    data: {
      title: body.title || "Без названия",
      description: body.description || null,
      image: body.image || "",
      order: body.order ?? count + 1,
    },
  });

  return NextResponse.json(item, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  await prisma.assortment.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
