"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { personalInfo, socialLinks } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Send, Mail, CheckCircle, AlertCircle } from "lucide-react";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/ui/BrandIcons";

const iconMap: Record<string, React.ReactNode> = {
  github: <GitHubIcon className="h-5 w-5" />,
  linkedin: <LinkedInIcon className="h-5 w-5" />,
  twitter: <XIcon className="h-5 w-5" />,
  mail: <Mail className="h-5 w-5" />,
};

const formVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      if (res.status === 501) {
        const data = await res.json();
        setStatus("error");
        setErrorMsg(`Send me an email directly at ${data.email}`);
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          label="Contact"
          title="Get In Touch"
          description="Have a project in mind? Let's build something great together."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6 lg:col-span-2"
          >
            <div className="space-y-2">
              <h3 className="font-semibold">Let&apos;s talk</h3>
              <p className="text-sm text-muted">
                I&apos;m always open to new opportunities and collaborations.
              </p>
            </div>

            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-3 text-sm text-muted hover:text-accent transition-colors"
            >
              <Mail className="h-4 w-4" />
              {personalInfo.email}
            </a>

            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
                  aria-label={link.name}
                >
                  {iconMap[link.icon]}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="lg:col-span-3"
          >
            <GlassCard className="space-y-5 p-6">
              <motion.div variants={fieldVariants}>
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm transition-colors placeholder:text-muted-foreground focus:border-accent focus:outline-none"
                  placeholder="Your name"
                />
              </motion.div>

              <motion.div variants={fieldVariants}>
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm transition-colors placeholder:text-muted-foreground focus:border-accent focus:outline-none"
                  placeholder="your@email.com"
                />
              </motion.div>

              <motion.div variants={fieldVariants}>
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="mt-1.5 w-full resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-sm transition-colors placeholder:text-muted-foreground focus:border-accent focus:outline-none"
                  placeholder="Tell me about your project..."
                />
              </motion.div>

              <motion.div variants={fieldVariants}>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={status === "loading"}
                  className="w-full"
                >
                  {status === "loading" ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <Send className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </motion.div>

              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-xl bg-accent/10 px-4 py-3 text-sm text-accent"
                >
                  <CheckCircle className="h-4 w-4" />
                  Message sent! I&apos;ll get back to you soon.
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-500"
                >
                  <AlertCircle className="h-4 w-4" />
                  {errorMsg}
                </motion.div>
              )}
            </GlassCard>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
