import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const appointment = await db.appointment.findUnique({
    where: { id: params.id },
  });

  if (!appointment || appointment.userId !== session.user.id) {
    return NextResponse.json(
      { error: "Cita no encontrada o sin permiso" },
      { status: 403 }
    );
  }

  await db.appointment.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ message: "Cita cancelada correctamente" });
}
