/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { IProject } from "@/type";
import Image from "next/image";
import { FunctionComponent, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaSquareGithub } from "react-icons/fa6";
import { LuLink } from "react-icons/lu";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/animate";
const ProjectCard: FunctionComponent<{
  project: IProject;
  showDetail: null | number;
  setShowDetail: (id: null | number) => void;
}> = ({
  project: {
    title,
    description,
    image_path,
    deployed_url,
    github_url,
    category,
    key_techs,
    id,
  },
  showDetail,
  setShowDetail,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div className="w-full items-center justify-center">
      <Image
        src={image_path}
        alt={title}
        width={500}
        height={500}
        layout="responsive"
        className="cursor-pointer rounded-t-lg"
        onClick={() => setShowDetail(id)}
      />
      <p className="text-center ">{title}</p>
      {showDetail === id && (
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="grid md:grid-cols-2 gap-y-2 p-3 md:p-10 fixed  top-1/4 lg:top-1/4  left-0 mx-3 sm:mx-10 lg:mx-48 2xl:mx-[28rem] z-10  h-auto gap-x-12 text-slate-900 dark:text-white  bg-white dark:bg-gradient-to-r dark:from-slate-950 dark:to-slate-800 rounded-xl shadow-custom-light dark:shadow-custom-dark"
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
            <div className="flex space-x-3 items-center justify-center mt-3">
              <motion.a
                variants={fadeUp}
                className="flex space-x-3 items-center justify-center dark:bg-slate-800 bg-slate-300 px-2 py-1 rounded-lg "
                href={github_url}
                target="blank"
              >
                <FaSquareGithub />
                <span>Github</span>
              </motion.a>
              {deployed_url ? (
                <motion.a
                  variants={fadeUp}
                  className="flex space-x-3 items-center justify-center dark:bg-slate-800 bg-slate-300 px-2 py-1 rounded-lg "
                  href={deployed_url}
                  target="blank"
                >
                  <LuLink />
                  <span>Project</span>
                </motion.a>
              ) : (
                <motion.a
                  variants={fadeUp}
                  className="flex space-x-3 items-center justify-center dark:bg-slate-800/40 bg-slate-300/40 dark:text-slate-300/40 text-slate-950/50 px-2 py-1 rounded-lg "
                  href={deployed_url}
                  target="blank"
                >
                  <LuLink />
                  <span>Comingson</span>
                </motion.a>
              )}
            </div>
          </motion.div>
          <div className=" flex flex-col gap-3">
            <motion.h2 variants={fadeUp} className="font-semibold text-xl">
              {title}
            </motion.h2>
            <motion.h5 variants={fadeUp} className="text-sm">
              {description}
            </motion.h5>
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap w-full text-center gap-3 "
            >
              {key_techs.map((tech) => (
                <span
                  key={tech}
                  className="text-[0.8rem] dark:bg-slate-800 bg-slate-300 px-2 py-1 rounded-lg "
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>
          <motion.button
            variants={fadeUp}
            className="absolute right-4 top-3 focus:outline-none rounded-full p-1 bg-slate-900 dark:bg-slate-100 text-slate-100 dark:text-slate-900"
            onClick={() => setShowDetail(null)}
          >
            <AiOutlineClose size={30} />
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};
export default ProjectCard;
