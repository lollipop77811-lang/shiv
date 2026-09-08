"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BadgeCheck, Quote, Star } from "lucide-react";
import { BLOG_POSTS, TESTIMONIALS } from "@/lib/site-data";
import { useNav } from "@/lib/nav";
import {
  Reveal,
  SectionHeading,
  StaggerGrid,
  StaggerItem,
} from "@/components/site/reveal";

function Stars({ n }: { n: number }) {
  return (
    <span className="inline-flex gap-0.5 text-amber-400" aria-label={`${n} star rating`}>
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current" />
      ))}
    </span>
  );
}

/** Premium testimonial slider with Google rating card */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = useCallback((next: number, direction: number) => {
    setDir(direction);
    setIndex((next + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    const t = setInterval(() => go(index + 1, 1), 6500);
    return () => clearInterval(t);
  }, [index, go]);

  const item = TESTIMONIALS[index];

  return (
    <section className="bg-mist py-16 sm:py-20 lg:py-24" aria-labelledby="testimonials-heading">
      <div className="container-x">
        <SectionHeading
          eyebrow="Patient Voices"
          title={
            <span id="testimonials-heading">
              What Our <span className="text-gradient">Patients Say</span>
            </span>
          }
          description="Sample patient stories for the prototype — real reviews will replace these once approved by the clinic."
        />

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* slider */}
          <Reveal className="relative">
            <div className="relative h-full overflow-hidden rounded-[2rem] border border-border/70 bg-white p-8 shadow-soft sm:p-12">
              <Quote className="absolute right-8 top-8 h-16 w-16 text-orchid-100" aria-hidden="true" />
              <AnimatePresence mode="wait" custom={dir}>
                <motion.figure
                  key={index}
                  custom={dir}
                  initial={{ opacity: 0, x: 34 * dir }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -34 * dir }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex h-full flex-col"
                >
                  <Stars n={item.rating} />
                  <blockquote className="mt-5 flex-1 text-xl font-semibold leading-relaxed text-plum-800 sm:text-2xl">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-7 flex items-center gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-orchid-500 to-plum-800 text-base font-extrabold text-white">
                      {item.name.split(" ").map((w) => w[0]).join("")}
                    </span>
                    <span>
                      <span className="block text-sm font-extrabold text-plum-900">{item.name}</span>
                      <span className="block text-xs font-semibold text-orchid-700">{item.treatment}</span>
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            {/* controls */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i, i > index ? 1 : -1)}
                    className={`h-2 rounded-full transition-all ${
                      i === index ? "w-8 bg-orchid-600" : "w-2 bg-orchid-200 hover:bg-orchid-300"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2.5">
                <button
                  onClick={() => go(index - 1, -1)}
                  className="grid h-11 w-11 place-items-center rounded-full border border-border bg-white text-plum-900 shadow-soft transition hover:bg-orchid-50"
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft className="h-4.5 w-4.5" />
                </button>
                <button
                  onClick={() => go(index + 1, 1)}
                  className="grid h-11 w-11 place-items-center rounded-full bg-plum-900 text-white shadow-soft transition hover:bg-plum-800"
                  aria-label="Next testimonial"
                >
                  <ArrowRight className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>
          </Reveal>

          {/* google rating card */}
          <Reveal delay={0.1} className="h-full">
            <div className="flex h-full flex-col justify-between rounded-[2rem] bg-gradient-to-br from-plum-900 to-orchid-800 p-8 text-white shadow-lift sm:p-10">
              <div>
                <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.18em] text-orchid-300">
                  Google Rating
                </p>
                <div className="mt-5 flex items-end gap-3">
                  <span className="text-6xl font-extrabold tracking-tight">4.8</span>
                  <span className="pb-2 text-sm font-bold text-orchid-100/80">/ 5</span>
                </div>
                <div className="mt-3">
                  <Stars n={5} />
                </div>
                <p className="mt-4 text-sm font-semibold leading-relaxed text-orchid-100/85">
                  500+ patient reviews — reflecting the trust our patients place
                  in our care every day.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <BadgeCheck className="h-8 w-8 shrink-0 text-orchid-300" />
                <p className="text-xs font-semibold leading-relaxed text-orchid-100/80">
                  Placeholder figures for the prototype. Live rating will be
                  connected once the clinic confirms its listing details.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const BLOG_ICONS = {
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z",
  calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z",
  sparkles: "M12 3l1.9 5.7L19.6 10l-5.7 1.9L12 17.6l-1.9-5.7L4.4 10l5.7-1.3L12 3Z",
  shield: "M12 22s8-3.6 8-10V5l-8-3-8 3v7c0 6.4 8 10 8 10Z",
} as const;

export function Blog() {
  const nav = useNav();
  const gradients = [
    "from-orchid-500 to-plum-800",
    "from-orchid-400 to-plum-700",
    "from-orchid-300 to-orchid-600",
    "from-orchid-600 to-plum-900",
  ];

  return (
    <section id="resources" className="scroll-mt-24 py-16 sm:py-20 lg:py-24" aria-labelledby="blog-heading">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Eye Care Insights"
            title={
              <span id="blog-heading">
                Learn More About <span className="text-gradient">Your Eyes</span>
              </span>
            }
            description="Plain-language guides from our specialists — patient education that helps you make confident decisions."
          />
        </div>

        <StaggerGrid className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BLOG_POSTS.map((post, i) => (
            <StaggerItem key={post.title}>
              <button
                onClick={() => nav.goHomeSection("resources")}
                className="group flex h-full w-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-white text-left shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
                aria-label={`Read article: ${post.title}`}
              >
                <div className={`relative flex h-36 items-end bg-gradient-to-br ${gradients[i % gradients.length]} p-5`}>
                  <svg viewBox="0 0 24 24" className="absolute right-4 top-4 h-12 w-12 text-white/25" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d={BLOG_ICONS[post.icon as keyof typeof BLOG_ICONS] ?? BLOG_ICONS.eye} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="rounded-full bg-white/90 px-3 py-1 text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-plum-900 backdrop-blur">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-bold text-ink-400">{post.readTime}</p>
                  <h3 className="mt-2 text-base font-extrabold leading-snug tracking-tight text-plum-900 transition group-hover:text-orchid-700">
                    {post.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-500">
                    {post.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-orchid-700">
                    Read Article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </button>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
