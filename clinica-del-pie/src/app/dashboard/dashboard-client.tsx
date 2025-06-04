"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Props = {
  appointments: {
    id: string;
    date: string; // ✅ Ahora es string
  }[];
  isAdmin: boolean;
  username: string;
};

export default function DashboardClient({
  appointments: initialAppointments,
  isAdmin,
  username,
}: Props) {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [isPending, startTransition] = useTransition();

  const handleCancel = async (id: string) => {
    const res = await fetch(`/api/appointments/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("Cita cancelada correctamente.");
      startTransition(() =>
        setAppointments((prev) => prev.filter((a) => a.id !== id))
      );
    } else {
      const { error } = await res.json();
      toast.error(error || "Error al cancelar cita.");
    }
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">PÁGINA USUARIOS</h1>
      <p className="mb-4">Hola, {username}.</p>

      {isAdmin ? (
        <p className="text-green-700 font-medium">Eres Administrador.</p>
      ) : (
        <p className="text-gray-700">Eres un usuario registrado ya.</p>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Tus citas reservadas</h2>

        {appointments.length === 0 ? (
          <p className="text-gray-500">No tienes citas reservadas todavía.</p>
        ) : (
          <ul className="space-y-4">
            {appointments.map((appt) => (
              <li
                key={appt.id}
                className="border p-4 rounded-md shadow-sm bg-white flex justify-between items-center"
              >
                <div>
                  <p className="text-gray-800 font-medium">
                    Fecha:{" "}
                    {new Date(appt.date).toLocaleDateString("es-ES", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-gray-700">
                    Hora:{" "}
                    {new Date(appt.date).toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  disabled={isPending}
                  onClick={() => handleCancel(appt.id)}
                  className="cursor-pointer"
                >
                  Cancelar
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
