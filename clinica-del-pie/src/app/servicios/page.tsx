import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Servicios | Clínica Podológica",
  description: "Conoce todos nuestros servicios y tratamientos podológicos profesionales.",
}

const services = [
  {
    title: "Quiropodia",
    description: "Tratamiento de callosidades, durezas, uñas encarnadas y otros problemas comunes del pie.",
    details:
      "La quiropodia es el tratamiento básico de podología que incluye el cuidado de la piel y uñas de los pies. Nuestros especialistas realizan la eliminación de callosidades, durezas, helomas (ojos de gallo) y el tratamiento de uñas encarnadas de forma indolora y efectiva.",
  },
  {
    title: "Podología deportiva",
    description: "Análisis biomecánico y tratamientos específicos para deportistas.",
    details:
      "La podología deportiva está enfocada en prevenir y tratar lesiones relacionadas con la práctica deportiva. Realizamos estudios biomecánicos completos para analizar la pisada durante la actividad física y recomendamos tratamientos específicos para mejorar el rendimiento y prevenir lesiones.",
  },
  {
    title: "Ortopodología",
    description: "Diseño y fabricación de plantillas personalizadas.",
    details:
      "Mediante un estudio biomecánico completo, diseñamos y fabricamos plantillas personalizadas (ortesis plantares) que corrigen alteraciones en la pisada y alivian dolores en pies, rodillas, caderas y espalda causados por una mala biomecánica.",
  },
  {
    title: "Podología pediátrica",
    description: "Cuidado especializado para los pies de los más pequeños.",
    details:
      "La podología pediátrica se centra en el diagnóstico y tratamiento de problemas podológicos en niños. Tratamos alteraciones como el pie plano, pie cavo, marcha en puntillas, y otros problemas que pueden afectar el desarrollo normal del pie infantil.",
  },
  {
    title: "Cirugía podológica",
    description: "Intervenciones quirúrgicas menores para solucionar problemas específicos.",
    details:
      "Realizamos cirugías menores como tratamiento de uñas encarnadas recurrentes, verrugas plantares, y otras patologías que requieren intervención quirúrgica. Todas las cirugías se realizan con anestesia local y generalmente son ambulatorias.",
  },
  {
    title: "Tratamiento de hongos",
    description: "Diagnóstico y tratamiento de infecciones fúngicas en pies y uñas.",
    details:
      "Las infecciones por hongos en las uñas (onicomicosis) y en la piel (pie de atleta) son problemas comunes que tratamos con terapias efectivas, incluyendo tratamientos tópicos, orales y láser según cada caso particular.",
  },
  {
    title: "Podología geriátrica",
    description: "Cuidado especializado para los pies de personas mayores.",
    details:
      "La podología geriátrica se enfoca en las necesidades específicas de los pies en la tercera edad. Tratamos problemas como la piel seca y agrietada, uñas engrosadas, deformidades por artritis y otras condiciones comunes en personas mayores.",
  },
  {
    title: "Estudio biomecánico",
    description: "Análisis completo de la pisada y la marcha.",
    details:
      "Mediante tecnología avanzada, realizamos un estudio completo de la pisada y la marcha para detectar alteraciones biomecánicas que pueden causar dolor o lesiones. El estudio incluye análisis estático y dinámico, presiones plantares y recomendaciones de tratamiento.",
  },
]

export default function ServiciosPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Nuestros Servicios</h1>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
          Ofrecemos una amplia gama de tratamientos podológicos con los más altos estándares de calidad y
          profesionalidad.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{service.details}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
