import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

// GET — all partners
export async function GET() {
  const partners = await prisma.partner.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(partners);
}

// POST — add partner
export async function POST(req: NextRequest) {
  const body = await req.json();

  const count = await prisma.partner.count();

  const partner = await prisma.partner.create({
    data: {
      name: body.name || "Без названия",
      description: body.description || null,
      logo: body.logo || "",
      order: body.order ?? count + 1,
    },
  });

  return NextResponse.json(partner, { status: 201 });
}

// DELETE — delete by id
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  await prisma.partner.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
