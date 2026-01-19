"use client";

import { useState, useTransition, useEffect } from "react";
import { styles } from "@/config";
import { useDynamicConfig } from "@/hooks/use-config";
import { SupportedTemplate, SupportedAIModel } from "@/types/dynamic-config";
import { generatePrompt } from "@/app/actions/generate-prompt";
import { toast } from "sonner";

// Modular Components
import { BlueprintSelector } from "./BlueprintSelector";
import { ModelSelector } from "./ModelSelector";
import { PromptCanvas } from "./PromptCanvas";
import { OutputDisplay } from "./OutputDisplay";
import { PropertiesPanel } from "./PropertiesPanel";

interface PromptGeneratorProps {
    initialTemplates: SupportedTemplate[];
    initialModels: SupportedAIModel[];
}

export function PromptGenerator({ initialTemplates, initialModels }: PromptGeneratorProps) {
    // Dynamic Config with Server Hydration
    const { templates, models } = useDynamicConfig({
        initialTemplates,
        initialModels
    });

    // State
    const [selectedTemplate, setSelectedTemplate] = useState<SupportedTemplate | null>(initialTemplates[0] || null);
    const [selectedStyle, setSelectedStyle] = useState(styles[0]);
    const [selectedModelId, setSelectedModelId] = useState<string>(initialModels[0]?.model_id || '');
    const [inputPrompt, setInputPrompt] = useState("");
    const [outputPrompt, setOutputPrompt] = useState("");
    const [parameters, setParameters] = useState<Record<string, any>>(initialTemplates[0]?.default_params || {});
    const [copied, setCopied] = useState(false);
    const [showTemplates, setShowTemplates] = useState(false);
    const [viewMode, setViewMode] = useState<"text" | "json">("text");
    const [isPending, startTransition] = useTransition();

    // Reset parameters when template changes
    useEffect(() => {
        if (selectedTemplate) {
            setParameters(selectedTemplate.default_params || {});
        }
    }, [selectedTemplate?.id]);

    const handleParamChange = (key: string, value: any) => {
        setParameters(prev => ({ ...prev, [key]: value }));
    };

    const handleGenerate = () => {
        if (!inputPrompt.trim()) {
            toast.error("Enter your concept in the creative canvas");
            return;
        }

        if (!selectedTemplate) {
            toast.error("Select a blueprint first");
            return;
        }

        startTransition(async () => {
            const result = await generatePrompt({
                topic: inputPrompt,
                templateId: selectedTemplate.id,
                templateStructure: selectedTemplate.structure,
                style: selectedStyle.name,
                modelId: selectedModelId,
                parameters
            });

            if (result.error) {
                toast.error(result.error);
            } else {
                setOutputPrompt(result.content);
                toast.success("Protocol architected successfully");
            }
        });
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(outputPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.success("Protocol saved to clipboard");
    };

    return (
        <div className="flex h-full bg-background overflow-hidden font-sans">
            {/* Main Creative Area */}
            <div className="flex-1 overflow-y-auto relative lg:pr-80">
                <div className="max-w-4xl mx-auto px-6 py-10 lg:py-16 space-y-12">

                    {/* Header Selectors: Modularized */}
                    <div className="flex flex-wrap items-center justify-center gap-3 animate-in fade-in slide-in-from-top-4 duration-700">
                        <BlueprintSelector
                            templates={templates}
                            selectedTemplate={selectedTemplate}
                            onSelect={setSelectedTemplate}
                            open={showTemplates}
                            onOpenChange={setShowTemplates}
                        />
                        <div className="w-[1px] h-4 bg-border/40 mx-1" />
                        <ModelSelector
                            models={models}
                            selectedModelId={selectedModelId}
                            onSelect={setSelectedModelId}
                        />
                    </div>

                    {/* Input Canvas: Modularized */}
                    <PromptCanvas
                        inputPrompt={inputPrompt}
                        setInputPrompt={setInputPrompt}
                        selectedStyle={selectedStyle}
                        setSelectedStyle={setSelectedStyle}
                        onGenerate={handleGenerate}
                        isPending={isPending}
                    />

                    {/* Result Display: Modularized */}
                    <OutputDisplay
                        outputPrompt={outputPrompt}
                        copied={copied}
                        onCopy={handleCopy}
                        viewMode={viewMode}
                        setViewMode={setViewMode}
                    />
                </div>
            </div>

            {/* Sidecar: Properties Drawer */}
            <PropertiesPanel
                template={selectedTemplate}
                style={selectedStyle}
                parameters={parameters}
                onParamChange={handleParamChange}
                onGenerate={handleGenerate}
                isPending={isPending}
            />
        </div>
    );
}
