// src/app/dashboard/page.tsx
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import DashboardClient from "./dashboard-client";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/login");

  const isAdmin = session.user.role === "ADMIN";

  const appointments = await db.appointment.findMany({
    where: { userId: session.user.id },
    orderBy: { date: "asc" },
  });

  const transformedAppointments = appointments.map((a) => ({
    id: a.id,
    date: a.date.toISOString(),
  }));

  return (
    <DashboardClient
      appointments={transformedAppointments}
      isAdmin={isAdmin}
      username={session.user.username}
    />
  );
}
