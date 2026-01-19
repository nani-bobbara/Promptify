import Link from "next/link";
import { Zap, ArrowRight, Wand2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRANDING } from "@/config";

export function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px] animate-pulse delay-1000" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
                        <Sparkles className="w-3.5 h-3.5 text-primary" />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Next-Gen Protocol</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] md:leading-[0.85] animate-in fade-in slide-in-from-bottom-4 duration-700">
                        Architect Your <br />
                        <span className="text-primary italic">Imagination</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-4 delay-200 duration-700">
                        {BRANDING.description} Transform raw concepts into high-fidelity AI protocols for any engine.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 delay-500 duration-1000">
                        <Button size="lg" asChild className="rounded-2xl px-10 h-16 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-lg shadow-2xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 group">
                            <Link href="/auth">
                                <Zap className="w-5 h-5 mr-3 group-hover:animate-pulse fill-current" />
                                Start Creating
                            </Link>
                        </Button>
                        <Button size="lg" variant="ghost" asChild className="rounded-2xl px-10 h-16 text-lg font-bold hover:bg-muted/50">
                            <a href="#features" className="flex items-center">
                                Technical Overview
                                <ArrowRight className="w-5 h-5 ml-2 opacity-50" />
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
