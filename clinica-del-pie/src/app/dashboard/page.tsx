import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
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

  const mapped = appointments.map((appt) => ({
    id: appt.id,
    date: appt.date.toISOString(),
  }));

  return (
    <DashboardClient
      appointments={mapped}
      isAdmin={isAdmin}
      username={session.user.username}
      emailVerified={session.user.emailVerified ?? null}
    />
  );
}
