import { personalInfo, socialLinks } from "@/data/portfolio";
import { Mail, ArrowUp } from "lucide-react";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/ui/BrandIcons";

const iconMap: Record<string, React.ReactNode> = {
  github: <GitHubIcon />,
  linkedin: <LinkedInIcon />,
  twitter: <XIcon />,
  mail: <Mail className="h-4 w-4" />,
};

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-12">
        <div className="flex items-center gap-4">
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

        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </p>

        <a
          href="#hero"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-4 w-4" />
        </a>
      </div>
    </footer>
  );
}
