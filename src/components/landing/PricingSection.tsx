import Link from "next/link";
import { Check, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PLANS } from "@/config";
import { cn } from "@/lib/utils";

export function PricingSection() {
    return (
        <section id="pricing" className="py-32 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 mb-6">
                        <Zap className="w-3.5 h-3.5 text-primary fill-current" />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Tier Selection</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none">
                        Flexible <span className="text-primary italic">Investment</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
                        Secure your creative edge with zero hidden costs. Scale your output as your imagination grows.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {PLANS.map((plan, index) => (
                        <div
                            key={plan.id}
                            className={cn(
                                "group relative p-10 rounded-[2.5rem] transition-all duration-500 hover:translate-y-[-8px]",
                                plan.popular
                                    ? "bg-card border-none shadow-[0_30px_60px_-15px_rgba(var(--primary-rgb),0.2)] ring-1 ring-primary/20 scale-105 z-20"
                                    : "bg-background/40 backdrop-blur-xl border border-border/50 hover:bg-card hover:border-border"
                            )}
                        >
                            {/* Popular badge */}
                            {plan.popular && (
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                                    <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/30">
                                        <Sparkles className="w-3.5 h-3.5" />
                                        Elite Selection
                                    </div>
                                </div>
                            )}

                            {/* Plan details */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-black tracking-tight text-foreground mb-3">{plan.name}</h3>
                                <p className="text-sm font-bold text-muted-foreground leading-relaxed h-10">{plan.description}</p>
                            </div>

                            {/* Price */}
                            <div className="mb-10 flex items-baseline gap-1">
                                <span className="text-6xl font-black tracking-tighter text-foreground">{plan.price}</span>
                                <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{plan.price !== "Free" && `/${plan.period}`}</span>
                            </div>

                            <Separator className="mb-8 bg-border/20" />

                            {/* Features */}
                            <ul className="space-y-5 mb-12">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center gap-4">
                                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <Check className="w-3 h-3 text-primary stroke-[4]" />
                                        </div>
                                        <span className="text-sm font-bold text-foreground/80 leading-tight">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <Button
                                size="lg"
                                className={cn(
                                    "w-full h-14 rounded-2xl font-black tracking-tight text-base transition-all active:scale-95",
                                    plan.popular
                                        ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/20"
                                        : "bg-muted/50 hover:bg-muted text-foreground border border-border/50"
                                )}
                                asChild
                            >
                                <Link href="/auth">{plan.cta}</Link>
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Blurred background accents */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-primary/5 rounded-full blur-[160px] pointer-events-none opacity-50" />
        </section>
    );
}

function Separator({ className }: { className?: string }) {
    return <div className={cn("h-[1px] w-full bg-border", className)} />;
}
