import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

// GET — all customers
export async function GET() {
  const customers = await prisma.customer.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(customers);
}

// POST — add customer
export async function POST(req: NextRequest) {
  const body = await req.json();

  const count = await prisma.customer.count();

  const customer = await prisma.customer.create({
    data: {
      name: body.name || "Без названия",
      order: body.order ?? count + 1,
    },
  });

  return NextResponse.json(customer, { status: 201 });
}

// DELETE — delete by id
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  await prisma.customer.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
