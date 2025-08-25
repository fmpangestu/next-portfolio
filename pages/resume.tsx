/* eslint-disable react/no-unescaped-entities */
import { fadeUp, routeAnimate } from "@/animate";
import Bar from "@/components/Bar";
import { languages, tools } from "@/data";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo"; // <-- Tambahkan ini
import React from "react"; // <-- Tambahkan ini
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations"; // Tambahkan import ini
import { GetStaticProps } from "next"; // Tambahkan import ini

export default function ResumePage() {
  const { t } = useTranslation("common");
  const varianst = fadeUp;
  const pageTitle = t("resume");
  const pageDescription = t("resumeDescription");

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
        className="flex flex-col flex-grow px-6 py-2 overflow-x-hidden overflow-y-scroll custom-scrollbar "
        style={{ height: "65vh" }}
      >
        <div className="grid gap-6 md:grid-cols-2 text-slate-800 dark:text-slate-200">
          <motion.div
            variants={varianst}
            initial="initial"
            animate="animate"
            className=""
          >
            <h1 className="font-semibold">{t("education")}</h1>
            <h3 className="font-semibold">{t("informaticsEngineering")}</h3>
            <h4 className="font-semibold">
              {t("universityName")} (2021 - 2025)
            </h4>
            <p className="text-[.8rem]">{t("educationDescription")}</p>
          </motion.div>
          <motion.div
            variants={varianst}
            initial="initial"
            animate="animate"
            className=""
          >
            <h1 className="font-semibold">{t("experience")}</h1>
            <h3 className="font-semibold">{t("internship")}</h3>
            <h4 className="text-[.8rem] font-semibold">
              {t("internshipCompany")} (2024 - 2025)
            </h4>
            <p>{t("internshipDescription")}</p>
          </motion.div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h6 className="my-3 text-xl font-bold tracking-wide">
              {t("languagesAndFrameworks")}
            </h6>
            <div className="my-2">
              {languages.map((language) => (
                <Bar data={language} key={language.title} />
              ))}
            </div>
          </div>
          <div>
            <h6 className="my-3 text-xl font-bold tracking-wide">
              {t("toolsAndSoftware")}
            </h6>
            <div className="my-2 ">
              {tools.map((language) => (
                <Bar data={language} key={language.title} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </React.Fragment> // <-- Tutup Fragment
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || "en", ["common"])),
    },
  };
};
