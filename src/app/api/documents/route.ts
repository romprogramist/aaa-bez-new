import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

// GET — all documents
export async function GET() {
  const docs = await prisma.document.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(docs);
}

// POST — add document
export async function POST(req: NextRequest) {
  const body = await req.json();

  const count = await prisma.document.count();

  const doc = await prisma.document.create({
    data: {
      title: body.title || "Без названия",
      description: body.description || null,
      image: body.image || "",
      order: body.order ?? count + 1,
    },
  });

  return NextResponse.json(doc, { status: 201 });
}

// DELETE — delete by id
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  await prisma.document.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
