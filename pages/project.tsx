import ProjectCard from "@/components/CardProject";
import { ProjectNavbar } from "@/components/ProjectNavbar";
import { projects as projectsData } from "@/data";
import { Category } from "@/type";
import { useState } from "react";

export default function Project() {
  const [projects, setProjects] = useState(projectsData);
  const [active, setActive] = useState("all");

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
    <div
      className="px-5 py-2 overflow-y-scroll custom-scrollbar "
      style={{ height: "65vh" }}
    >
      <ProjectNavbar
        handlerFilterCategory={handlerFilterCategory}
        active={active}
      />
      <div className="grid grid-cols-12 gap-4 my-2 2xl:mt-1 relative">
        {projects.map((project) => (
          <div
            key={project.title}
            className="col-span-12 sm:col-span-6 lg:col-span-4 bg-gray-300 rounded-lg dark:bg-slate-950"
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}
