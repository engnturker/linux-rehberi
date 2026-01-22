"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchBar } from "@/components/ui/SearchBar";
import { CommandCard } from "@/components/ui/CommandCard";
import { CategoryFilter } from "@/components/ui/CategoryFilter";
import initialCommands from "@/data/commands.json";
import { Terminal, Loader2, Globe, FolderTree } from "lucide-react";
import Link from "next/link";

interface Command {
    cmd: string;
    desc: string;
    usage: string;
    category: string;
    reverse?: string | null;
}

export default function Home() {
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("Tümü");
    const [commands, setCommands] = useState<Command[]>(initialCommands as Command[]);
    const [loading, setLoading] = useState(false);

    // Categories (static based on initial data + "Web")
    const categories = useMemo(() => {
        const cats = Array.from(new Set(initialCommands.map((c) => c.category)));
        return ["Tümü", ...cats.sort()];
    }, []);

    // Perform Web Search
    useEffect(() => {
        const fetchResults = async () => {
            if (search.length < 2) {
                setCommands(initialCommands as Command[]);
                return;
            }

            setLoading(true);
            try {
                const res = await fetch(`/api/search?q=${encodeURIComponent(search)}`);
                const data = await res.json();
                if (data.results) {
                    setCommands(data.results);
                }
            } catch (error) {
                console.error("Search error:", error);
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(fetchResults, 500); // Debounce
        return () => clearTimeout(timer);
    }, [search]);

    // Apply category filter on top of current commands
    const filteredCommands = useMemo(() => {
        return commands.filter((cmd) => {
            const matchesCategory = activeCategory === "Tümü" || cmd.category === activeCategory;
            return matchesCategory;
        });
    }, [commands, activeCategory]);

    const handleReverseClick = (reverseCmd: string) => {
        setSearch(reverseCmd);
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);
    };

    return (
        <div className="min-h-screen px-4 py-8 md:py-12 relative">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Navigation Action */}
                <div className="absolute top-6 right-6 z-[60]">
                    <Link href="/dizin-yapisi">
                        <motion.button
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-2xl border border-white/10 text-sm font-medium flex items-center gap-2 transition-all backdrop-blur-md"
                        >
                            <FolderTree className="w-4 h-4 text-primary" />
                            <span className="hidden sm:inline">Linux Dizin Yapısını Öğren</span>
                            <span className="sm:hidden">Dizin Yapısı</span>
                        </motion.button>
                    </Link>
                </div>

                {/* Header */}
                <div className="text-center space-y-4 pt-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center justify-center p-3 bg-white/5 rounded-2xl mb-4 ring-1 ring-white/10"
                    >
                        {loading ? (
                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        ) : (
                            <Terminal className="w-8 h-8 text-primary" />
                        )}
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold tracking-tighter bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent"
                    >
                        Linux Canlı Rehber
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-muted-foreground text-lg flex items-center justify-center gap-2"
                    >
                        <Globe className="w-4 h-4 text-primary" />
                        Web üzerinden canlı komut araması altyapısı aktif.
                    </motion.p>
                </div>

                {/* Search & Filter */}
                <div className="space-y-6 sticky top-4 z-50 backdrop-blur-xl py-4 rounded-3xl -mx-4 px-4 bg-background/5 border-b border-white/5 md:static md:bg-transparent md:border-none md:p-0 md:backdrop-blur-none transition-all">
                    <SearchBar value={search} onChange={setSearch} />
                    <CategoryFilter
                        categories={categories}
                        activeCategory={activeCategory}
                        onSelect={setActiveCategory}
                    />
                </div>

                {/* Results Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredCommands.length > 0 ? (
                            filteredCommands.map((cmd) => (
                                <CommandCard
                                    key={cmd.cmd + cmd.category}
                                    {...cmd}
                                    onReverseClick={handleReverseClick}
                                />
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full text-center py-20 text-muted-foreground"
                            >
                                {loading ? "Web taranıyor..." : "Sonuç bulunamadı."}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Footer Removed */}
            </div>
        </div>
    );
}
