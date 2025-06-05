// src/app/api/users/all/route.ts
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }

  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        emailVerified: true,
        createdAt: true,
        banned: true,
        role: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("[GET /api/users/all]", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}
