"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Appointment = {
  id: string;
  date: string;
  attended: boolean | null;
};

type Props = {
  appointments: Appointment[];
  isAdmin: boolean;
  username: string;
  emailVerified: string | null | undefined;
  banned: boolean;
};

export default function DashboardClient({
  appointments: initialAppointments,
  isAdmin,
  username,
  emailVerified,
  banned,
}: Props) {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [isPending, startTransition] = useTransition();
  const [resendLoading, setResendLoading] = useState(false);

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

  const handleResendEmail = async () => {
    setResendLoading(true);
    try {
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Correo reenviado");
      } else {
        toast.error(data.message || "No se pudo reenviar el correo");
      }
    } catch (err) {
      toast.error("Error al reenviar verificación.");
    } finally {
      setResendLoading(false);
    }
  };

  const now = new Date();
  const citasFuturas = appointments.filter((appt) => new Date(appt.date) > now);
  const citasPasadas = appointments.filter(
    (appt) => new Date(appt.date) <= now
  );

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">PÁGINA USUARIOS</h1>
      <p className="mb-2">Hola, {username}.</p>

      {isAdmin ? (
        <p className="text-green-700 font-medium mb-4">Eres Administrador.</p>
      ) : (
        <p className="text-gray-700 mb-4">Eres un usuario registrado.</p>
      )}

      {!isAdmin && emailVerified === null && (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded mb-6">
          ⚠️ Tu cuenta aún no está verificada.
          <br />
          Puedes reservar 1 sola cita. Revisa tu correo o{" "}
          <Button
            variant="outline"
            size="sm"
            className="ml-2"
            onClick={handleResendEmail}
            disabled={resendLoading}
          >
            Reenviar email de verificación
          </Button>
        </div>
      )}

      {!isAdmin && banned && (
        <div className="bg-red-100 text-red-800 p-4 rounded mb-6">
          🚫 Tu cuenta ha sido vetada por no asistir a citas.
          <br />
          No podrás reservar nuevas citas hasta que un administrador levante el
          veto.
        </div>
      )}

      {/* FUTURAS */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Próximas citas</h2>
        {citasFuturas.length === 0 ? (
          <p className="text-gray-500">No tienes citas próximas.</p>
        ) : (
          <ul className="space-y-4">
            {citasFuturas.map((appt) => (
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

      {/* PASADAS */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Citas completadas</h2>
        {citasPasadas.length === 0 ? (
          <p className="text-gray-500">No tienes citas anteriores.</p>
        ) : (
          <ul className="space-y-4">
            {citasPasadas.map((appt) => (
              <li
                key={appt.id}
                className="border p-4 rounded-md shadow-sm bg-gray-50"
              >
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
                <p className="text-sm mt-1">
                  Estado:{" "}
                  {appt.attended === true
                    ? "✅ Asististe"
                    : appt.attended === false
                      ? "❌ No asististe"
                      : "⏳ Pendiente de revisión"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
