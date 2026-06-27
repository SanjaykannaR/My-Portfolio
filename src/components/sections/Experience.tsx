"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

function Timeline() {
  const progress = useScrollProgress();

  return (
    <div className="relative">
      <div className="absolute left-[19px] top-0 h-full w-px bg-border sm:left-1/2 sm:-translate-x-px">
        <motion.div
          className="w-full bg-accent"
          style={{ height: `${progress * 100}%` }}
        />
      </div>

      {experience.map((exp, index) => {
        const isEven = index % 2 === 0;
        return (
          <motion.div
            key={exp.id}
            variants={itemVariants}
            className={`relative flex w-full sm:w-1/2 ${
              isEven
                ? "sm:pr-12 sm:self-start"
                : "sm:pl-12 sm:self-end"
            }`}
          >
            <div className="flex w-full pl-14 sm:pl-0">
              <div
                className={`absolute left-[13px] top-2 z-10 h-3 w-3 rounded-full border-2 border-accent bg-background sm:left-auto ${
                  isEven
                    ? "sm:right-[-6.5px]"
                    : "sm:left-[-6.5px]"
                }`}
              />
              <GlassCard className={`mb-8 w-full overflow-hidden p-5 ${isEven ? "sm:text-right" : ""}`}>
                <span className="text-xs font-medium text-accent">{exp.period}</span>
                <h3 className="mt-1 truncate font-semibold">{exp.role}</h3>
                <p className="truncate text-sm text-muted">{exp.company}</p>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                  {exp.description}
                </p>
                <ul className={`mt-3 space-y-1.5 ${isEven ? "sm:flex sm:flex-col sm:items-end" : ""}`}>
                  {exp.highlights.map((h, i) => (
                    <li
                      key={i}
                      className={`flex items-start gap-2 text-sm text-muted ${
                        isEven ? "sm:flex-row-reverse" : ""
                      }`}
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span className="text-left">{h}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          label="Experience"
          title="Where I&apos;ve Worked"
          description="My professional journey and career highlights"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-12"
        >
          <Timeline />
        </motion.div>
      </div>
    </section>
  );
}
