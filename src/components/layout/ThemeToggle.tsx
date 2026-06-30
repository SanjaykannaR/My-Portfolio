"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

const emptySubscribe = () => () => {};

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center rounded-full",
        "text-muted hover:text-foreground transition-colors",
        "bg-card/50 hover:bg-card",
        "border border-border",
        className
      )}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={mounted ? { rotate: isDark ? 180 : 0 } : { rotate: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {mounted ? (
          isDark ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )
        ) : (
          <Sun className="h-4 w-4" />
        )}
      </motion.div>
    </button>
  );
}
