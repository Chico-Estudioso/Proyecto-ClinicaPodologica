"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Servicios", href: "/servicios" },
  { name: "Equipo", href: "/equipo" },
  { name: "Contacto", href: "/contacto" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { data: session, status } = useSession();
  const pathname = usePathname();

  const handlePedirCita = () => {
    if (session) {
      window.location.href = "/citas/reservar";
    } else {
      window.location.href = "/contacto";
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <div className="flex lg:flex-1">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-blue-600">
              Clínica Podológica
            </span>
          </Link>
        </div>

        {/* Botón para abrir menú móvil */}
        <div className="flex lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Abrir menú</span>
          </Button>
        </div>

        {/* Navegación de escritorio */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-base font-medium transition-colors ${
                pathname === item.href
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Zona derecha: “Pedir cita” + login/usuario */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center gap-4 relative">
          {/* ✅ Botón dinámico de Pedir cita */}
          <Button
            onClick={handlePedirCita}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Pedir cita
          </Button>

          {status === "loading" ? (
            <div className="ml-4 text-gray-500">Cargando…</div>
          ) : session ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="inline-flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <span className="text-gray-700">{session.user.username}</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>
              {userMenuOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                  <li>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Mis datos
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Button asChild variant="outline">
              <Link href="/login">Iniciar sesión</Link>
            </Button>
          )}
        </div>

        {/* Menú móvil */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div
              className="fixed inset-0 bg-black/25"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm">
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="-m-1.5 p-1.5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-xl font-bold text-blue-600">
                    Clínica Podológica
                  </span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-6 w-6" />
                  <span className="sr-only">Cerrar menú</span>
                </Button>
              </div>
              <div className="mt-6 flow-root">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-medium ${
                        pathname === item.href
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* ✅ Botón móvil de Pedir cita */}
                <div className="py-6">
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (session) {
                        window.location.href = "/citas/reservar";
                      } else {
                        window.location.href = "/contacto";
                      }
                    }}
                  >
                    Pedir cita
                  </Button>
                </div>

                <div className="py-4 border-t border-gray-200">
                  {session ? (
                    <button
                      onClick={() => {
                        signOut({ callbackUrl: "/" });
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Cerrar sesión
                    </button>
                  ) : (
                    <Button
                      asChild
                      className="w-full bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Link href="/login">Iniciar sesión</Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
