import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.redirect(new URL("/verificado?error=1", req.url));
  }

  try {
    await db.user.update({
      where: { id },
      data: {
        emailVerified: new Date(),
        emailVerifyToken: null, // opcional: limpiar token
      },
    });

    return NextResponse.redirect(new URL("/verificado", req.url));
  } catch (err) {
    console.error("Verificación fallida", err);
    return NextResponse.redirect(new URL("/verificado?error=1", req.url));
  }
}
