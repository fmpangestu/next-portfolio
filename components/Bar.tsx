import { ISkill } from "@/type";
import { FunctionComponent } from "react";
import { motion } from "framer-motion";

const Bar: FunctionComponent<{ data: ISkill }> = ({
  data: { title, level, Icon },
}) => {
  const bar_width = `${level}`;
  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: bar_width,
      transition: {
        duration: 0.4,
        type: "spring",
        damping: 10,
        stiffness: 100,
      },
    },
  };
  return (
    <div className="my-2 text-white bg-gray-300 dark:bg-slate-950 rounded-full">
      <motion.div
        className="flex items-center px-4 py-1 rounded-full bg-gradient-to-r from-blues to-sky-700 dark:from-slate-950 dark:to-blues"
        style={{ width: bar_width }}
        variants={variants}
        initial="initial"
        animate="animate"
      >
        {Icon && <Icon className="w-5 h-5 mr-2" />}
        {title}
      </motion.div>
    </div>
  );
};

export default Bar;
