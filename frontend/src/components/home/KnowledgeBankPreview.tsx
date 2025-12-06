import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Video, Book, HelpCircle } from "lucide-react";

const resources = [
  { icon: FileText, title: "Startup Guides", count: "50+" },
  { icon: Video, title: "Video Tutorials", count: "30+" },
  { icon: Book, title: "Policy Documents", count: "100+" },
  { icon: HelpCircle, title: "FAQs", count: "200+" },
];

export function KnowledgeBankPreview() {
  return (
    <section className="py-24 bg-surface-subtle relative overflow-hidden">
      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
          <pattern id="geo-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M20 0L40 20L20 40L0 20Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#geo-pattern)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <span className="text-accent font-semibold text-sm tracking-wider uppercase mb-4 block">
            Resources
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-display">
            Knowledge Bank
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Access our comprehensive library of guides, policies, and learning resources to help you build your startup.
          </p>
          <div className="divider-indian mb-12 max-w-xs mx-auto" />

          {/* Resource Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-saffron/30 hover:shadow-[0_4px_16px_-4px_hsl(43_88%_66%_/_0.15)] transition-all duration-300"
              >
                <resource.icon className="w-8 h-8 text-accent mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground">{resource.count}</div>
                <div className="text-sm text-muted-foreground">{resource.title}</div>
              </motion.div>
            ))}
          </div>

          <Button variant="hero" size="lg" asChild>
            <Link to="/knowledge" className="flex items-center gap-2">
              Try Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
