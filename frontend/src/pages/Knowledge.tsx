import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Search, FileText, Video, Book, HelpCircle, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = [
  { id: "all", label: "All Resources" },
  { id: "guides", label: "Startup Guides" },
  { id: "policies", label: "Policies" },
  { id: "tutorials", label: "Tutorials" },
  { id: "faqs", label: "FAQs" },
];

const resources = [
  {
    id: 1,
    title: "How to Register Your Startup in India",
    description: "A comprehensive guide covering company registration, GST, trademark filing, and compliance requirements.",
    category: "guides",
    type: "article",
    readTime: "12 min read",
    icon: FileText,
  },
  {
    id: 2,
    title: "Understanding Startup India Recognition",
    description: "Everything you need to know about getting DPIIT recognition and its benefits for your startup.",
    category: "guides",
    type: "article",
    readTime: "8 min read",
    icon: FileText,
  },
  {
    id: 3,
    title: "Startup India Policy 2024",
    description: "Official policy document outlining government initiatives, tax benefits, and support programs.",
    category: "policies",
    type: "document",
    readTime: "25 min read",
    icon: Book,
  },
  {
    id: 4,
    title: "State Startup Policies Comparison",
    description: "Compare startup policies across different Indian states and find the best ecosystem for your venture.",
    category: "policies",
    type: "document",
    readTime: "15 min read",
    icon: Book,
  },
  {
    id: 5,
    title: "How to Apply for Government Schemes",
    description: "Step-by-step video tutorial on applying for various government funding schemes.",
    category: "tutorials",
    type: "video",
    readTime: "18 min watch",
    icon: Video,
  },
  {
    id: 6,
    title: "Building Your First MVP",
    description: "Learn the essentials of building a minimum viable product with practical examples.",
    category: "tutorials",
    type: "video",
    readTime: "24 min watch",
    icon: Video,
  },
  {
    id: 7,
    title: "What documents do I need to register a startup?",
    description: "Complete list of documents required for startup registration including PAN, Aadhaar, address proof, and more.",
    category: "faqs",
    type: "faq",
    readTime: "3 min read",
    icon: HelpCircle,
  },
  {
    id: 8,
    title: "How long does DPIIT recognition take?",
    description: "Timeline and process overview for getting your startup recognized by DPIIT.",
    category: "faqs",
    type: "faq",
    readTime: "2 min read",
    icon: HelpCircle,
  },
  {
    id: 9,
    title: "Tax Benefits for Startups in India",
    description: "Comprehensive guide on tax exemptions, angel tax relief, and other fiscal benefits.",
    category: "guides",
    type: "article",
    readTime: "10 min read",
    icon: FileText,
  },
  {
    id: 10,
    title: "Pitch Deck Template & Guide",
    description: "Create a compelling pitch deck with our template and expert tips for fundraising.",
    category: "tutorials",
    type: "article",
    readTime: "15 min read",
    icon: FileText,
  },
  {
    id: 11,
    title: "Legal Compliance Checklist",
    description: "Essential legal requirements every startup must comply with in India.",
    category: "policies",
    type: "document",
    readTime: "8 min read",
    icon: Book,
  },
  {
    id: 12,
    title: "Can foreign nationals start a company in India?",
    description: "Guidelines and requirements for foreign entrepreneurs looking to establish startups in India.",
    category: "faqs",
    type: "faq",
    readTime: "4 min read",
    icon: HelpCircle,
  },
];

const Knowledge = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = resources.filter((resource) => {
    const matchesCategory = activeCategory === "all" || resource.category === activeCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="py-16 bg-surface-subtle">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Knowledge Bank
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Your comprehensive resource library for building and scaling your startup in India.
              </p>

              {/* Search */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search guides, policies, FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 rounded-2xl text-base"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource, index) => (
                <motion.article
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-card transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <resource.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-medium text-primary uppercase tracking-wide">
                        {resource.category}
                      </span>
                      <h3 className="font-semibold text-foreground mt-1 group-hover:text-primary transition-colors line-clamp-2">
                        {resource.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {resource.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {resource.readTime}
                    </span>
                    <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.article>
              ))}
            </div>

            {filteredResources.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No resources found matching your search.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Knowledge;
