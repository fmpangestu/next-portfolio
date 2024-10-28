import Link from "next/link";
import { usePathname } from "next/navigation";
import { FunctionComponent, useEffect, useState } from "react";

const NavItem: FunctionComponent<{
  activeItem: string;
  setActiveItem: (name: string) => void;
  name: string;
  route: string;
}> = ({ activeItem, name, route, setActiveItem }) => {
  return activeItem !== name ? (
    <Link href={route}>
      <p>
        <span
          onClick={() => setActiveItem(name)}
          className="font-semibold transition duration-300 hover:text-sky-950 dark:hover:text-slate-200"
        >
          {name}
        </span>
      </p>
    </Link>
  ) : null;
};

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("");
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/") setActiveItem("About");
    if (pathname === "/project") setActiveItem("Project");
    if (pathname === "/resume") setActiveItem("Resume");
    if (pathname === "/sertificate") setActiveItem("Sertificate");
  }, [pathname]);
  return (
    <div className="flex items-center justify-between px-5 py-2 my-2">
      <span className="text-xl font-bold border-b-2 dark:text-slate-200 text-sky-950 border-sky-600">
        {activeItem}
      </span>
      <div className="flex space-x-3 text-[1rem] text-slate-400">
        <NavItem
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          name="About"
          route="/"
        />
        <NavItem
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          name="Project"
          route="/project"
        />
        <NavItem
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          name="Resume"
          route="/resume"
        />
        <NavItem
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          name="Sertificate"
          route="/sertificate"
        />
      </div>
    </div>
  );
};

export default Navbar;
