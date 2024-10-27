import { IService } from "@/type";
import Image from "next/image";
import { FunctionComponent } from "react";

const ServiceCard: FunctionComponent<{ service: IService }> = ({
  service: { Icon, description, title, image },
}) => {
  const markupHtml = () => {
    return {
      __html: description,
    };
  };
  return (
    <div className="flex items-center p-2 space-x-4 text-black dark:text-slate-200">
      {Icon && <Icon className="w-20 h-20 text-sky-700 dark:text-sky-400" />}
      {image && (
        <Image
          src={image}
          alt=""
          className="object-cover w-12 h-12 rounded-lg "
          width={500}
          height={500}
        />
      )}
      <div className="">
        <h4 className="font-bold">{title}</h4>
        <p className="text-sm" dangerouslySetInnerHTML={markupHtml()} />
      </div>
    </div>
  );
};
export default ServiceCard;
