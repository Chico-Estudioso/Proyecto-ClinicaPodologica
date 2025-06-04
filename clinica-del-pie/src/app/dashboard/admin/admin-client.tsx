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
};

type Props = {
  appointments: Appointment[];
};

export default function AdminCitasPage({ appointments: initial }: Props) {
  const [appointments, setAppointments] = useState(initial);
  const [isPending, startTransition] = useTransition();

  const [filterDate, setFilterDate] = useState<string>("");
  const [filterUser, setFilterUser] = useState<string>("");

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

  const filteredAppointments = appointments.filter((appt) => {
    const matchesUser = appt.user.username
      .toLowerCase()
      .includes(filterUser.toLowerCase());
    const matchesDate = filterDate
      ? appt.date.slice(0, 10) === filterDate
      : true;
    return matchesUser && matchesDate;
  });

  const exportToCSV = () => {
    const rows = [
      ["Usuario", "Email", "Fecha", "Hora"],
      ...filteredAppointments.map((a) => [
        a.user.username,
        a.user.email,
        new Date(a.date).toLocaleDateString("es-ES"),
        new Date(a.date).toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      ]),
    ];

    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "citas.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>

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
        <Button onClick={exportToCSV} className="w-full md:w-auto">
          Exportar CSV
        </Button>
      </div>

      {filteredAppointments.length === 0 ? (
        <p className="text-gray-500">No hay citas con ese filtro.</p>
      ) : (
        <ul className="space-y-4">
          {filteredAppointments.map((appt) => (
            <li
              key={appt.id}
              className="border p-4 rounded-md shadow-sm bg-white flex justify-between items-center"
            >
              <div>
                <p className="text-gray-800 font-medium">
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
                <p className="text-gray-600 text-sm">
                  Usuario: {appt.user.username} ({appt.user.email})
                </p>
              </div>
              <Button
                variant="destructive"
                disabled={isPending}
                className="cursor-pointer"
                onClick={() => handleCancel(appt.id)}
              >
                Cancelar
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
