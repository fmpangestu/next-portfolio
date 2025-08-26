import { IService } from "@/type";
import Image from "next/image";
import { FunctionComponent } from "react";
import { useTranslation } from "next-i18next";

const ServiceCard: FunctionComponent<{ service: IService }> = ({
  service: { Icon, description, title, image },
}) => {
  const { t } = useTranslation("common");

  const translatedTitle = t(
    `services.${title.replace(/\s+/g, "")}Title`,
    title
  );
  const translatedDescription = t(
    `services.${title.replace(/\s+/g, "")}Description`,
    description
  );

  const markupHtml = () => {
    return {
      __html: translatedDescription,
    };
  };

  return (
    <div className="group relative rounded-xl bg-white dark:bg-slate-800 p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100 dark:border-slate-700 overflow-hidden h-full flex flex-col">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-transparent dark:from-sky-900/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Icon/Image in better position */}
      <div className="absolute -right-6 -top-6">
        {Icon && (
          <div className="relative">
            <div className="absolute inset-0 bg-sky-500/10 dark:bg-sky-400/10 rounded-full blur-2xl"></div>
            <Icon className="w-24 h-24 text-sky-500/20 dark:text-sky-400/20" />
          </div>
        )}
        {image && (
          <div className="relative">
            <div className="absolute inset-0 bg-sky-500/10 dark:bg-sky-400/10 rounded-full blur-2xl"></div>
            <Image
              src={image}
              alt=""
              className="object-cover w-24 h-24 rounded-full opacity-20"
              width={500}
              height={500}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1">
        <h4 className="font-bold text-lg mb-2 text-slate-800 dark:text-slate-200">
          {translatedTitle}
        </h4>
        <p
          className="text-sm text-slate-600 dark:text-slate-300"
          dangerouslySetInnerHTML={markupHtml()}
        />
      </div>
    </div>
  );
};

export default ServiceCard;
