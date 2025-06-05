// src/app/api/users/[id]/ban/route.ts
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return new NextResponse("No autorizado", { status: 401 });
  }

  const { banned } = await req.json();
  if (typeof banned !== "boolean") {
    return new NextResponse("Parámetro inválido", { status: 400 });
  }

  await db.user.update({
    where: { id: params.id },
    data: { banned },
  });

  return NextResponse.json({ ok: true });
}
