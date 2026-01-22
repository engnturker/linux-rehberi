"use client";

import { motion } from "framer-motion";
import { Copy, Check, ArrowRightLeft } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CommandCardProps {
    cmd: string;
    desc: string;
    usage: string;
    reverse?: string | null;
    category: string;
    onReverseClick?: (cmd: string) => void;
}

export function CommandCard({ cmd, desc, usage, reverse, category, onReverseClick }: CommandCardProps) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(usage);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="group relative flex flex-col justify-between p-6 bg-card border border-white/5 rounded-xl hover:border-primary/30 transition-colors overflow-hidden"
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Header */}
            <div className="relative z-10 flex justify-between items-start mb-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider border border-white/5 px-2 py-0.5 rounded-full">
                            {category}
                        </span>
                        {reverse && (
                            <button
                                onClick={() => onReverseClick?.(reverse)}
                                className="flex items-center gap-1 text-[10px] text-primary hover:underline cursor-pointer"
                                title={`Ters işlevi: ${reverse}`}
                            >
                                <ArrowRightLeft className="w-3 h-3" />
                                <span>{reverse}</span>
                            </button>
                        )}
                    </div>
                    <h3 className="text-3xl font-bold font-mono text-foreground tracking-tight group-hover:text-primary transition-colors">
                        {cmd}
                    </h3>
                </div>

                <button
                    onClick={copyToClipboard}
                    className="p-2 text-muted-foreground hover:text-primary transition-colors bg-secondary/50 rounded-lg hover:bg-secondary"
                >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
            </div>

            {/* Body */}
            <div className="relative z-10 space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {desc}
                </p>

                <div className="bg-black/40 rounded-lg p-3 font-mono text-sm text-primary/90 break-all border border-white/5 group-hover:border-primary/20 transition-colors">
                    <span className="text-muted-foreground select-none">$ </span>
                    {usage}
                </div>
            </div>
        </motion.div>
    );
}
