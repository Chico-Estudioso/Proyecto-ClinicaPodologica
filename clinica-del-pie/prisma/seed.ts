// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Verificar si ya existe un usuario con username "admin"
  const existingAdmin = await prisma.user.findUnique({
    where: { username: "admin" },
  });

  if (!existingAdmin) {
    const hashed = await bcrypt.hash("1m2s3g", 10);
    await prisma.user.create({
      data: {
        username: "admin",
        password: hashed,
        role: "ADMIN",
        email: "admin@clinicapodologica.com", // opcional
      },
    });
    console.log("🛡️ Usuario admin creado: usuario=admin, contraseña=1m2s3g");
  } else {
    console.log("⚠️ El usuario admin ya existe, no se crea de nuevo.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
