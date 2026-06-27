"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Code2, Rocket, Users, Zap } from "lucide-react";

const stats = [
  { icon: Code2, value: "5+", label: "Years Experience" },
  { icon: Rocket, value: "20+", label: "Projects Delivered" },
  { icon: Users, value: "15+", label: "Happy Clients" },
  { icon: Zap, value: "10+", label: "Technologies" },
];

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

export function About() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          label="About"
          title="Who I Am"
          description={personalInfo.bio}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={itemVariants}>
              <GlassCard className="flex flex-col items-center gap-3 p-6 text-center">
                <stat.icon className="h-6 w-6 text-accent" />
                <span className="text-3xl font-bold">{stat.value}</span>
                <span className="text-sm text-muted">{stat.label}</span>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
