import { Wand2, Layers, Zap, Shield, Sparkles, Bot, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
    {
        icon: Bot,
        title: "Adaptive Intelligence",
        description: "Dynamic selection between multiple LLM engines to optimize for specific creative constraints.",
    },
    {
        icon: Layers,
        title: "Protocol Blueprints",
        description: "Engine-specific structures for Midjourney, DALL·E, Sora, and professional copy.",
    },
    {
        icon: Sparkles,
        title: "Aesthetic Signatures",
        description: "Layered visual styles including Cinematic, Cyberpunk, and 8K photorealism triggers.",
    },
    {
        icon: Cpu,
        title: "Neural Refinement",
        description: "Post-processing logic that scans for clarity, impact, and platform adherence.",
    },
    {
        icon: Zap,
        title: "Sub-Second Latency",
        description: "Optimized streaming response times for instant creative iteration.",
    },
    {
        icon: Shield,
        title: "Encryption Layer",
        description: "Bring your own identity via API keys with military-grade local storage.",
    },
];

export function FeaturesSection() {
    return (
        <section id="features" className="py-32 relative bg-muted/10">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 mb-6">
                        <Cpu className="w-3.5 h-3.5 text-primary" />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Core Capabilities</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none">
                        Engineered for <br /><span className="text-primary italic">Total Mastery</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
                        A comprehensive ecosystem designed to bridge the gap between human imagination and machine precision.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative p-10 rounded-[2rem] bg-card border border-border/40 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-4 tracking-tight uppercase tracking-[0.05em]">{feature.title}</h3>
                            <p className="text-sm font-bold text-muted-foreground leading-relaxed">{feature.description}</p>

                            {/* Decorative element */}
                            <div className="absolute top-6 right-6 w-12 h-12 bg-primary/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
