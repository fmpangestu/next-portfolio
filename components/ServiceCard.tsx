import { IService } from "@/type";
import Image from "next/image";
import { FunctionComponent } from "react";
import { useTranslation } from "next-i18next"; // Tambahkan ini

const ServiceCard: FunctionComponent<{ service: IService }> = ({
  service: { Icon, description, title, image },
}) => {
  const { t } = useTranslation("common"); // Tambahkan hook useTranslation

  // Fungsi untuk menerjemahkan judul dan deskripsi
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
        <h4 className="font-bold">{translatedTitle}</h4>
        <p className="text-sm" dangerouslySetInnerHTML={markupHtml()} />
      </div>
    </div>
  );
};

export default ServiceCard;
