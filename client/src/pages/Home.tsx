import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { LogoCarousel } from "@/components/LogoCarousel";
import { ServicesSection } from "@/components/ServicesSection";
import { ComparisonTable } from "@/components/ComparisonTable";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { StatsSection } from "@/components/StatsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background" data-testid="home-page">
      <Navigation />
      <main>
        <HeroSection />
        <LogoCarousel />
        <ServicesSection />
        <ComparisonTable />
        <HowItWorksSection />
        <StatsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
