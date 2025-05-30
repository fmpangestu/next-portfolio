import { fadeUp, routeAnimate } from "@/animate";
import Bar from "@/components/Bar";
import { languages, tools } from "@/data";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo"; // <-- Tambahkan ini
import React from "react"; // <-- Tambahkan ini
/* eslint-disable react/no-unescaped-entities */

export default function ResumePage() {
  const varianst = fadeUp;
  const pageTitle = "Resume";
  const pageDescription =
    "Ringkasan pengalaman, pendidikan, dan keahlian teknis saya.";

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
            <h1 className="font-semibold">Education</h1>
            <h3 className="font-semibold">Informatics Engineering</h3>
            <h4 className="font-semibold">
              Universitas Alma ata (2021 - Present)
            </h4>
            <p className="text-[.8rem]">
              Informatics Engineering study program at Alma Ata University who
              has a special interest and talent in technology, especially in Web
              Development.
            </p>
          </motion.div>
          <motion.div
            variants={varianst}
            initial="initial"
            animate="animate"
            className=""
          >
            <h1 className="font-semibold">Experience</h1>
            <h3 className="font-semibold">Internship</h3>
            <h4 className="text-[.8rem] font-semibold">
              PT. TECH ACADEMY INTERNATIONAL (2024 - Present)
            </h4>
            <p>I interned as a Front End Engineering Website Developer </p>
          </motion.div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h6 className="my-3 text-xl font-bold tracking-wide">
              Languages and Frameworks
            </h6>
            <div className="my-2">
              {languages.map((language) => (
                <Bar data={language} key={language.title} />
              ))}
            </div>
          </div>
          <div>
            <h6 className="my-3 text-xl font-bold tracking-wide">
              Tools & Software
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
