"use client";
import { ISertificate } from "@/type";
import Image from "next/image";
import { FunctionComponent, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { LuLink } from "react-icons/lu";

const SertifCard: FunctionComponent<{ sertif: ISertificate }> = ({
  sertif: { title, description, image_path, sertificate_url },
}) => {
  const [mounted, setMounted] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div className=" ">
      <Image
        src={image_path}
        alt={title}
        width={500}
        height={500}
        className="cursor-pointer rounded-lg"
        onClick={() => setShowDetail(true)}
      />
      {showDetail && (
        <div className="grid md:grid-cols-2 p-2 absolute top-0 left-0 z-0 w-full h-auto gap-x-5 text-slate-900 dark:text-white  bg-white dark:bg-gradient-to-r dark:from-slate-950 dark:to-slate-800 rounded-xl ">
          <div className="">
            <Image
              src={image_path}
              alt={title}
              width={500}
              height={500}
              className="cursor-pointer rounded-xl border-4 border-sky-950 dark:border-slate-100"
            />
          </div>
          <div className=" flex flex-col gap-3">
            <h2 className="font-semibold text-xl">{title}</h2>
            <h5 className="text-sm">{description}</h5>
            <div className="flex gap-3">
              <a
                className="flex space-x-3 items-center justify-center dark:bg-slate-800 bg-slate-300 px-2 py-1 rounded-lg "
                href={sertificate_url}
                target="blank"
              >
                <LuLink />
                <span>Visit Sertificate</span>
              </a>
            </div>
          </div>
          <button
            className="absolute right-4 top-3 focus:outline-none rounded-full p-1 bg-slate-900 dark:bg-slate-100 text-slate-100 dark:text-slate-900"
            onClick={() => setShowDetail(false)}
          >
            <AiOutlineClose size={30} />
          </button>
        </div>
      )}
    </div>
  );
};
export default SertifCard;
