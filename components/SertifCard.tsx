"use client";
import { ISertificate } from "@/type";
import Image from "next/image";
import { FunctionComponent, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { LuLink } from "react-icons/lu";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/animate";

const SertifCard: FunctionComponent<{ sertif: ISertificate }> = ({
  sertif: { title, description, image_path, sertificate_url },
}) => {
  const [mounted, setMounted] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div className=" ">
      <Image
        src={image_path}
        alt={title}
        width={500}
        height={500}
        layout="responsive"
        className="cursor-pointer rounded-lg"
        onClick={() => setShowDetail(true)}
      />
      {showDetail && (
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="grid md:grid-cols-2 p-2 absolute top-0 left-0 z-0 w-full h-auto gap-x-5 text-slate-900 dark:text-white  bg-white dark:bg-gradient-to-r dark:from-slate-950 dark:to-slate-800 rounded-xl "
        >
          <motion.div variants={fadeUp} className="">
            <Image
              src={image_path}
              alt={title}
              width={500}
              height={500}
              layout="responsive"
              className="cursor-pointer rounded-xl border-4 border-sky-950 dark:border-slate-100"
            />
          </motion.div>
          <div className=" flex flex-col gap-3">
            <motion.h2 variants={fadeUp} className="font-semibold text-xl">
              {title}
            </motion.h2>
            <motion.h5 variants={fadeUp} className="text-sm">
              {description}
            </motion.h5>
            <motion.div variants={fadeUp} className="flex gap-3">
              <a
                className="flex space-x-3 items-center justify-center dark:bg-slate-800 bg-slate-300 px-2 py-1 rounded-lg "
                href={sertificate_url}
                target="blank"
              >
                <LuLink />
                <span>Visit Sertificate</span>
              </a>
            </motion.div>
          </div>
          <button
            className="absolute right-4 top-3 focus:outline-none rounded-full p-1 bg-slate-900 dark:bg-slate-100 text-slate-100 dark:text-slate-900"
            onClick={() => setShowDetail(false)}
          >
            <AiOutlineClose size={30} />
          </button>
        </motion.div>
      )}
    </div>
  );
};
export default SertifCard;