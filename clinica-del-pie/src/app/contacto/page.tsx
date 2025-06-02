"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { toast } from "sonner" // Cambiado a sonner

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulamos el envío del formulario
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast.success("Mensaje enviado", {
      description: "Nos pondremos en contacto contigo lo antes posible."
    })

    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      mensaje: "",
    })
    setIsSubmitting(false)
  }


  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Contacto</h1>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
          Estamos aquí para ayudarte. Ponte en contacto con nosotros para cualquier consulta o para pedir cita.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Formulario de contacto</CardTitle>
              <CardDescription>
                Rellena el formulario y nos pondremos en contacto contigo lo antes posible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre completo</Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    placeholder="Tu nombre"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    placeholder="Tu número de teléfono"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mensaje">Mensaje</Label>
                  <Textarea
                    id="mensaje"
                    name="mensaje"
                    placeholder="¿En qué podemos ayudarte?"
                    rows={4}
                    required
                    value={formData.mensaje}
                    onChange={handleChange}
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Información de contacto</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-medium">Teléfono</h3>
                  <p className="text-gray-700">+34 927 53 12 32</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-700">info@clinicapodologica.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-medium">Dirección</h3>
                  <p className="text-gray-700">Calle Agustín Carreño 2 Bajo 2 Clínica del pie</p>
                  <p className="text-gray-700">10300 Cáceres, España</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-medium">Horario</h3>
                  <p className="text-gray-700">Lunes a Viernes: 9:00 - 20:00</p>
                  
                </div>
              </div>
            </div>
          </div>

          <div>
  <h2 className="text-2xl font-bold text-gray-900 mb-6">Ubicación</h2>
 <div className="h-[300px] rounded-lg overflow-hidden shadow-md">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191.32401483068122!2d-5.545423069881883!3d39.892507193300425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd3fd9cb9d4c13a7%3A0x43261f848d1ebf56!2sC.%20Agust%C3%ADn%20Carre%C3%B1o%2C%202%2C%20Bajo%202%2C%2010300%20Navalmoral%20de%20la%20Mata%2C%20C%C3%A1ceres!5e0!3m2!1ses!2ses!4v1748877581678!5m2!1ses!2ses"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    className="w-full h-full"
  ></iframe>
</div>

  <p className="mt-4 text-gray-700">
    Estamos ubicados en una zona céntrica de fácil acceso, con paradas de transporte público cercanas y aparcamiento disponible.
  </p>
</div>

        </div>
      </div>
    </div>
  )
}
