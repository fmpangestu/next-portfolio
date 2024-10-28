import ProjectCard from "@/components/CardProject";
import { ProjectNavbar } from "@/components/ProjectNavbar";
import { projects as projectsData } from "@/data";
import { Category } from "@/type";
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, routeAnimate, stagger } from "@/animate";
export default function ProjectPage() {
  const [projects, setProjects] = useState(projectsData);
  const [active, setActive] = useState("all");
  const [showDetail, setShowDetail] = useState<number | null>(null);

  const handlerFilterCategory = (category: Category | "all") => {
    if (category === "all") {
      setProjects(projectsData);
      setActive(category);
      return;
    }

    const newArray = projectsData.filter((project) =>
      project.category.includes(category)
    );
    setProjects(newArray);
    setActive(category);
  };
  return (
    <motion.div
      variants={routeAnimate}
      initial="initial"
      animate="animate"
      exit="exit"
      className="px-5 py-2 overflow-y-scroll custom-scrollbar "
      style={{ height: "65vh" }}
    >
      <ProjectNavbar
        handlerFilterCategory={handlerFilterCategory}
        active={active}
      />
      <motion.div
        variants={stagger}
        animate="animate"
        initial="initial"
        className="grid grid-cols-12 gap-4 my-2 2xl:mt-1 relative"
      >
        {projects.map((project) => (
          <motion.div
            variants={fadeUp}
            key={project.title}
            className="col-span-12 sm:col-span-6 lg:col-span-4 bg-gray-300 rounded-lg dark:bg-slate-950"
          >
            <ProjectCard
              project={project}
              showDetail={showDetail}
              setShowDetail={setShowDetail}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
