import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }

  const appointment = await prisma.appointment.findUnique({
    where: { id: params.id },
  });

  if (!appointment) {
    return NextResponse.json(
      { message: "Cita no encontrada" },
      { status: 404 }
    );
  }

  const isOwner = appointment.userId === session.user.id;
  const isAdmin = session.user.role === "ADMIN";

  if (!isOwner && !isAdmin) {
    return NextResponse.json({ message: "No autorizado" }, { status: 403 });
  }

  await prisma.appointment.delete({ where: { id: params.id } });

  return NextResponse.json({ message: "Cita cancelada" }, { status: 200 });
}
