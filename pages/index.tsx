/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
import ServiceCard from "@/components/ServiceCard";
import { services } from "../data";
import { motion } from "framer-motion";
import { fadeUp, routeAnimate, stagger } from "@/animate";
import { NextSeo } from "next-seo";
import React from "react";
// Tambahkan import ini
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";

export default function HomePage() {
  // Tambahkan ini untuk menggunakan terjemahan
  const { t } = useTranslation("common");

  // Gunakan terjemahan untuk teks
  const pageDescription = t("intro");

  return (
    <React.Fragment>
      <NextSeo
        title="Home"
        description={pageDescription}
        openGraph={{
          title: "Home | Farhan Maulana Pangestu Portfolio",
          description: pageDescription,
        }}
      />
      <motion.div
        variants={routeAnimate}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex flex-col flex-grow px-6 pt-1 overflow-y-scroll custom-scrollbar"
        style={{ height: "65vh" }}
      >
        <motion.h5
          variants={fadeUp}
          initial="initial"
          animate="animate"
          className="font-medium"
        >
          {pageDescription}
        </motion.h5>
        <div
          className="flex-grow p-4 mt-2 bg-gray-200 dark:bg-slate-950"
          style={{ marginLeft: "-1.5rem", marginRight: "-1.5rem" }}
        >
          <h6 className="my-3 text-xl font-bold tracking-wide">
            {t("skillAndExperience")}
          </h6>
          <motion.div
            variants={stagger}
            animate="animate"
            initial="initial"
            className="grid gap-6 md:grid-cols-2 "
          >
            {services.map((service) => (
              <motion.div
                variants={fadeUp}
                key={service.title}
                className={`bg-slate-100 dark:bg-slate-900 rounded-xl`}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </React.Fragment>
  );
}

// Tambahkan ini - SANGAT PENTING
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || "en", ["common"])),
    },
  };
};
