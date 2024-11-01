import { Category } from "@/type";
import { FunctionComponent } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/animate";
export const NavItem: FunctionComponent<{
  value: Category | "all";
  handlerFilterCategory: (category: Category | "all") => void;
  active: string;
}> = ({ value, handlerFilterCategory, active }) => {
  let className =
    "capitalize hover:text-sky-800 transition duration-500 cursor-pointer";
  if (active === value) className += " text-sky-800";
  return (
    <li className={className} onClick={() => handlerFilterCategory(value)}>
      {value}
    </li>
  );
};

export const ProjectNavbar: FunctionComponent<{
  handlerFilterCategory: (category: Category | "all") => void;
  active: string;
}> = (props) => {
  return (
    <motion.div
      variants={fadeUp}
      initial="initial"
      animate="animate"
      className="flex space-x-3 px-3 py-2 list-none overflow-x-auto custom-scrollbar"
    >
      <NavItem value="all" {...props} />
      <NavItem value="react" {...props} />
      <NavItem value="laravel" {...props} />
      <NavItem value="express" {...props} />
      <NavItem value="nextJs" {...props} />
      <NavItem value="typescript" {...props} />
      <NavItem value="mongodb" {...props} />
      <NavItem value="javascript" {...props} />
    </motion.div>
  );
};
