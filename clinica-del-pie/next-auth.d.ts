// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * Ampliamos la sesión de NextAuth para que Session.user incluya:
   *   - id (string)
   *   - username (string)
   *   - role (string)
   *   - email (opcional)
   */
  interface Session extends DefaultSession {
    user: {
      id: string;
      username: string;
      role: string;
    } & Omit<DefaultSession["user"], "name" | "email" | "image">; // mantenemos email/image si quieres
  }

  /**
   * Si quisieras que en los callbacks `user` (al hacer login) 
   * aparezcan `id`, `username`, `role`, puedes extender DefaultUser.
   */
  interface User extends DefaultUser {
    id: string;
    username: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  /**
   * Ampliamos el JWT que NextAuth usa para incluir `role`.
   */
  interface JWT {
    role: string;
    sub: string;
    name: string;
  }
}
