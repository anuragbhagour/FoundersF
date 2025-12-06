import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_20px_hsl(43_88%_66%_/_0.25),0_4px_12px_hsl(208_55%_30%_/_0.15)] active:scale-[0.98]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-border bg-background hover:bg-secondary hover:text-secondary-foreground hover:border-saffron/30",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-soft",
        ghost: "hover:bg-secondary hover:text-secondary-foreground",
        link: "text-primary underline-offset-4 hover:underline hover:text-accent",
        hero: "bg-primary text-primary-foreground shadow-elevated hover:shadow-[0_0_24px_hsl(43_88%_66%_/_0.3),0_8px_24px_hsl(208_55%_30%_/_0.2)] hover:bg-primary/95 active:scale-[0.98]",
        glass: "bg-background/80 backdrop-blur-xl border border-border/50 text-foreground hover:bg-background/90 hover:border-saffron/20 shadow-card",
        subtle: "bg-secondary/50 text-secondary-foreground hover:bg-secondary",
        saffron: "bg-saffron text-saffron-foreground hover:bg-saffron/90 hover:shadow-[0_0_20px_hsl(43_88%_66%_/_0.4)] active:scale-[0.98]",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-[0_0_16px_hsl(36_71%_51%_/_0.3)] active:scale-[0.98]",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-lg px-4",
        lg: "h-14 rounded-2xl px-8 text-base",
        xl: "h-16 rounded-2xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
