import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TREATMENTS } from "@/lib/site-data";
import { TreatmentDetailView } from "@/components/views/treatment-detail-view";

interface PageProps {
  params: Promise<{ treatmentId: string }>;
}

export function generateStaticParams() {
  return TREATMENTS.map((t) => ({ treatmentId: t.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { treatmentId } = await params;
  const treatment = TREATMENTS.find((t) => t.id === treatmentId);
  if (!treatment) return { title: "Treatment Not Found — Shiv Netralay" };
  return {
    title: `${treatment.name} — Shiv Netralay`,
    description: treatment.cardDescription,
  };
}

export default async function TreatmentDetailPage({ params }: PageProps) {
  const { treatmentId } = await params;
  const treatment = TREATMENTS.find((t) => t.id === treatmentId);
  if (!treatment) notFound();
  return <TreatmentDetailView id={treatmentId} />;
}
