// src/app/dashboard/page.tsx
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  // 1) Recuperar la sesión en el servidor
  const session = await getServerSession(authOptions);

  // 2) Si no hay sesión → redirigir a /login
  if (!session) {
    return redirect("/login");
  }

  // 3) Ya podemos leer session.user.role y session.user.username directamente
  const isAdmin = session.user.role === "ADMIN";

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p className="mb-4">Hola, {session.user.username}.</p>
      {isAdmin ? (
        <div>
          <p className="text-green-700 font-medium">Eres Administrador.</p>
          {/* Funcionalidades de admin aquí */}
        </div>
      ) : (
        <p className="text-gray-700">Eres un usuario normal.</p>
      )}
      <div className="mt-8">
        <Button asChild>
          <a href="/api/auth/signout">Cerrar sesión</a>
        </Button>
      </div>
    </div>
  );
}
