# 🐧 Linux Canlı Rehber (Linux Command Guide)

Modern, hızlı ve tamamen Türkçe içeriğe sahip, fütüristik bir Linux komut rehberi uygulaması. Bu proje, Linux dünyasına yeni adım atanlar veya terminal komutlarını hızlıca hatırlamak isteyen profesyoneller için tasarlanmış canlı bir web servisidir.

![Linux Canlı Rehber](public/assets/linux_schematic.png)

## 🚀 Özellikler

-   **🔍 Canlı Komut Araması:** Sadece komut adıyla (cmd) anlık filtreleme.
-   **🌐 Web Entegrasyonu:** Yerel veri tabanında bulunmayan komutlar için **Ubuntu-TR Wiki** üzerinden canlı veri çekme (scraping).
-   **🌲 Linux Dizin Yapısı:** Görsel infografikler ve detaylı açıklamalarla Linux dosya sistemi hiyerarşisi sayfası.
-   **🔄 Ters Komut Mantığı:** Komutların zıtlarını (örn: `mkdir` ↔ `rmdir`) tek tıkla görebilme ve arayabilme.
-   **🎨 Avant-Garde UI:** Glassmorphism, acid green vurgular, koyu tema ve akıcı Framer Motion animasyonları.
-   **📱 Mobil Uyumluluk:** Her cihazda kusursuz görünen responsive tasarım.

## 🛠️ Teknoloji Yığını

-   **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
-   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
-   **Animasyon:** [Framer Motion](https://www.framer.com/motion/)
-   **İkonlar:** [Lucide React](https://lucide.dev/)
-   **Veri Kazıma:** [Cheerio](https://cheerio.js.org/)
-   **Dil:** TypeScript

## 📂 Dosya Yapısı

-   `app/`: Uygulamanın ana sayfaları ve API rotaları.
-   `app/dizin-yapisi/`: Linux hiyerarşisini anlatan özel eğitim sayfası.
-   `app/api/search/`: Canlı web araması yapan backend servisi.
-   `components/ui/`: Özel tasarım UI bileşenleri (SearchBar, CommandCard vb.).
-   `data/commands.json`: 200+ komut içeren zengin yerel veri seti.
-   `public/assets/`: Proje görselleri ve infografikler.

## ⚙️ Kurulum ve Çalıştırma

Projeyi yerel makinenizde çalıştırmak için:

1.  Bağımlılıkları yükleyin:
    ```bash
    npm install
    ```

2.  Geliştirme sunucusunu başlatın:
    ```bash
    npm run dev
    ```

3.  Tarayıcınızda şu adresi açın: `http://localhost:3008`

*Not: Uygulama yerel ağdan erişebilmeniz için `-H 0.0.0.0` parametresiyle yapılandırılmıştır.*

