import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lightbulb, Target, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Lightbulb,
    title: "Validate Your Idea",
    description: "Get AI-powered feedback on your startup idea's viability, market potential, and competitive landscape.",
    href: "/ai-bot?mode=validate",
    color: "text-saffron",
    bgColor: "bg-saffron/10",
  },
  {
    icon: Target,
    title: "Categorize Your Idea",
    description: "Understand which industry sector and business category your startup falls into for better planning.",
    href: "/ai-bot?mode=categorize",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: BookOpen,
    title: "Knowledge Bank",
    description: "Access curated resources, guides, and policies to help you navigate the startup ecosystem in India.",
    href: "/knowledge",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-surface-subtle">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-medium text-accent mb-3 tracking-wider uppercase">Your Journey Starts Here</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">
            Everything You Need to Start
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From idea validation to funding discovery, we've got you covered at every step.
          </p>
          <div className="divider-indian mt-8 max-w-xs mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={feature.href}
                className="group block p-8 rounded-3xl bg-card border border-border hover:border-saffron/30 hover:shadow-[0_8px_32px_-8px_hsl(43_88%_66%_/_0.15)] transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-6`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {feature.description}
                </p>
                <div className="flex items-center gap-2 text-primary font-medium">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
