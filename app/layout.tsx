import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Linux Komut Rehberi",
    description: "Modern, hızlı ve Türkçe Linux komut referansı.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="tr" className="dark">
            <body className={cn(inter.className, "min-h-screen bg-background antialiased selection:bg-primary selection:text-primary-foreground overflow-x-hidden")}>
                <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
                <main className="relative z-10">
                    {children}
                </main>
            </body>
        </html>
    );
}
