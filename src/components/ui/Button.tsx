import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

function getButtonClasses(variant: ButtonProps["variant"] = "primary", size: ButtonProps["size"] = "md") {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer",
    {
      "bg-accent text-accent-foreground hover:opacity-90 active:scale-[0.97]":
        variant === "primary",
      "border border-border bg-transparent hover:bg-card/80 active:scale-[0.97]":
        variant === "secondary",
      "text-muted hover:text-foreground hover:bg-card/50": variant === "ghost",
    },
    {
      "h-9 px-4 text-sm": size === "sm",
      "h-11 px-6 text-sm": size === "md",
      "h-12 px-8 text-base": size === "lg",
    }
  );
}

interface ButtonOptions {
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
}

function buttonVariants({ variant, size, className }: ButtonOptions = {}) {
  return cn(getButtonClasses(variant, size), className);
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(getButtonClasses(variant, size), className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
