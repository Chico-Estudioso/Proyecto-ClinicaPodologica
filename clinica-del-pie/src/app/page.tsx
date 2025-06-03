// src/app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Phone, MapPin, Clock } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Cuidado profesional para la salud de tus pies
              </h1>
              <p className="text-lg text-gray-700">
                En nuestra clínica podológica ofrecemos tratamientos personalizados con los más altos estándares de
                calidad y profesionalidad.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/contacto">Pedir cita</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/servicios">Ver servicios</Link>
                </Button>
                {/* Botón “Iniciar sesión” */}
                <Button asChild variant="outline" size="lg">
                  <Link href="/login">Iniciar sesión</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <div className="relative h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/cp.png?height=400&width=600"
                  alt="Clínica podológica moderna y profesional"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">¿Por qué elegirnos?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Experiencia profesional",
                description: "Nuestro equipo cuenta con años de experiencia y formación continua en podología.",
                icon: <CheckCircle className="h-10 w-10 text-blue-600" />,
              },
              {
                title: "Tecnología avanzada",
                description: "Utilizamos equipamiento de última generación para diagnósticos y tratamientos precisos.",
                icon: <CheckCircle className="h-10 w-10 text-blue-600" />,
              },
              {
                title: "Atención personalizada",
                description: "Cada paciente recibe un plan de tratamiento adaptado a sus necesidades específicas.",
                icon: <CheckCircle className="h-10 w-10 text-blue-600" />,
              },
            ].map((feature, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-700 text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Nuestros servicios</h2>
            <p className="mt-4 text-lg text-gray-700">Ofrecemos una amplia gama de tratamientos podológicos</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Quiropodia",
                description: "Tratamiento de callosidades, durezas y uñas encarnadas.",
              },
              {
                title: "Podología deportiva",
                description: "Análisis y tratamiento para deportistas.",
              },
              {
                title: "Ortopodología",
                description: "Diseño y fabricación de plantillas personalizadas.",
              },
            ].map((service, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-700 text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link href="/servicios">Ver todos los servicios</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Info Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md">
              <CardHeader className="flex flex-row items-center gap-4">
                <Phone className="h-6 w-6 text-blue-600" />
                <CardTitle className="text-xl">Contacto</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">+34 927 53 12 32</p>
                <p className="text-gray-700">info@clinicapodologica.com</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardHeader className="flex flex-row items-center gap-4">
                <MapPin className="h-6 w-6 text-blue-600" />
                <CardTitle className="text-xl">Ubicación</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Calle Agustín Carreño 2 Bajo 2 Clínica del pie</p>
                <p className="text-gray-700">10300 Cáceres, España</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardHeader className="flex flex-row items-center gap-4">
                <Clock className="h-6 w-6 text-blue-600" />
                <CardTitle className="text-xl">Horario</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Lunes a Viernes: 9:00 - 20:00</p>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-10">
            <Button asChild className="bg-blue-600 hover:bg-blue-700" size="lg">
              <Link href="/contacto">Contactar ahora</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
