"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useNav } from "@/lib/nav";

/** Navy hero band used at the top of every standalone page */
export function PageHero({
  label,
  title,
  description,
  children,
}: {
  label: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
}) {
  const nav = useNav();
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-jade-800 py-16 sm:py-20">
      <svg className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 opacity-15" viewBox="0 0 200 200" aria-hidden="true">
        {[30, 60, 90].map((r) => (
          <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="#FDE174" strokeWidth="0.8" strokeDasharray="2 8" />
        ))}
      </svg>
      <div className="container-x relative">
        <motion.nav
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-jade-300"
          aria-label="Breadcrumb"
        >
          <button onClick={() => nav.navigate({ view: "home" })} className="transition hover:text-white">
            Home
          </button>
          <span>/</span>
          <span className="text-white">{label}</span>
        </motion.nav>
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="max-w-2xl text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="mt-4 max-w-2xl text-lg leading-relaxed text-jade-100/85"
        >
          {description}
        </motion.p>
        {children ? (
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="mt-8"
          >
            {children}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
