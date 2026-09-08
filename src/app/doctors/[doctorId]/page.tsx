import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DOCTORS } from "@/lib/site-data";
import { DoctorView } from "@/components/views/doctor-view";

interface PageProps {
  params: Promise<{ doctorId: string }>;
}

export function generateStaticParams() {
  return DOCTORS.map((d) => ({ doctorId: d.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { doctorId } = await params;
  const doctor = DOCTORS.find((d) => d.id === doctorId);
  if (!doctor) return { title: "Doctor Not Found — Shiv Netralay" };
  return {
    title: `${doctor.name} — ${doctor.role} | Shiv Netralay`,
    description: doctor.qualification,
  };
}

export default async function DoctorProfilePage({ params }: PageProps) {
  const { doctorId } = await params;
  const doctor = DOCTORS.find((d) => d.id === doctorId);
  if (!doctor) notFound();
  return <DoctorView id={doctorId} />;
}
