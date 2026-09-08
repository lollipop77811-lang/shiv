import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[60vh] items-center justify-center py-20">
      <div className="max-w-lg rounded-[2rem] bg-white p-10 text-center shadow-lift sm:p-14">
        <p className="text-7xl font-extrabold tracking-tight text-gradient">404</p>
        <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-brand-900 sm:text-3xl">
          This page could not be found
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-500 sm:text-base">
          The link may be outdated or the page may have moved. Let&apos;s get you
          back to clear vision.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-bold text-brand-900 shadow-soft transition hover:bg-gold-400"
          >
            Back to Home
          </Link>
          <Link
            href="/treatments"
            className="inline-flex items-center gap-2 rounded-full border border-jade-200 bg-white px-7 py-3.5 text-sm font-bold text-jade-700 transition hover:bg-jade-50"
          >
            Explore Treatments
          </Link>
        </div>
      </div>
    </div>
  );
}
