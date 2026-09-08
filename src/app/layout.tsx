import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shiv Netralay — Advanced Eye Care | Ophthalmology Clinic",
  description:
    "Comprehensive ophthalmology care with experienced specialists, modern diagnostic technology and patient-focused treatment. Cataract, LASIK, Glaucoma, Retina, Cornea & Pediatric eye care.",
  keywords: [
    "Shiv Netralay",
    "eye hospital",
    "ophthalmology",
    "cataract surgery",
    "LASIK",
    "glaucoma treatment",
    "retina specialist",
    "eye checkup",
  ],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Shiv Netralay — Advanced Eye Care",
    description: "Advanced Eye Care for a Clearer Tomorrow",
    siteName: "Shiv Netralay",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${jakarta.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
