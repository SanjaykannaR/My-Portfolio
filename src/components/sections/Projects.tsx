"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ExternalLink, X } from "lucide-react";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { useTilt } from "@/hooks/useTilt";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

function ProjectCard({ project, onSelect }: { project: typeof projects[number]; onSelect: () => void }) {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt(6);

  return (
    <motion.div
      variants={cardVariants}
      layoutId={project.id}
      onClick={onSelect}
      className="cursor-pointer"
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.15s ease-out" }}
    >
      <GlassCard className="group h-full overflow-hidden p-0">
        <div className="aspect-video w-full overflow-hidden bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="space-y-3 p-5">
          <h3 className="font-semibold group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 3).map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
            {project.tech.length > 3 && (
              <Badge>+{project.tech.length - 3}</Badge>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[number] | null>(null);

  const close = useCallback(() => setSelectedProject(null), []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedProject]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [close]);

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          label="Projects"
          title="Featured Work"
          description="Projects I've built and contributed to"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onSelect={() => setSelectedProject(project)} />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-6"
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-muted transition-colors hover:text-foreground backdrop-blur-sm"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              layoutId={selectedProject.id}
              onClick={(e) => e.stopPropagation()}
              className="glass max-w-lg w-full rounded-2xl overflow-hidden"
            >
              <div className="aspect-video w-full overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              <div className="space-y-4 p-6">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold">{selectedProject.title}</h3>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-muted hover:text-foreground transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-sm leading-relaxed text-muted">
                  {selectedProject.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tech.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
                <div className="flex gap-3 pt-2">
                  {selectedProject.liveUrl && (
                    <Button variant="primary" size="sm" asChild>
                      <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                        Live Demo <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                  )}
                  {selectedProject.githubUrl && (
                    <Button variant="secondary" size="sm" asChild>
                      <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                        Source <GitHubIcon />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
