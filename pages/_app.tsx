/* eslint-disable react/no-unescaped-entities */
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { AnimatePresence } from "framer-motion";
import { DefaultSeo } from "next-seo"; // <-- Tambahkan ini
import PricingCarousel from "@/components/PricingCarousel";
import PortfolioChatbot from "@/components/PortfolioChatbot";
// Konfigurasi SEO Default (Anda bisa pindahkan ke file terpisah jika mau)
const DEFAULT_SEO = {
  title: "Farhan Maulana Pangestu",
  titleTemplate: "%s | Portfolio", // %s akan diganti dengan title dari halaman
  description:
    "Portfolio Farhan Maulana Pangestu, seorang Front End Developer dan mahasiswa Universitas Alma Ata. Jelajahi proyek, keahlian, dan pengalaman saya.",
  openGraph: {
    type: "website",
    locale: "id_ID", // Anda bisa ganti ke en_US atau lainnya
    url: "https://www.farhndv.me", // <-- GANTI DENGAN URL ANDA
    site_name: "Farhan Maulana Pangestu Portfolio",
    // Anda bisa menambahkan gambar default di sini
    images: [
      {
        url: "https://farhndv.me/boy.png",
        width: 800,
        height: 600,
        alt: "Farhan Maulana Pangestu Portfolio",
      },
    ],
  },
  // Anda bisa menambahkan twitter card di sini jika perlu
  // twitter: {
  //   handle: '@yourtwitterhandle',
  //   site: '@yourtwitterhandle',
  //   cardType: 'summary_large_image',
  // },
};

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <DefaultSeo {...DEFAULT_SEO} />
      <div className="relative min-h-screen">
        <div className="grid grid-cols-12 gap-6 px-5 2xl:px-48 my-14 sm:px-20 lg:px-8  lg:my-8">
          <div className="overflow-hidden col-span-12 p-4 text-center bg-white dark:bg-gradient-to-tr dark:from-slate-950 dark:to-slate-800 lg:col-span-3 rounded-2xl shadow-custom-light dark:shadow-custom-dark">
            <Sidebar />
          </div>
          <div className="flex flex-col col-span-12 overflow-hidden bg-white dark:bg-gradient-to-tl dark:from-slate-950 dark:to-slate-800 lg:col-span-9 rounded-2xl shadow-custom-light dark:shadow-custom-dark">
            <AnimatePresence key={router.route}>
              <Navbar />
              <Component {...pageProps} />
            </AnimatePresence>
          </div>
          <div className="md:hidden overflow-hidden col-span-12 p-4 text-center bg-white dark:bg-gradient-to-tr dark:from-slate-950 dark:to-slate-800 lg:col-span-3 rounded-2xl shadow-custom-light dark:shadow-custom-dark">
            <PricingCarousel />
          </div>
        </div>
        <PortfolioChatbot />
      </div>
    </ThemeProvider>
  );
}
