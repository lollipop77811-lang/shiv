import type { Metadata } from "next";
import { AppointmentView } from "@/components/views/appointment-view";

export const metadata: Metadata = {
  title: "Book an Appointment — Shiv Netralay",
  description:
    "Schedule your eye care visit at Shiv Netralay — choose a department, doctor, date and time in five quick steps.",
};

interface PageProps {
  searchParams: Promise<{ department?: string; doctor?: string }>;
}

export default async function AppointmentPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const prefill = {
    department: typeof sp.department === "string" && sp.department ? sp.department : undefined,
    doctorId: typeof sp.doctor === "string" && sp.doctor ? sp.doctor : undefined,
  };
  // key remounts the flow when the query changes so the prefill is always applied
  const key = `${prefill.department ?? ""}|${prefill.doctorId ?? ""}`;
  return <AppointmentView key={key} prefill={prefill} />;
}
