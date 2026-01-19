"use client";

import { Wand2, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { styles } from "@/config";
import { cn } from "@/lib/utils";

interface PromptCanvasProps {
    inputPrompt: string;
    setInputPrompt: (val: string) => void;
    selectedStyle: typeof styles[0];
    setSelectedStyle: (style: typeof styles[0]) => void;
    onGenerate: () => void;
    isPending: boolean;
}

export function PromptCanvas({
    inputPrompt,
    setInputPrompt,
    selectedStyle,
    setSelectedStyle,
    onGenerate,
    isPending
}: PromptCanvasProps) {
    return (
        <div className="relative group">
            {/* Glassmorphic Glow Background */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/5 to-accent/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

            <div className="relative bg-card/40 backdrop-blur-3xl border border-border/40 rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden min-h-[400px] flex flex-col">
                <Textarea
                    placeholder="Describe the soul of your prompt..."
                    value={inputPrompt}
                    onChange={(e) => setInputPrompt(e.target.value)}
                    className="min-h-[160px] bg-transparent border-none resize-none text-2xl md:text-3xl font-bold placeholder:text-muted-foreground/10 focus-visible:ring-0 p-0 leading-tight mb-8"
                />

                <div className="mt-auto flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-border/20">
                    {/* Style Signatures */}
                    <div className="flex items-center gap-3">
                        <TooltipProvider>
                            <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-muted/30 border border-border/30">
                                {styles.map((style) => (
                                    <Tooltip key={style.id}>
                                        <TooltipTrigger asChild>
                                            <button
                                                onClick={() => setSelectedStyle(style)}
                                                className={cn(
                                                    "w-3 h-3 rounded-full transition-all duration-300",
                                                    style.previewColor ? `bg-gradient-to-br ${style.previewColor}` : "bg-muted-foreground",
                                                    selectedStyle.id === style.id
                                                        ? "ring-4 ring-primary/20 scale-125"
                                                        : "opacity-40 hover:opacity-100 hover:scale-110"
                                                )}
                                            />
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-popover text-popover-foreground border-border/40 font-bold uppercase tracking-widest text-[10px] py-1.5 px-3 rounded-full">
                                            {style.name}
                                        </TooltipContent>
                                    </Tooltip>
                                ))}
                            </div>
                        </TooltipProvider>
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Signature Style</span>
                    </div>

                    {/* Architect Action */}
                    <Button
                        size="lg"
                        disabled={isPending}
                        onClick={onGenerate}
                        className="h-14 rounded-2xl px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-black tracking-tight shadow-xl shadow-primary/20 transition-all active:scale-95 group"
                    >
                        {isPending ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                <Wand2 className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
                                ARCHITECT PROMPT
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
