"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
    categories: string[];
    activeCategory: string;
    onSelect: (category: string) => void;
}

export function CategoryFilter({ categories, activeCategory, onSelect }: CategoryFilterProps) {
    return (
        <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => onSelect(cat)}
                    className={cn(
                        "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                        activeCategory === cat
                            ? "text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground bg-secondary/30 hover:bg-secondary/60"
                    )}
                >
                    {activeCategory === cat && (
                        <motion.div
                            layoutId="activeCategory"
                            className="absolute inset-0 bg-primary rounded-full"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10">{cat}</span>
                </button>
            ))}
        </div>
    );
}
