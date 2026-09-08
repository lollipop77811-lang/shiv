"use client";

import { NavProvider } from "@/lib/nav";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { MobileActionBar } from "@/components/site/mobile-bar";

/** Shared site chrome — header, page slot, footer and mobile bar on every route */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <NavProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileActionBar />
      </div>
    </NavProvider>
  );
}
