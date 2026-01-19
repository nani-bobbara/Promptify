"use client";

import Link from "next/link";
import { Zap, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BRANDING } from "@/config";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/30">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary via-primary/80 to-accent flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                            <Zap className="w-4 h-4 text-primary-foreground fill-current" />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-foreground">
                            {BRANDING.logo.text.slice(0, -BRANDING.logo.highlight.length)}
                            <span className="text-primary">{BRANDING.logo.highlight}</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">
                            Features
                        </a>
                        <a href="#templates" className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">
                            Templates
                        </a>
                        <a href="#pricing" className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">
                            Pricing
                        </a>
                    </div>

                    {/* Desktop CTA & Theme */}
                    <div className="hidden md:flex items-center gap-4">
                        <ThemeToggle />
                        <div className="h-6 w-[1px] bg-border/40 mx-1" />
                        <Button variant="ghost" asChild className="font-bold">
                            <Link href="/auth">Sign In</Link>
                        </Button>
                        <Button asChild className="rounded-xl px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/10">
                            <Link href="/auth">Get Started</Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Button & Theme */}
                    <div className="flex items-center gap-2 md:hidden">
                        <ThemeToggle />
                        <button
                            className="text-foreground p-2"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden mt-4 pb-4 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                        <a href="#features" className="block text-sm font-bold text-muted-foreground hover:text-foreground uppercase tracking-widest" onClick={() => setIsOpen(false)}>
                            Features
                        </a>
                        <a href="#templates" className="block text-sm font-bold text-muted-foreground hover:text-foreground uppercase tracking-widest" onClick={() => setIsOpen(false)}>
                            Templates
                        </a>
                        <a href="#pricing" className="block text-sm font-bold text-muted-foreground hover:text-foreground uppercase tracking-widest" onClick={() => setIsOpen(false)}>
                            Pricing
                        </a>
                        <div className="flex flex-col gap-3 pt-6 border-t border-border/40">
                            <Button variant="ghost" asChild className="w-full font-bold">
                                <Link href="/auth">Sign In</Link>
                            </Button>
                            <Button asChild className="w-full rounded-xl bg-primary font-bold">
                                <Link href="/auth">Get Started</Link>
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
