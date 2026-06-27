import { describe, it, expect } from "vitest";
import {
  personalInfo,
  projects,
  skillCategories,
  experience,
  socialLinks,
} from "@/data/portfolio";

describe("PersonalInfo", () => {
  it("has all required fields", () => {
    expect(personalInfo.name).toBeTruthy();
    expect(personalInfo.role).toBeTruthy();
    expect(personalInfo.tagline).toBeTruthy();
    expect(personalInfo.bio).toBeTruthy();
    expect(personalInfo.email).toBeTruthy();
    expect(personalInfo.avatar).toBeTruthy();
  });

  it("validates name is a non-empty string", () => {
    expect(typeof personalInfo.name).toBe("string");
    expect(personalInfo.name.length).toBeGreaterThan(0);
  });

  it("validates email format", () => {
    expect(personalInfo.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it("has at least one role", () => {
    expect(personalInfo.roles.length).toBeGreaterThanOrEqual(1);
  });
});

describe("Projects", () => {
  it("has at least one project", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it("each project has required fields", () => {
    for (const project of projects) {
      expect(project.id).toBeTruthy();
      expect(project.title).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(project.tech.length).toBeGreaterThan(0);
      expect(typeof project.id).toBe("string");
      expect(typeof project.title).toBe("string");
    }
  });

  it("has unique project IDs", () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("each project has at least one tech", () => {
    for (const project of projects) {
      expect(project.tech.length).toBeGreaterThanOrEqual(1);
    }
  });
});

describe("SkillCategories", () => {
  it("has at least one category", () => {
    expect(skillCategories.length).toBeGreaterThan(0);
  });

  it("each category has title and skills", () => {
    for (const category of skillCategories) {
      expect(category.title).toBeTruthy();
      expect(category.skills.length).toBeGreaterThan(0);
    }
  });
});

describe("Experience", () => {
  it("has at least one experience entry", () => {
    expect(experience.length).toBeGreaterThan(0);
  });

  it("each entry has required fields", () => {
    for (const exp of experience) {
      expect(exp.id).toBeTruthy();
      expect(exp.company).toBeTruthy();
      expect(exp.role).toBeTruthy();
      expect(exp.period).toBeTruthy();
      expect(exp.highlights.length).toBeGreaterThan(0);
    }
  });

  it("has unique experience IDs", () => {
    const ids = experience.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("SocialLinks", () => {
  it("has at least one social link", () => {
    expect(socialLinks.length).toBeGreaterThan(0);
  });

  it("each link has name, url, and icon", () => {
    for (const link of socialLinks) {
      expect(link.name).toBeTruthy();
      expect(link.url).toBeTruthy();
      expect(link.icon).toBeTruthy();
    }
  });

  it("all URLs start with http or mailto", () => {
    for (const link of socialLinks) {
      expect(link.url.startsWith("http") || link.url.startsWith("mailto")).toBe(
        true
      );
    }
  });
});
