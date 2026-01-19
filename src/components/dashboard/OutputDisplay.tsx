"use client";

import { Check, Copy, AlignLeft, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OutputDisplayProps {
    outputPrompt: string;
    copied: boolean;
    onCopy: () => void;
    viewMode: "text" | "json";
    setViewMode: (mode: "text" | "json") => void;
}

export function OutputDisplay({
    outputPrompt,
    copied,
    onCopy,
    viewMode,
    setViewMode
}: OutputDisplayProps) {
    if (!outputPrompt) return null;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="bg-card/30 backdrop-blur-3xl border border-border/40 rounded-[2rem] overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between px-8 py-4 bg-muted/20 border-b border-border/10">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewMode("text")}
                            className={cn("h-8 rounded-full px-4 text-[10px] font-black uppercase tracking-widest", viewMode === "text" ? "bg-primary/10 text-primary" : "text-muted-foreground")}
                        >
                            <AlignLeft className="w-3 h-3 mr-2" />
                            Text
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewMode("json")}
                            className={cn("h-8 rounded-full px-4 text-[10px] font-black uppercase tracking-widest", viewMode === "json" ? "bg-primary/10 text-primary" : "text-muted-foreground")}
                        >
                            <Code className="w-3 h-3 mr-2" />
                            JSON
                        </Button>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onCopy}
                        className="h-8 rounded-full px-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                    >
                        {copied ? <Check className="w-3 h-3 mr-2" /> : <Copy className="w-3 h-3 mr-2" />}
                        {copied ? "Copied" : "Copy Protocol"}
                    </Button>
                </div>
                <div className="p-8 md:p-12">
                    <div className="text-lg md:text-xl font-medium leading-relaxed text-foreground/90 font-serif italic">
                        {viewMode === "json" ? (
                            <pre className="text-sm font-mono not-italic bg-muted/50 p-6 rounded-2xl border border-border/20 overflow-x-auto">
                                {JSON.stringify({ prompt: outputPrompt, timestamp: new Date().toISOString() }, null, 2)}
                            </pre>
                        ) : (
                            <span>{outputPrompt}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
