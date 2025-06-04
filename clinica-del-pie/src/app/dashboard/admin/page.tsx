// src/app/dashboard/admin/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import AdminCitasPage from "./admin-client";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") return redirect("/");

  const appointments = await db.appointment.findMany({
    orderBy: { date: "asc" },
    include: {
      user: {
        select: { username: true, email: true },
      },
    },
  });

  const mapped = appointments.map((appt) => ({
    id: appt.id,
    date: appt.date.toISOString(),
    attended: appt.attended,
    user: {
      username: appt.user.username,
      email: appt.user.email ?? "",
    },
  }));

  return <AdminCitasPage appointments={mapped} />;
}
