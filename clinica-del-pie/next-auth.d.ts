// src/types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      username: string;
      role: string;
      email: string | null;
      emailVerified: string | null; // 👈 AÑADIDO
    };
  }

  interface User extends DefaultUser {
    id: string;
    username: string;
    role: string;
    email: string | null;
    emailVerified: string | null; // 👈 AÑADIDO
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub: string;
    role: string;
    name?: string | null;
    email: string | null;
    emailVerified: string | null; // 👈 AÑADIDO
  }
}
