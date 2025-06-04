// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { resend } from "@/lib/resend";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

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

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ username }, { email }] },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Usuario o email ya registrado." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verifyToken = randomUUID();

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: "USER",
        emailVerifyToken: verifyToken,
      },
    });

    await resend.emails.send({
      from: "Clínica del Pie <onboarding@resend.dev>",
      to: newUser.email!,
      subject: "Verifica tu cuenta",
      html: `
        <h2>¡Hola, ${newUser.username}!</h2>
        <p>Gracias por registrarte en Clínica del Pie.</p>
        <p>Para activar tu cuenta, haz clic aquí:</p>
        <a href="http://localhost:3000/api/verify-email?token=${verifyToken}" target="_blank" style="color:#4f46e5;">
          Verificar cuenta
        </a>
        <p style="font-size:12px;color:gray;">Este enlace es válido hasta que verifiques tu cuenta. Si no fuiste tú, ignora este mensaje.</p>
      `,
    });

    return NextResponse.json(
      {
        message:
          "Usuario creado correctamente. Revisa tu correo para verificar tu cuenta.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en /api/auth/register:", error);
    return NextResponse.json(
      { message: "Error interno del servidor." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
