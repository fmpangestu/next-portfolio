import { fadeUp, routeAnimate, stagger } from "@/animate";
import SertifCard from "@/components/SertifCard";
import { sertificats } from "@/data";
import { motion } from "framer-motion";
import { useState } from "react";
import { NextSeo } from "next-seo"; // <-- Tambahkan ini
import React from "react"; // <-- Tambahkan ini

const SertificatePage = () => {
  const [showDetail, setShowDetail] = useState<number | null>(null);
  const pageTitle = "Certificates & Licenses";
  const pageDescription =
    "Lihat koleksi sertifikat dan lisensi yang saya miliki.";

  return (
    <React.Fragment>
      {" "}
      {/* <-- Bungkus dengan Fragment */}
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        openGraph={{
          title: `${pageTitle} | Farhan Maulana Pangestu Portfolio`,
          description: pageDescription,
        }}
      />
      <motion.div
        variants={routeAnimate}
        initial="initial"
        animate="animate"
        exit="exit"
        className="px-5 py-2 overflow-y-scroll custom-scrollbar "
        style={{ height: "65vh" }}
      >
        <h1>{pageTitle}</h1> {/* <-- Gunakan variabel judul */}
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="grid grid-cols-12 gap-4 my-2 2xl:mt-1 relative"
        >
          {sertificats.map((sertif) => (
            <motion.div
              variants={fadeUp}
              className="col-span-12 sm:col-span-6 lg:col-span-4 bg-gray-300 rounded-lg dark:bg-slate-950"
              key={sertif.title}
            >
              <SertifCard
                sertif={sertif}
                showDetail={showDetail}
                setShowDetail={setShowDetail}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </React.Fragment> // <-- Tutup Fragment
  );
};
export default SertificatePage;
