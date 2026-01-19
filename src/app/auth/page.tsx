"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Zap, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { BRANDING } from "@/config";

export default function AuthPage() {
    const router = useRouter();
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");

    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: { full_name: fullName },
                        emailRedirectTo: `${window.location.origin}/dashboard`,
                    },
                });
                if (error) throw error;
                toast.success("Security check! Verify your email to continue.");
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                router.push("/dashboard");
                router.refresh();
            }
        } catch (error: any) {
            toast.error(error.message || "Access denied");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/dashboard`,
            },
        });
        if (error) toast.error(error.message);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-6">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[100%] h-[100%] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[100%] h-[100%] bg-accent/5 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in duration-500">
                {/* Logo */}
                <Link href="/" className="flex items-center justify-center gap-3 mb-12">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-primary/80 to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                        <Zap className="w-5 h-5 text-primary-foreground fill-current" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-foreground">
                        {BRANDING.logo.text.slice(0, -BRANDING.logo.highlight.length)}
                        <span className="text-primary">{BRANDING.logo.highlight}</span>
                    </span>
                </Link>

                {/* Auth Card */}
                <div className="bg-card/40 backdrop-blur-xl border border-border/40 rounded-3xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-black tracking-tight text-foreground mb-2">
                            {isSignUp ? "Initialize Account" : "Access Terminal"}
                        </h1>
                        <p className="text-sm font-medium text-muted-foreground">
                            {isSignUp ? "Join the prompt engineering elite." : "Authenticate to resume architecting."}
                        </p>
                    </div>

                    {/* Google Sign In */}
                    <Button
                        variant="outline"
                        className="w-full h-12 rounded-2xl mb-8 border-border/50 hover:bg-muted/50 font-bold"
                        onClick={handleGoogleSignIn}
                    >
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="currentColor"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        Continue with Google
                    </Button>

                    <div className="relative mb-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border/30" />
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground">
                            <span className="bg-card px-3 py-1 rounded-full border border-border/30">Protocol Entry</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {isSignUp && (
                            <div className="space-y-2">
                                <Label htmlFor="fullName" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</Label>
                                <Input
                                    id="fullName"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="John Doe"
                                    required={isSignUp}
                                    className="h-12 rounded-2xl bg-muted/30 border-border/30"
                                />
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Identity (Email)</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                className="h-12 rounded-2xl bg-muted/30 border-border/30"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Secret Key (Password)</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                minLength={6}
                                className="h-12 rounded-2xl bg-muted/30 border-border/30"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black tracking-tight shadow-xl shadow-primary/20 transition-all active:scale-95 mt-4"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isSignUp ? "INITIALIZE" : "AUTHENTICATE")}
                        </Button>
                    </form>

                    <div className="mt-8 text-center pt-6 border-t border-border/20">
                        <p className="text-xs font-bold text-muted-foreground tracking-tight">
                            {isSignUp ? "ALREADY AUTHENTICATED?" : "NO PROTOCOL ACCESS?"}{" "}
                            <button
                                onClick={() => setIsSignUp(!isSignUp)}
                                className="text-primary hover:underline ml-1"
                            >
                                {isSignUp ? "SIGN IN" : "GENERATE IDENTITY"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
