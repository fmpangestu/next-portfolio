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
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { appWithTranslation } from "next-i18next";
import { siteConfig } from "../config/site";
import { useEffect } from "react";

import AdminLayout from "@/components/layouts/AdminLayout";

const DEFAULT_SEO = {
  defaultTitleL: "Farhan Maulana Pangestu",
  title: "Farhan Maulana Pangestu",
  titleTemplate: "%s | Portfolio", // %s akan diganti dengan title dari halaman
  description:
    "Portfolio Farhan Maulana Pangestu, seorang Front End Developer dan mahasiswa Universitas Alma Ata. Jelajahi proyek, keahlian, dan pengalaman saya.",
  openGraph: {
    type: "website",
    locale: "id_ID", // Anda bisa ganti ke en_US atau lainnya
    url: siteConfig.url,
    site_name: siteConfig.name,
    // Anda bisa menambahkan gambar default di sini
    images: [
      {
        url: `${siteConfig.url}/favicon.ico`,
        width: 800,
        height: 600,
        alt: siteConfig.name,
      },
    ],
  },
  additionalMetaTags: [
    {
      name: "google-site-verification",
      content: "971209fbcb21c753",
    },
  ],
};

function App({ Component, pageProps, router }: AppProps) {
  const isAdmin = router.pathname.startsWith("/admin");

  useEffect(() => {
    if (!isAdmin) {
      document.title =
        router.pathname === "/"
          ? "Farhan Maulana Pangestu"
          : `${router.pathname.slice(1)} | Farhan Portfolio`;
    }
  }, [router.pathname, isAdmin]);

  // useEffect(() => {
  //   document.title =
  //     router.pathname === "/"
  //       ? "Farhan Maulana Pangestu"
  //       : `${router.pathname.slice(1)} | Farhan Portfolio`;
  // }, [router.pathname]);
  return (
    <ThemeProvider attribute="class">
      {!isAdmin && <DefaultSeo {...DEFAULT_SEO} />}

      {isAdmin ? (
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      ) : (
        <div className="relative min-h-screen overflow-x-hidden">
          <LanguageSwitcher />
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
      )}
    </ThemeProvider>
  );
}

export default appWithTranslation(App);
