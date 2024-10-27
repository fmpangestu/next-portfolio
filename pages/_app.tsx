import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <div className="grid grid-cols-12 gap-6 px-5 2xl:px-48 my-14 sm:px-20 lg:px-8 ">
        <div className="overflow-hidden col-span-12 p-4 text-center bg-white dark:bg-gradient-to-tr dark:from-slate-950 dark:to-slate-800  lg:col-span-3 rounded-2xl shadow-custom-light dark:shadow-custom-dark">
          <Sidebar />
        </div>
        <div className="flex flex-col col-span-12 overflow-hidden bg-white dark:bg-gradient-to-tl dark:from-slate-950 dark:to-slate-800 lg:col-span-9 rounded-2xl shadow-custom-light dark:shadow-custom-dark">
          <Navbar />
          <Component {...pageProps} />
        </div>
      </div>
    </ThemeProvider>
  );
}
