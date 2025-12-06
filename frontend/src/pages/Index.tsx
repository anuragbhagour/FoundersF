import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { SchemesPreview } from "@/components/home/SchemesPreview";
import { KnowledgeBankPreview } from "@/components/home/KnowledgeBankPreview";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <FeaturesSection />
        <SchemesPreview />
        <KnowledgeBankPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
