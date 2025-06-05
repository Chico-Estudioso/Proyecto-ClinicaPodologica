"use client";

import { useState, useTransition, useEffect } from "react";
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

type User = {
  id: string;
  username: string;
  email: string | null;
  createdAt: string;
  banned: boolean;
};

export default function AdminCitasPage({ appointments: initial }: Props) {
  const [appointments, setAppointments] = useState(initial);
  const [isPending, startTransition] = useTransition();
  const [filterDate, setFilterDate] = useState<string>("");
  const [filterUser, setFilterUser] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);

  // NUEVO: campos para crear cita
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [newDate, setNewDate] = useState<string>("");

  const now = new Date();

  useEffect(() => {
    fetch("/api/users/all")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  const handleCreateAppointment = async () => {
    if (!selectedUserId || !newDate) {
      toast.error("Selecciona usuario y fecha");
      return;
    }

    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: selectedUserId, date: newDate }),
    });

    if (res.ok) {
      const data = await res.json();
      const user = users.find((u) => u.id === selectedUserId);
      toast.success("Cita creada correctamente");
      setAppointments((prev) => [
        ...prev,
        {
          id: data.id,
          date: data.date,
          attended: null,
          user: {
            username: user?.username || "Desconocido",
            email: user?.email || "",
          },
        },
      ]);
      setSelectedUserId("");
      setNewDate("");
    } else {
      const err = await res.json();
      toast.error(err.message || "Error al crear cita");
    }
  };

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
      startTransition(() =>
        setAppointments((prev) =>
          prev.map((a) => (a.id === id ? { ...a, attended } : a))
        )
      );
    } else {
      toast.error("Error al guardar la asistencia.");
    }
  };

  const handleDeleteUser = async (userId: string, userEmail: string | null) => {
    const confirmDelete = confirm(
      "¿Estás seguro de eliminar este usuario? Se eliminarán también todas sus citas."
    );
    if (!confirmDelete) return;

    const res = await fetch(`/api/users/${userId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("Usuario eliminado.");
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      setAppointments((prev) => prev.filter((a) => a.user.email !== userEmail));
    } else {
      toast.error("Error al eliminar el usuario.");
    }
  };

  const handleToggleBan = async (user: User) => {
    const res = await fetch(`/api/users/${user.id}/ban`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ banned: !user.banned }),
    });

    if (res.ok) {
      toast.success(
        `Usuario ${user.banned ? "desvetado" : "vetado"} correctamente.`
      );
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, banned: !user.banned } : u))
      );
    } else {
      toast.error("Error al actualizar el estado de veto.");
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
    <div className="container mx-auto py-12 space-y-16">
      <section>
        <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>

        {/* NUEVO BLOQUE: Crear cita para usuario */}
        <div className="mb-12 space-y-4 border p-4 rounded-md shadow">
          <h2 className="text-xl font-semibold">Crear nueva cita</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <select
              className="border rounded px-4 py-2"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              <option value="">Seleccionar usuario</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.username} ({u.email})
                </option>
              ))}
            </select>

            <input
              type="datetime-local"
              className="border rounded px-4 py-2"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />

            <Button onClick={handleCreateAppointment}>Crear cita</Button>
          </div>
        </div>

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
      </section>

      {/* Resto de la sección de usuarios: SIN CAMBIOS */}
    </div>
  );
}
