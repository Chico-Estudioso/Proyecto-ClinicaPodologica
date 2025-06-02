import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "sonner" 
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clínica Podológica | Cuidado profesional para tus pies",
  description:
    "Ofrecemos servicios profesionales de podología con los más altos estándares de calidad y atención personalizada.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* Aquí va el Navbar en todas las páginas */}
        <Navbar />

        {/* Renderiza la página concreta (p. ej. Home, Servicios, etc.) */}
        <main className="flex-1">{children}</main>

        {/* Footer en todas las páginas */}
        <Footer />

        {/* Toaster de Sonner (para notificaciones) */}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
