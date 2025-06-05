import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ message: "No autenticado" }, { status: 401 });
  }

  const body = await req.json();
  const { date, userId } = body;

  if (!date) {
    return NextResponse.json({ message: "Fecha requerida" }, { status: 400 });
  }

  const appointmentDate = new Date(date);

  const existing = await prisma.appointment.findFirst({
    where: { date: appointmentDate },
  });

  if (existing) {
    return NextResponse.json({ message: "Hora ya reservada" }, { status: 400 });
  }

  // Si es ADMIN puede usar el userId que venga, si no, forzamos el suyo
  const finalUserId =
    session.user.role === "ADMIN" && userId ? userId : session.user.id;

  const user = await prisma.user.findUnique({
    where: { id: finalUserId },
  });

  if (!user) {
    return NextResponse.json(
      { message: "Usuario no encontrado" },
      { status: 404 }
    );
  }

  if (user.banned) {
    return NextResponse.json(
      {
        message: "El usuario está vetado. Contacta con un administrador.",
      },
      { status: 403 }
    );
  }

  const newAppointment = await prisma.appointment.create({
    data: {
      userId: finalUserId,
      date: appointmentDate,
    },
  });

  return NextResponse.json(newAppointment, { status: 201 });
}
