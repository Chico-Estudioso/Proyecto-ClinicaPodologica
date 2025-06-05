import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }

  const userId = params.id;
  const { banned } = await req.json();

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
      { message: "No puedes vetar a otro administrador" },
      { status: 403 }
    );
  }

  try {
    const updated = await db.user.update({
      where: { id: userId },
      data: { banned },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH /api/users/[id]/ban", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}
