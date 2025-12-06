import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Search, Filter, ExternalLink, Users, GraduationCap, MapPin, Wallet, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = [
  { id: "all", label: "All Schemes", icon: Building },
  { id: "women", label: "Women", icon: Users },
  { id: "student", label: "Students", icon: GraduationCap },
  { id: "category", label: "SC/ST/OBC", icon: Building },
  { id: "geography", label: "State-wise", icon: MapPin },
  { id: "funding", label: "Funding", icon: Wallet },
];

const schemes = [
  {
    id: 1,
    name: "Startup India Seed Fund",
    description: "Financial assistance for startups for proof of concept, prototype development, product trials, market entry, and commercialization.",
    category: ["funding"],
    eligibility: ["All categories", "Early stage startups"],
    fundingAmount: "Up to ₹50 Lakhs",
    link: "#",
  },
  {
    id: 2,
    name: "Stand Up India",
    description: "Bank loans between ₹10 lakh and ₹1 Crore for SC, ST, and women entrepreneurs for greenfield enterprises.",
    category: ["women", "category"],
    eligibility: ["SC/ST/Women", "Greenfield projects"],
    fundingAmount: "₹10 Lakh - ₹1 Crore",
    link: "#",
  },
  {
    id: 3,
    name: "PMEGP - Prime Minister's Employment Generation Programme",
    description: "Credit-linked subsidy scheme for generating employment opportunities through establishment of micro-enterprises.",
    category: ["funding", "category"],
    eligibility: ["All categories", "Manufacturing & Service sector"],
    fundingAmount: "Up to ₹25 Lakhs",
    link: "#",
  },
  {
    id: 4,
    name: "Women Entrepreneurship Platform (WEP)",
    description: "NITI Aayog initiative to support aspiring and existing women entrepreneurs through incubation, funding, and mentorship.",
    category: ["women"],
    eligibility: ["Women entrepreneurs only"],
    fundingAmount: "Varies",
    link: "#",
  },
  {
    id: 5,
    name: "TIDE 2.0 - Technology Incubation and Development of Entrepreneurs",
    description: "Support tech startups with grants for product development and commercialization.",
    category: ["student", "funding"],
    eligibility: ["Tech startups", "Incubated companies"],
    fundingAmount: "Up to ₹50 Lakhs",
    link: "#",
  },
  {
    id: 6,
    name: "Karnataka Startup Policy",
    description: "State-specific incentives including reimbursement of patent costs, quality certification, and marketing expenses.",
    category: ["geography"],
    eligibility: ["Karnataka registered startups"],
    fundingAmount: "Various incentives",
    link: "#",
  },
  {
    id: 7,
    name: "Maharashtra State Innovation Society",
    description: "Funding and mentorship support for innovative startups in Maharashtra.",
    category: ["geography"],
    eligibility: ["Maharashtra registered startups"],
    fundingAmount: "Up to ₹30 Lakhs",
    link: "#",
  },
  {
    id: 8,
    name: "Atal Innovation Mission - AIM",
    description: "Support for students and young entrepreneurs through Atal Tinkering Labs and Atal Incubation Centers.",
    category: ["student"],
    eligibility: ["Students", "Young entrepreneurs"],
    fundingAmount: "Up to ₹10 Crores for AIC",
    link: "#",
  },
];

const Schemes = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesCategory = activeCategory === "all" || scheme.category.includes(activeCategory);
    const matchesSearch = scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
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
                Government Schemes
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Discover funding opportunities and support programs tailored to your startup profile.
              </p>

              {/* Search */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search schemes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 rounded-2xl text-base"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters & Results */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 mb-8">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  onClick={() => setActiveCategory(category.id)}
                  className="rounded-full"
                >
                  <category.icon className="w-4 h-4 mr-2" />
                  {category.label}
                </Button>
              ))}
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSchemes.map((scheme, index) => (
                <motion.div
                  key={scheme.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-card transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
                      {scheme.name}
                    </h3>
                    <a
                      href={scheme.link}
                      className="p-2 rounded-lg hover:bg-secondary transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </a>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {scheme.description}
                  </p>

                  <div className="space-y-3">
                    <div>
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Funding</span>
                      <p className="text-sm font-semibold text-primary">{scheme.fundingAmount}</p>
                    </div>

                    <div>
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Eligibility</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {scheme.eligibility.map((item, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button variant="subtle" className="w-full mt-4 rounded-xl">
                    Learn More
                  </Button>
                </motion.div>
              ))}
            </div>

            {filteredSchemes.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No schemes found matching your criteria.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Schemes;
