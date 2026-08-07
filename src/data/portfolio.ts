export interface PersonalInfo {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  email: string;
  location: string;
  resumeUrl?: string;
  avatar: string;
  roles: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  logo?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export const personalInfo: PersonalInfo = {
  name: "Sanjay Kanna",
  role: "Full-Stack Developer",
  tagline: "Crafting Seamless Full-Stack Solutions with Pixel-Perfect Design.",
  bio: "I am a full-stack web developer and UI/UX designer with a background in Computer Applications, specializing in building type-safe, highly scalable applications using the MERN stack, Next.js, and TypeScript. My dual expertise allows me to bridge the gap between complex backend architectures and elegant, user-centric interfaces, always designing with mobile responsiveness and a strict three-steps-or-fewer user flow in mind to minimize cognitive load. Driven by a philosophy that applications should be powerful under the hood but effortlessly simple to navigate, I thrive on transforming abstract client ideas into clean, functional digital solutions while collaborating effectively in fast-paced team environments.",
  email: "sanjaykanna75@gmail.com",
  location: "Puducherry, India",
  resumeUrl: "#",
  avatar: "/myimage.jpg",
  roles: [
    "Full-Stack Developer",
    "UI/UX Enthusiast",
    "Problem Solver",
  ],
};

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Vantaigo Software Solutions",
    description:
      "Vantaigo serves as both a consultancy brand and a high-performance web platform built to manage digital products, establish cohesive brand guidelines, and streamline client project architectures from concept to deployment.",
    tech: ["React", "JavaScript", "Node.js", "MongoDB", "Express.js"],
    image: "/Vantaigo.png",
    liveUrl: "https://vantaigo-portfolio.vercel.app/",
    githubUrl: "https://github.com/SanjaykannaR/vantaigo-portfolio.",
  },
  {
    id: "project-2",
    title: "Arise",
    description:
      "A high-performance, mobile-first web application designed to gamify personal health, featuring a dynamic workout engine, automated nutrition estimations, and a persistent streak system to optimize mindset and wellness.",
    tech: ["Next.js", "TypeScript", "Supabase", "TanStack Query", "Tailwind CSS"],
    image: "/Arise.jpeg",
    liveUrl: "https://arise-getfit.vercel.app/",
    githubUrl: "https://github.com/SanjaykannaR/arise-frontend", 
  },
  {
    id: "project-3",
    title: "Puducherry RTO Redesign",
    description:
      "A comprehensive digital transformation of the Office of the Transport Commissioner, Puducherry — citizen portal for vehicle registration, driving licenses, and challan lookup, with an AI-proctored learner license exam (BlazeFace), a Gemini-powered multi-language chatbot, and a full admin panel. Three independently deployed services: Next.js 16 frontend, Express + Prisma API, and a FastAPI AI service.",
    tech: ["Next.js", "TypeScript", "Express.js", "Prisma", "Python", "FastAPI", "TensorFlow Lite", "Google Gemini"],
    image: "/RTO.png",
    liveUrl: "https://puducherry-rto-redesign.vercel.app",
    githubUrl: "https://github.com/SanjaykannaR/Puducherry-RTO-Redesign",
  },
  {
    id: "project-4",
    title: "AutoMart",
    description:
      "Auto parts delivery platform — order any car/bike spare part, delivered in 30 minutes. A full-stack microservices monorepo with 8 backend services and a Next.js dark glassmorphism UI. Features fuzzy text search with Trie autocomplete, image search via CLIP embeddings, voice search via the Web Speech API, event-driven architecture over Redis pub/sub, and an MCP server for AI agent integration.",
    tech: ["Next.js", "React", "TypeScript", "Express.js", "Prisma", "Redis", "Docker", "Fuse.js"],
    image: "/Automart.png",
    liveUrl: "https://auto-mart-web.vercel.app/",
    githubUrl: "https://github.com/SanjaykannaR/AutoMart",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "JavaScript (ES6+)", "PostgreSQL", "MongoDB","RESTful APIs", "Redis"],
  },
  {
    title: "Design & Tools",
    skills: ["Docker", "Figma","UI/UX Architecture", "Git", "CI/CD"],
  },
  {
    title: "Languages",
    skills: ["TypeScript", "JavaScript (ES6+)", "Bash"],
  },
];

export const experience: Experience[] = [
  {
    id: "exp-1",
    company: "Agilemania Pvt Ltd",
    role: "Senior Graphic Designer",
    period: "Jan 2021 - Present",
    description:
      "Spearheaded corporate branding, high-fidelity UI layouts, and cross-functional designs that enhanced user engagement and brand consistency.",
    highlights: [
      "Spearheaded visual branding, marketing assets, and corporate design initiatives aligned with company objectives.",
      "Collaborated across teams to translate complex business requirements into high-fidelity UI layouts and engaging visual content.",
      "Utilized design hierarchy and UI/UX principles to enhance user engagement and maintain brand consistency.",
    ],
  },
  // {
  //   id: "exp-2",
  //   company: "StartupX",
  //   role: "Full-Stack Developer",
  //   period: "Mar 2022 - Dec 2023",
  //   description:
  //     "Built and maintained production applications serving 100k+ users.",
  //   highlights: [
  //     "Developed real-time collaboration features used by 50k+ users",
  //     "Optimized database queries reducing response time by 70%",
  //     "Implemented automated testing achieving 90% coverage",
  //   ],
  // },
  // {
  //   id: "exp-3",
  //   company: "Web Agency",
  //   role: "Frontend Developer",
  //   period: "Jun 2020 - Feb 2022",
  //   description:
  //     "Created responsive web applications for diverse client portfolio.",
  //   highlights: [
  //     "Delivered 20+ client projects on time and within budget",
  //     "Built reusable component library used across projects",
  //     "Improved page load performance by 45%",
  //   ],
  // },
];

export const socialLinks: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/SanjaykannaR", icon: "github" },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/sanjay-kanna",
    icon: "linkedin",
  },
  { name: "X", url: "https://x.com/SKSanjaykanna", icon: "twitter" },
  { name: "Email", url: "mailto:sanjaykanna75@gmail.com", icon: "mail" },
];
