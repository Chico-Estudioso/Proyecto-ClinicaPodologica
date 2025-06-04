"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Appointment = {
  id: string;
  date: string;
  user: {
    username: string;
    email: string;
  };
  attended: boolean | null;
};

type Props = {
  appointments: Appointment[];
};

export default function AdminCitasPage({ appointments: initial }: Props) {
  const [appointments, setAppointments] = useState(initial);
  const [isPending, startTransition] = useTransition();
  const [filterDate, setFilterDate] = useState<string>("");
  const [filterUser, setFilterUser] = useState<string>("");

  const now = new Date();

  const handleMarkAttendance = async (id: string, attended: boolean) => {
    const res = await fetch(`/api/appointments/${id}/attended`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ attended }),
    });

    if (res.ok) {
      toast.success(
        `Cita marcada como "${attended ? "Asistió" : "No asistió"}"`
      );
      const updated = await res.json();
      startTransition(() =>
        setAppointments((prev) =>
          prev.map((a) => (a.id === id ? { ...a, attended } : a))
        )
      );
    } else {
      toast.error("Error al guardar la asistencia.");
    }
  };

  const filteredAppointments = appointments.filter((appt) => {
    const matchesUser = appt.user.username
      .toLowerCase()
      .includes(filterUser.toLowerCase());
    const matchesDate = filterDate
      ? appt.date.slice(0, 10) === filterDate
      : true;
    return matchesUser && matchesDate;
  });

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border rounded px-4 py-2"
        />
        <input
          type="text"
          placeholder="Buscar por usuario"
          value={filterUser}
          onChange={(e) => setFilterUser(e.target.value)}
          className="border rounded px-4 py-2"
        />
        <Button
          onClick={() => {
            setFilterDate("");
            setFilterUser("");
          }}
        >
          Limpiar filtros
        </Button>
      </div>

      {/* Citas */}
      {filteredAppointments.length === 0 ? (
        <p className="text-gray-500">No hay citas con ese filtro.</p>
      ) : (
        <ul className="space-y-4">
          {filteredAppointments.map((appt) => {
            const isPast = new Date(appt.date) <= now;

            return (
              <li
                key={appt.id}
                className="border p-4 rounded-md shadow-sm bg-white"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">
                      {new Date(appt.date).toLocaleDateString("es-ES", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      -{" "}
                      {new Date(appt.date).toLocaleTimeString("es-ES", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="text-sm text-gray-600">
                      Usuario: {appt.user.username} ({appt.user.email})
                    </p>

                    {isPast && (
                      <p className="mt-1 text-sm">
                        Estado:{" "}
                        {appt.attended === true
                          ? "✅ Asistió"
                          : appt.attended === false
                          ? "❌ No asistió"
                          : "⏳ Pendiente"}
                      </p>
                    )}
                  </div>

                  {isPast ? (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handleMarkAttendance(appt.id, true)}
                        disabled={appt.attended === true || isPending}
                      >
                        Asistió
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleMarkAttendance(appt.id, false)}
                        disabled={appt.attended === false || isPending}
                      >
                        No asistió
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="destructive"
                      onClick={() => {
                        fetch(`/api/appointments/${appt.id}`, {
                          method: "DELETE",
                        }).then((res) => {
                          if (res.ok) {
                            toast.success("Cita cancelada.");
                            setAppointments((prev) =>
                              prev.filter((a) => a.id !== appt.id)
                            );
                          } else toast.error("Error al cancelar.");
                        });
                      }}
                      className="cursor-pointer"
                    >
                      Cancelar
                    </Button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
