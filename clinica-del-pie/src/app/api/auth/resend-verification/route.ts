import { resend } from "@/lib/resend";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.email) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user || user.emailVerified) {
    return NextResponse.json(
      { message: "Ya está verificado o no existe" },
      { status: 400 }
    );
  }

  const token = user.emailVerifyToken || crypto.randomUUID();

  await db.user.update({
    where: { id: user.id },
    data: { emailVerifyToken: token },
  });

  if (!user.email) {
    return NextResponse.json(
      { message: "El usuario no tiene email" },
      { status: 400 }
    );
  }

  await resend.emails.send({
    from: "Clínica del Pie <onboarding@resend.dev>",
    to: user.email,
    subject: "Verifica tu cuenta",
    html: `
    <h2>¡Hola, ${user.username}!</h2>
    <p>Haz clic en el siguiente enlace para verificar tu cuenta:</p>
    <a href="http://localhost:3000/api/verify-email?token=${user.emailVerifyToken}">
      Verificar cuenta
    </a>
  `,
  });

  return NextResponse.json({ message: "Correo reenviado" });
}
