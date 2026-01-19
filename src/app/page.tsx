import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { TemplatesSection } from "@/components/landing/TemplatesSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { Zap } from "lucide-react";
import Link from "next/link";
import { BRANDING } from "@/config";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <div id="features">
        <FeaturesSection />
      </div>
      <div id="templates">
        <TemplatesSection />
      </div>
      <div id="pricing">
        <PricingSection />
      </div>

      {/* Footer */}
      <footer className="py-20 border-t border-border/30 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary via-primary/80 to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                <Zap className="w-4 h-4 text-primary-foreground fill-current" />
              </div>
              <span className="text-xl font-black tracking-tighter text-foreground">
                {BRANDING.logo.text.slice(0, -BRANDING.logo.highlight.length)}
                <span className="text-primary">{BRANDING.logo.highlight}</span>
              </span>
            </Link>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              © {new Date().getFullYear()} {BRANDING.company}. PROMPT ENGINEERING PROTOCOL v1.0
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
