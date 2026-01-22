"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

export function SearchBar({ value, onChange, className }: SearchBarProps) {
    return (
        <div className={cn("relative group w-full max-w-2xl mx-auto", className)}>
            <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 rounded-full" />
            <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Komut ara... (örn: dosyaları listele)"
                    className="w-full h-14 pl-12 pr-6 bg-secondary/50 backdrop-blur-md border border-white/5 rounded-full text-lg placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:bg-secondary/80 transition-all font-light"
                />
                <div className="absolute right-4 text-xs font-mono text-muted-foreground/30 hidden sm:block">
                    CMD + K
                </div>
            </div>
        </div>
    );
}
