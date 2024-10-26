import { ISkill } from "@/type";
import { FunctionComponent } from "react";

const Bar: FunctionComponent<{ data: ISkill }> = ({
  data: { title, level, Icon },
}) => {
  return (
    <div className="my-2 text-white bg-gray-300 rounded-full">
      <div
        className="flex items-center px-4 py-1 rounded-full bg-gradient-to-r from-blues to-sky-700"
        style={{ width: level }}
      >
        {Icon && <Icon className="w-5 h-5 mr-2" />}
        {title}
      </div>
    </div>
  );
};

export default Bar;
