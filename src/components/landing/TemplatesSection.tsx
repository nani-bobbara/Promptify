import { templates } from "@/config/templates";
import {
    FileText,
    Image as ImageIcon,
    Video as VideoIcon,
    Settings,
    ArrowRight,
    Layers
} from "lucide-react";
import { cn } from "@/lib/utils";

const localIconMap: Record<string, any> = {
    'Image': ImageIcon,
    'Video': VideoIcon,
    'Text': FileText,
    'Utility': Settings
};

export function TemplatesSection() {
    return (
        <section id="templates" className="py-32 relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 mb-6">
                        <Layers className="w-3.5 h-3.5 text-primary" />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Ready-to-use Units</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none">
                        Refined <span className="text-primary italic">Blueprints</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
                        Accelerate your workflow with pre-validated structures engineered for specific AI engines.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {templates.slice(0, 6).map((template) => {
                        const Icon = localIconMap[template.category] || FileText;
                        return (
                            <div
                                key={template.id}
                                className="group p-8 rounded-[2rem] bg-card border border-border/40 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
                            >
                                <div className="flex items-start justify-between mb-8">
                                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1 rounded-full bg-secondary text-secondary-foreground border border-border">
                                        {template.category}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold mb-3 tracking-tight">{template.name}</h3>
                                <p className="text-sm font-bold text-muted-foreground mb-6 line-clamp-2 leading-relaxed">
                                    {template.description}
                                </p>

                                <div className="text-[10px] font-mono font-bold bg-muted/50 p-4 rounded-xl border border-border/30 text-muted-foreground/50 truncate group-hover:text-muted-foreground transition-colors overflow-hidden">
                                    {template.structure}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-20 text-center">
                    <a href="/auth" className="group inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.2em] text-primary hover:text-primary/80 transition-all">
                        EXPLORE ENTIRE REPOSITORY
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </a>
                </div>
            </div>
        </section>
    );
}
