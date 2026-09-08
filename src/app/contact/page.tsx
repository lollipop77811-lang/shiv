import type { Metadata } from "next";
import { ContactView } from "@/components/views/contact-view";

export const metadata: Metadata = {
  title: "Location & Contact — Shiv Netralay",
  description:
    "Visit Shiv Netralay — clinic address, opening hours, phone, email and directions. Eye emergencies attended on call.",
};

export default function ContactPage() {
  return <ContactView />;
}
