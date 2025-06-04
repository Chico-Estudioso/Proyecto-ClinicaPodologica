"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function ReservarCitaPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [availableHours, setAvailableHours] = useState<string[]>([]);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    if (selectedDate) {
      fetch(`/api/appointments/available?date=${selectedDate.toISOString()}`)
        .then((res) => res.json())
        .then((data) => setAvailableHours(data.hours));
    }
  }, [selectedDate]);

  const reservar = async () => {
    if (!selectedDate || !selectedHour) return;

    const dateToSave = new Date(selectedDate);
    const [h, m] = selectedHour.split(":");
    dateToSave.setHours(Number(h), Number(m), 0, 0);

    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: dateToSave }),
    });

    if (res.ok) {
      toast.success("Cita reservada correctamente.");
      router.push("/dashboard");
    } else {
      const { message } = await res.json();
      toast.error(message || "Error al reservar cita.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Reservar Cita</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <Calendar
            selected={selectedDate}
            onSelect={setSelectedDate}
            locale={es}
            className="rounded-md border shadow"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            {selectedDate
              ? `Horas disponibles el ${selectedDate.toLocaleDateString(
                  "es-ES",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}`
              : "Selecciona un día"}
          </h2>

          {selectedDate && (
            <div className="grid grid-cols-3 gap-3">
              {availableHours.map((hour) => (
                <Button
                  key={hour}
                  variant={selectedHour === hour ? "default" : "outline"}
                  onClick={() => setSelectedHour(hour)}
                >
                  {hour}
                </Button>
              ))}
            </div>
          )}

          <div className="mt-6">
            <Button
              onClick={reservar}
              disabled={!selectedDate || !selectedHour}
            >
              Reservar cita
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
