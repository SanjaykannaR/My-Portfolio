"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Code2, Server, Wrench, Globe } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Frontend: <Globe className="h-5 w-5" />,
  Backend: <Server className="h-5 w-5" />,
  "DevOps & Tools": <Wrench className="h-5 w-5" />,
  Languages: <Code2 className="h-5 w-5" />,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Skills() {
  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          label="Skills"
          title="Tech Stack"
          description="Technologies I work with on a daily basis"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-12 grid gap-6 sm:grid-cols-2"
        >
          {skillCategories.map((category) => (
            <motion.div key={category.title} variants={itemVariants}>
              <GlassCard className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-accent">
                    {iconMap[category.title]}
                  </span>
                  <h3 className="font-semibold">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-border bg-card/50 px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:border-accent/50 hover:text-accent"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
