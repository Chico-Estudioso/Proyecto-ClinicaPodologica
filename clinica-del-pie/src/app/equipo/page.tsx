import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Equipo | Clínica Podológica",
  description: "Conoce a nuestro equipo de profesionales en podología.",
}

const team = [
  {
    name: "Dr. Marcos Serrano",
    role: "Podólogo Director",
    bio: "Licenciado en Podología con más de 30 años de experiencia. Especialista en postureo podológico y cirugía podológica. Ex profesor de la Universidad Española de Podología.",
    image: "/durotan.png?height=400&width=400",
  },
  {
    name: "Dra. Alba",
    role: "Podóloga",
    bio: "Especialista en podología pediátrica y ortopodología. Con 15 años de experiencia en el tratamiento de problemas podológicos en niños y adolescentes.",
    image: "/placeholder.svg?height=400&width=400",
  }
]

export default function EquipoPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Nuestro Equipo</h1>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
          Contamos con profesionales altamente cualificados y con amplia experiencia en el campo de la podología.
        </p>
      </div>

      {/** === REJILLA ADAPTATIVA === **/}
      <div
        className="
          grid
          gap-8
          /* Cada card tendrá un ancho mínimo de 280px y máximo flexible */
          grid-cols-[repeat(auto-fit,minmax(280px,1fr))]
        "
      >
        {team.map((member, index) => (
          <Card
            key={index}
            className="
              border-none
              shadow-md
              hover:shadow-lg
              transition-shadow
              overflow-hidden
              flex
              flex-col
              h-full
            "
          >
            <div className="relative h-64 w-full">
              <Image
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle>{member.name}</CardTitle>
              <CardDescription>{member.role}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-gray-700">{member.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 bg-blue-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Nuestra filosofía</h2>
        <p className="text-gray-700">
          En nuestra clínica creemos en un enfoque integral de la salud podológica. No solo tratamos los síntomas, sino
          que buscamos la causa raíz de los problemas para ofrecer soluciones duraderas. Nos mantenemos constantemente
          actualizados con las últimas técnicas y avances en podología para ofrecer a nuestros pacientes los mejores
          tratamientos disponibles.
        </p>
        <p className="text-gray-700 mt-4">
          Nuestro compromiso es proporcionar una atención personalizada y de alta calidad, adaptada a las necesidades
          específicas de cada paciente, en un ambiente cómodo y profesional.
        </p>
      </div>
    </div>
  )
}
