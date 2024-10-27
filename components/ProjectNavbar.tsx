import { Category } from "@/type";
import { FunctionComponent } from "react";

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
    <div className="flex space-x-3 px-3 py-2 list-none overflow-x-auto">
      <NavItem value="all" {...props} />
      <NavItem value="react" {...props} />
      <NavItem value="laravel" {...props} />
      <NavItem value="express" {...props} />
      <NavItem value="nextJs" {...props} />
      <NavItem value="typescript" {...props} />
      <NavItem value="mongodb" {...props} />
      <NavItem value="javascript" {...props} />
    </div>
  );
};
