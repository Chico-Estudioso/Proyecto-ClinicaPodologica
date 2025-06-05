import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }

  const userId = params.id;

  const targetUser = await db.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  if (!targetUser) {
    return NextResponse.json(
      { message: "Usuario no encontrado" },
      { status: 404 }
    );
  }

  if (targetUser.role === "ADMIN") {
    return NextResponse.json(
      { message: "No puedes eliminar a otro administrador" },
      { status: 403 }
    );
  }

  try {
    // Borrar citas asociadas
    await db.appointment.deleteMany({ where: { userId } });
    // Borrar usuario
    await db.user.delete({ where: { id: userId } });

    return NextResponse.json({ message: "Usuario eliminado" });
  } catch (error) {
    console.error("DELETE /api/users/[id]", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}
