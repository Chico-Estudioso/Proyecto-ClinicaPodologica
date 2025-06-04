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
  const { date } = body;

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

  const newAppointment = await prisma.appointment.create({
    data: {
      userId: session.user.id,
      date: appointmentDate,
    },
  });

  return NextResponse.json(newAppointment, { status: 201 });
}
