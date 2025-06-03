// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 días (en segundos)
  },
  providers: [
    CredentialsProvider({
      name: "Credenciales",
      credentials: {
        username: { label: "Usuario", type: "text", placeholder: "admin" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { username, password } = credentials;

        // 1) Buscamos el usuario en SQLite (tabla User)
        const userInDb = await prisma.user.findUnique({
          where: { username },
        });
        if (!userInDb) return null;

        // 2) Comparamos la contraseña
        const isValid = await bcrypt.compare(password, userInDb.password);
        if (!isValid) return null;

        // 3) Devolvemos el objeto con id, username, role
        return {
          id: userInDb.id,
          username: userInDb.username,
          role: userInDb.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Al hacer login (user existe), añadimos role y sub (id) al token
      if (user) {
        token.sub = user.id;
        token.name = user.username;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // token.sub es el id, token.name es username, token.role es role
      if (token && session.user) {
        session.user.id = token.sub as string;
        session.user.username = token.name as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login", // Usamos /login como ruta de inicio de sesión
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
