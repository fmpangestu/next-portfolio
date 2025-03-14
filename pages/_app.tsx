/* eslint-disable react/no-unescaped-entities */
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import { AnimatePresence } from "framer-motion";
export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <div className="grid grid-cols-12 gap-6 px-5 2xl:px-48 my-14 sm:px-20 lg:px-8 ">
        <div className="overflow-hidden col-span-12 p-4 text-center bg-white dark:bg-gradient-to-tr dark:from-slate-950 dark:to-slate-800  lg:col-span-3 rounded-2xl shadow-custom-light dark:shadow-custom-dark">
          <Sidebar />
        </div>
        <div className="flex flex-col col-span-12 overflow-hidden bg-white dark:bg-gradient-to-tl dark:from-slate-950 dark:to-slate-800 lg:col-span-9 rounded-2xl shadow-custom-light dark:shadow-custom-dark">
          <Head>
            <title>I'm Farhan</title>
          </Head>
          <AnimatePresence key={router.route}>
            <Navbar />
            <Component {...pageProps} />
          </AnimatePresence>
        </div>
      </div>
    </ThemeProvider>
  );
}
