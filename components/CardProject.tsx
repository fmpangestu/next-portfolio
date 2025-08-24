/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { IProject } from "@/type";
import Image from "next/image";
import { FunctionComponent, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaSquareGithub } from "react-icons/fa6";
import { LuLink, LuEye } from "react-icons/lu";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/animate";
import { FaLink } from "react-icons/fa";

const ProjectCard: FunctionComponent<{
  project: IProject;
  showDetail: null | number;
  setShowDetail: (id: null | number) => void;
}> = ({
  project: {
    username,
    title,
    description,
    image_path,
    deployed_url,
    github_url,
    category,
    key_techs,
    id,
    references,
  },
  showDetail,
  setShowDetail,
}) => {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full relative">
      {/* Card Container - Only Image */}
      <motion.div
        className="group relative overflow-hidden rounded-lg cursor-pointer aspect-video"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setShowDetail(id)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Image */}
        <Image
          src={image_path}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110 overflow-hidden"
        />

        {/* Gradient Overlay - Only on Hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Category Badge - Always Visible */}
        <motion.div
          className="absolute top-4 left-4"
          initial={{ opacity: 1 }}
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/30">
            {username}
          </span>
        </motion.div>

        {/* Hover Content */}
        <motion.div
          className="absolute inset-0 flex overflow-hidden flex-col items-center justify-center text-white p-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 30,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Eye Icon with Glossy Effect */}
          <motion.div
            className="relative"
            initial={{ scale: 0, rotate: -180 }}
            animate={{
              scale: isHovered ? 1 : 0,
              rotate: isHovered ? 0 : -180,
            }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: "easeOut",
            }}
          >
            <div className="relative bg-white/20 backdrop-blur-xl rounded-full p-2 border border-white/30 shadow-2xl">
              {/* Glossy Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-white/20 to-transparent rounded-full" />
              <div className="absolute top-1 left-1 w-3 h-3 bg-white/60 rounded-full blur-sm" />
              <LuEye className="w-4 h-4 relative z-10" />
            </div>
          </motion.div>

          {/* Title */}
          {/* <motion.h3
            className="text-xs font-bold text-center mb-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20,
            }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {title}
          </motion.h3> */}

          {/* Description */}
          <motion.p
            className="text-xs text-center text-gray-200 mb-2 max-w-xs leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20,
            }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {description}
          </motion.p>

          {/* Quick Action Buttons */}
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20,
            }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <motion.a
              href={github_url}
              target="_blank"
              className="flex items-center gap-2 px-1 py-0.5 bg-white/20 backdrop-blur-md rounded-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSquareGithub className="w-4 h-4" />
              <span className="text-sm font-medium">GitHub</span>
            </motion.a>

            {deployed_url ? (
              <motion.a
                href={deployed_url}
                target="_blank"
                className="flex items-center gap-2 px-1 py-0.5 bg-blue-500/80 backdrop-blur-md rounded-lg hover:bg-blue-600/80 transition-all duration-300 border border-blue-400/50"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LuLink className="w-4 h-4" />
                <span className="text-sm font-medium">Live</span>
              </motion.a>
            ) : (
              <div className="flex items-center gap-2 px-1 py-0.5 bg-gray-500/50 backdrop-blur-md rounded-lg border border-gray-400/30 opacity-60">
                <LuLink className="w-4 h-4" />
                <span className="text-sm font-medium">Soon</span>
              </div>
            )}
          </motion.div>

          {/* Tech Stack Preview */}
          {/* <motion.div
            className="flex gap-2 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20,
            }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            {key_techs.slice(0, 3).map((tech, index) => (
              <motion.span
                key={tech}
                className="px-1 py-0.5 bg-white/20 backdrop-blur-md text-xs rounded-md border border-white/20"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1 : 0,
                }}
                transition={{
                  duration: 0.3,
                  delay: 0.6 + index * 0.1,
                }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div> */}
        </motion.div>
      </motion.div>

      {showDetail === id && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 "
          onClick={() => setShowDetail(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-white dark:bg-slate-900 rounded-2xl max-w-6xl w-full max-h-[80vh] overflow-y-scroll md:overflow-hidden custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2 gap-8 p-8">
              {/* Image Section */}
              <div className="space-y-4">
                <div className="relative h-80 rounded-xl overflow-hidden">
                  <Image
                    src={image_path}
                    alt={title}
                    fill
                    className="object-fill"
                  />
                </div>

                <div className="flex gap-3">
                  <a
                    className="flex items-center justify-center gap-2 bg-gray-900 dark:bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-slate-600 transition-colors flex-1"
                    href={github_url}
                    target="_blank"
                  >
                    <FaSquareGithub />
                    <span>GitHub</span>
                  </a>
                  {deployed_url ? (
                    <a
                      className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex-1"
                      href={deployed_url}
                      target="_blank"
                    >
                      <LuLink />
                      <span>Live Demo</span>
                    </a>
                  ) : (
                    <div className="flex items-center justify-center gap-2 bg-gray-400 dark:bg-slate-600 text-gray-200 px-4 py-2 rounded-lg flex-1 opacity-60">
                      <LuLink />
                      <span>Coming Soon</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {title}
                  </h2>
                  {category.map((m) => (
                    <span
                      key={m}
                      className="px-3 py-1 mx-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm rounded-full"
                    >
                      {m}
                    </span>
                  ))}
                </div>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {description}
                </p>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {key_techs.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {references && (
                  <div>
                    <a
                      href={references}
                      className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
                      target="_blank"
                      title="Design Reference"
                    >
                      <FaLink />
                      Design Reference
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Close Button */}
            <button
              className="absolute right-4 top-4 p-2 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
              onClick={() => setShowDetail(null)}
            >
              <AiOutlineClose size={24} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectCard;
