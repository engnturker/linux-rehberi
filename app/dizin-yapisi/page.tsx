"use client";

import { motion } from "framer-motion";
import { FolderTree, ArrowLeft, Info, Home, HardDrive, Settings, Users, Monitor, ShieldCheck, Database, Layout } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const directoryData = [
    { path: "/", label: "Root (Kök)", desc: "Tüm dosya sisteminin başlangıç noktasıdır. Diğer tüm dizinler bu kökten türemiştir.", icon: Home, color: "text-blue-500" },
    { path: "/bin", label: "Bin", desc: "Sistemin başlatılması ve onarılması için gerekli olan temel komut dosyalarını (ls, cp, mv vb.) içerir.", icon: Monitor, color: "text-emerald-500" },
    { path: "/boot", label: "Boot", desc: "Sistemin açılış sürecinde kullanılan dosyalar (Kernel, Bootloader) burada bulunur.", icon: ShieldCheck, color: "text-orange-500" },
    { path: "/dev", label: "Dev", desc: "Sistemdeki donanımsal aygıtların (sabit diskler, USB girişleri vb.) dosya olarak temsil edildiği dizindir.", icon: HardDrive, color: "text-purple-500" },
    { path: "/etc", label: "Etc", desc: "Sistem genelindeki yapılandırma dosyalarının bulunduğu 'komuta merkezi'dir.", icon: Settings, color: "text-yellow-500" },
    { path: "/home", label: "Home", desc: "Kullanıcıların kişisel dosyaları, belgeleri ve ayarlarının tutulduğu ev dizinidir.", icon: Users, color: "text-pink-500" },
    { path: "/lib", label: "Lib", desc: "/bin ve /sbin altındaki komutlar için gerekli olan paylaşılan kütüphane dosyalarını içerir.", icon: Database, color: "text-cyan-500" },
    { path: "/root", label: "Root (Home)", desc: "Sistem yöneticisinin (superuser) kişisel ev dizinidir. Normal /home dizininden ayrıdır.", icon: ShieldCheck, color: "text-red-500" },
    { path: "/sbin", label: "Sbin", desc: "Sadece sistem yöneticisinin (root) kullanabileceği kritik yönetim komutlarını içerir.", icon: Settings, color: "text-orange-400" },
    { path: "/tmp", label: "Tmp", desc: "Uygulamaların geçici dosyalarını sakladığı yerdir. Genelde her açılışta temizlenir.", icon: FolderTree, color: "text-gray-400" },
    { path: "/usr", label: "Usr", desc: "Kullanıcı programları, dökümanlar ve kütüphanelerin bulunduğu en büyük dizin hiyerarşisidir.", icon: Monitor, color: "text-indigo-500" },
    { path: "/var", label: "Var", desc: "Sistem logları, veritabanları ve e-postalar gibi değişken (variable) verilerin tutulduğu yerdir.", icon: Database, color: "text-green-500" }
];

export default function DirectoryStructure() {
    return (
        <div className="min-h-screen px-4 py-12 md:py-24 max-w-5xl mx-auto">
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Rehber'e Geri Dön
            </Link>

            <header className="mb-16 space-y-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center justify-center p-3 bg-white/5 rounded-2xl mb-4 ring-1 ring-white/10"
                >
                    <FolderTree className="w-8 h-8 text-primary" />
                </motion.div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                    Linux Dizin Yapısı
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Linux dosya sistemi bir ağaç yapısına benzer. Her şey <b>/</b> (root) dizininden başlar ve belirli bir hiyerarşiye göre dallanır.
                </p>
            </header>

            {/* Visual Tree Section - Clean Version */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-16 flex justify-center w-full"
            >
                <div className="w-full relative h-[600px] md:h-[900px] rounded-3xl overflow-hidden shadow-2xl shadow-primary/5">
                    <Image
                        src="/assets/linux_schematic.png"
                        alt="Linux Hiyerarşi Şeması"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {directoryData.map((item, index) => (
                    <motion.div
                        key={item.path}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="group p-6 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-primary/20 hover:bg-white/[0.05] transition-all duration-300"
                    >
                        <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-2xl bg-white/5 ${item.color} group-hover:scale-110 transition-transform`}>
                                <item.icon className="w-6 h-6" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold tracking-tight flex items-center gap-2">
                                    <span className="text-primary font-mono">{item.path}</span>
                                    <span className="text-white/40 font-normal text-sm">— {item.label}</span>
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <section className="mt-20 p-8 rounded-3xl bg-primary/5 border border-primary/10 space-y-4">
                <div className="flex items-center gap-2 text-primary font-bold">
                    <Info className="w-5 h-5" />
                    Biliyor muydunuz?
                </div>
                <p className="text-muted-foreground leading-relaxed italic">
                    Linux'ta her şey bir dosyadır. Donanımlar, klavye, sabit disk ve hatta çalışan işlemler bile dosya sistemi üzerinde birer dosya olarak temsil edilir. Bu yaklaşım Linux'un esnekliğinin temelidir.
                </p>
            </section>
        </div>
    );
}
