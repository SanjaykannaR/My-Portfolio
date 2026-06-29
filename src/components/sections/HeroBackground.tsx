"use client";

import { useMemo } from "react";
import Particles from "@tsparticles/react";
import { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { useTheme } from "@/components/providers/ThemeProvider";

const initParticles = async (engine: Engine) => {
  await loadSlim(engine);
};

export function HeroBackground() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const options: ISourceOptions = useMemo(() => ({
    fullScreen: false,
    fpsLimit: 60,
    particles: {
      number: {
        value: 60,
        density: { enable: true },
      },
      color: {
        value: isLight ? "#047857" : "#10b981",
      },
      opacity: {
        value: isLight ? 0.8 : 0.5,
        random: { enable: true, minimumValue: isLight ? 0.5 : 0.2 },
      },
      size: {
        value: isLight ? { min: 5, max: 9 } : { min: 4, max: 8 },
      },
      rotate: {
        value: {
          min: 0,
          max: 360,
        },
        direction: "random",
        animation: {
          enable: true,
          speed: 2,
        },
      },
      links: {
        enable: true,
        distance: 180,
        color: isLight ? "#047857" : "#10b981",
        opacity: isLight ? 0.2 : 0.1,
        width: 1.5,
      },
      move: {
        enable: true,
        speed: 0.4,
        direction: "none",
        random: true,
        straight: false,
        outModes: "out",
      },
      shape: {
        type: ["triangle", "circle", "square"],
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
      },
      modes: {
        grab: {
          distance: 200,
          links: {
            opacity: 0.12,
          },
        },
      },
    },
    detectRetina: true,
  }), [isLight]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <ParticlesProvider init={initParticles}>
        <Particles
          id="hero-particles"
          className="absolute inset-0"
          options={options}
        />
      </ParticlesProvider>
    </div>
  );
}
