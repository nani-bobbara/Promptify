"use client";

import { ChevronDown, Bot, Sparkles, Zap } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SupportedAIModel } from "@/types/dynamic-config";

interface ModelSelectorProps {
    models: SupportedAIModel[];
    selectedModelId: string;
    onSelect: (id: string) => void;
}

export function ModelSelector({ models, selectedModelId, onSelect }: ModelSelectorProps) {
    const selectedModel = models.find(m => m.model_id === selectedModelId);
    if (!selectedModel) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-10 rounded-full pl-4 pr-3 border-border/50 bg-card/50 hover:bg-card">
                    <div className="flex items-center gap-2">
                        <Bot className="w-3.5 h-3.5 text-primary" />
                        <span className="text-sm font-bold tracking-tight">{selectedModel.name}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 p-2 rounded-2xl border-border/40 shadow-2xl" align="center">
                {models.map((model) => (
                    <DropdownMenuItem
                        key={model.model_id}
                        className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-muted/50 focus:bg-primary/10"
                        onClick={() => onSelect(model.model_id)}
                    >
                        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                            {model.provider === 'google' ? <Sparkles className="w-4 h-4 text-primary" /> : <Zap className="w-4 h-4 text-primary" />}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold leading-tight">{model.name}</span>
                            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{model.provider}</span>
                        </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
