import { AiOutlineApi } from "react-icons/ai";
import { IService, ISkill } from "./type";
import {
  FaCode,
  FaDatabase,
  FaGitAlt,
  FaJsSquare,
  FaLaravel,
  FaNodeJs,
  FaPhp,
  FaReact,
} from "react-icons/fa";
import dicoding from "@/public/images/experience/dicoding1.jpeg";
import idcamp from "@/public/images/experience/idcamp.png";
import kampus from "@/public/images/experience/kampusmerdeka.png";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { SiExpress, SiNotion, SiPostman, SiTypescript } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { FaSquareGithub } from "react-icons/fa6";
import { CgFigma } from "react-icons/cg";

export const services: IService[] = [
  {
    title: "Frontend Development",
    description:
      "Saya dapat Membuat Website pada user interface dan client user yang menarik dengan menggunakan <b>ReactJS</b>, <b>NextJS</b>, dan <b>TailwindCSS</b>.",
    Icon: FaCode,
  },
  {
    title: "BackEnd Development",
    description:
      "Saya dapat Membuat Website pada server side dan database yang efisien dengan menggunakan <b>NodeJS</b>, <b>ExpressJS</b>, <b>Laravel</b>, dan <b>TypeScript</b>. yang dapat diintegrasikan dengan Frontend Development.",
    Icon: FaDatabase,
  },
  {
    title: "Resful API",
    description:
      "Saya dapat membuat Restful API dengan menggunakan <b>NodeJS</b>, <b>ExpressJS</b>, <b>NextJs</b>, dan <b>MongoDB</b>, <b>Firebase</b>.",
    Icon: AiOutlineApi,
  },
  {
    title: "Dicoding Indonesia",
    description:
      "Adalah salah satu platform MSIB KAMPUS MERDEKA BATCH 5,mengikuti program (MBKM) pada waktu itu, selama 6 bulan(1 semester), banyak sekali pengalaman yang saya dapatkan.",
    image: dicoding,
  },
  {
    title: "IDCamp Indosat",
    description:
      "Adalah salah satu platform yang saya ikut daftar ketika saya mengikuti MBKM Dicoding Indonesia,karena dari beberapa mentor di Dicoding.",
    image: idcamp,
  },
  {
    title: "Kampus Merdeka",
    description:
      "Adalah platform yang memberikan inovasi yang dibuat oleh Kemendikbud agar dapat menghasilkan lulusan yang siap menghadapi perubahan sosial, budaya. ",
    image: kampus,
  },
];

export const languages: ISkill[] = [
  {
    title: "ReactJS",
    level: "85%",
    Icon: FaReact,
  },
  {
    title: "NextJS",
    level: "70%",
    Icon: RiNextjsFill,
  },
  {
    title: "TailwindCSS",
    level: "85%",
    Icon: RiTailwindCssFill,
  },
  {
    title: "NodeJS",
    level: "80%",
    Icon: FaNodeJs,
  },
  {
    title: "ExpressJS",
    level: "65%",
    Icon: SiExpress,
  },
  {
    title: "Laravel",
    level: "60%",
    Icon: FaLaravel,
  },
  {
    title: "TypeScript",
    level: "70%",
    Icon: SiTypescript,
  },
  {
    title: "JavaScript",
    level: "85%",
    Icon: FaJsSquare,
  },
  {
    title: "PHP",
    level: "60%",
    Icon: FaPhp,
  },
];

export const tools: ISkill[] = [
  {
    title: "Visual Studio Code",
    level: "95%",
    Icon: VscVscode,
  },
  {
    title: "Postman",
    level: "80%",
    Icon: SiPostman,
  },
  {
    title: "Git",
    level: "90%",
    Icon: FaGitAlt,
  },
  {
    title: "Github",
    level: "90%",
    Icon: FaSquareGithub,
  },
  {
    title: "Figma",
    level: "70%",
    Icon: CgFigma,
  },
  {
    title: "Notion",
    level: "70%",
    Icon: SiNotion,
  },
];
