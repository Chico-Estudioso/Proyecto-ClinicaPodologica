// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    // 1. Validaciones básicas
    if (
      !username ||
      typeof username !== "string" ||
      !email ||
      typeof email !== "string" ||
      !password ||
      typeof password !== "string"
    ) {
      return NextResponse.json(
        { message: "Datos incompletos o inválidos." },
        { status: 400 }
      );
    }

    // 2. Comprobar que no exista ya un usuario con ese username o email
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Usuario o email ya registrado." },
        { status: 409 }
      );
    }

    // 3. Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Crear el usuario en la base de datos
    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: "USER", // Rol por defecto
      },
    });

    return NextResponse.json(
      { message: "Usuario creado correctamente." },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error en /api/auth/register:", error);
    return NextResponse.json(
      { message: "Error interno del servidor." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
