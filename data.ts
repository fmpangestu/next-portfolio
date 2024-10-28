import { AiOutlineApi } from "react-icons/ai";
import { IProject, ISertificate, IService, ISkill } from "./type";
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
// import project1 from "@/public/images/projects/1.png";
// import project2 from "@/public/images/projects/2.png";
// import project3 from "@/public/images/projects/3.png";
// import project4 from "@/public/images/projects/4.png";
// import project5 from "@/public/images/projects/5.png";
// import project6 from "@/public/images/projects/6.png";
// import project7 from "@/public/images/projects/7.png";
// import project8 from "@/public/images/projects/8.png";

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

export const projects: IProject[] = [
  {
    title: "JoRan (Jokes Random)",
    description: "Sebuah project menggunakan tools logika react js",
    image_path: "/images/projects/1.png",
    deployed_url: "https://jokes-random-v1.netlify.app/",
    github_url: "https://github.com/fmpangestu/Jokes-random",
    category: ["react"],
    key_techs: ["ReactJS", "TailwindCSS"],
  },
  {
    title: "Todo App",
    description: "Sebuah project React dengan Logika Todo",
    image_path: "/images/projects/2.png",
    deployed_url: "https://todo-apps-v1.netlify.app/",
    github_url: "https://github.com/fmpangestu/Todo-app",
    category: ["react"],
    key_techs: ["ReactJS", "TailwindCSS"],
  },
  {
    title: "Note Apps",
    description: "Sebuah project React dengan Logika Note",
    image_path: "/images/projects/3.png",
    deployed_url: "https://shooping-notesqu.netlify.app/",
    github_url: "https://github.com/fmpangestu/shopping-note",
    category: ["react"],
    key_techs: ["ReactJS", "TailwindCSS"],
  },
  {
    title: "Wisata_ID",
    description:
      "Sebuah project team dengan react,express.js, yang sangat kompleks",
    image_path: "/images/projects/4.png",
    deployed_url: "https://wisataid.vercel.app/",
    github_url: "https://github.com/fmpangestu/wisataid",
    category: ["react", "node", "express", "mysql"],
    key_techs: ["ReactJS", "ExpressJS", "NodeJS", "MySQL"],
  },
  {
    title: "Yok Ngopi",
    description:
      "Sebuah project yang menggunakan vanila language,html css javascript",
    image_path: "/images/projects/5.png",
    deployed_url: "https://yokngopicuy.netlify.app/",
    github_url: "https://github.com/fmpangestu/restaurant_web",
    category: ["html", "css", "javascript"],
    key_techs: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Web Chat Clone",
    description:
      "Sebuah project yang di kembangkan dengan MERN Stack, yang bisa digunakan secara online",
    image_path: "/images/projects/6.png",
    github_url: "https://github.com/fmpangestu/chat-api-MERN",
    category: ["react", "node", "express", "mongodb"],
    key_techs: ["ReactJS", "ExpressJS", "NodeJS", "MongoDB"],
  },
  {
    title: "Beasiswa Finder",
    description:
      "Sebuah project yang di kembangkan dengan laravel dan juga dengan MySQL. sebagai project team",
    image_path: "/images/projects/7.png",
    github_url: "https://github.com/fmpangestu/beasiswa-finder",
    category: ["laravel", "mysql"],
    key_techs: ["Laravel", "MySQL"],
  },
  {
    title: "Sistem Informasi Desa Sitemu",
    description:
      "Sebuah project yang di kembangkan dengan UI/UX yang menarik, dan juga pengembangan react js, dan beberapa fitur yang di utamakan",
    image_path: "/images/projects/8.png",
    deployed_url: "https://sitemubersatu.com/",
    github_url: "https://github.com/fmpangestu/desa-sitemu",
    category: ["react", "node"],
    key_techs: ["ReactJS", "NodeJS", "tailwindCSS"],
  },
  {
    title: "My Portfolio",
    description:
      "Sebuah project portfolio pribadi yang di kembangkan dengan ReactJS dan TailwindCSS,",
    image_path: "/images/projects/9.png",
    deployed_url: "https://farhanmp.xyz",
    github_url: "https://github.com/fmpangestu/portfolioqu",
    category: ["react"],
    key_techs: ["ReactJS", "TailwindCSS"],
  },
  {
    title: "Tabungan Sederhana",
    description: "Sebuah project yang di kembangkan dengan typescript logika",
    image_path: "/images/projects/10.png",
    github_url: "https://github.com/fmpangestu/learn-ts",
    category: ["typescript", "html", "css"],
    key_techs: ["TypeScript", "CSS", "HTML"],
  },
  {
    title: "Logika login credentials dan google dengan NextJs",
    description:
      "Sebuah project yang di kembangkan dengan NextJs dan juga NextAuth",
    image_path: "/images/projects/11.png",
    deployed_url: "https://my-app-next-fmp.vercel.app/",
    github_url: "https://github.com/fmpangestu/next-ts",
    category: ["nextJs", "typescript"],
    key_techs: ["NextJS", "TypeScript", "TailwindCss", "Firebase"],
  },
];

export const sertificats: ISertificate[] = [
  {
    title: "Front End Web Development Expert",
    description: "Sertifikat kelulusan dari Dicoding Indonesia",
    image_path: "/images/sertificate/1.png",
    sertificate_url: "https://www.dicoding.com/certificates/4EXG4MYEQPRL",
  },
  {
    title: "Prinsip Dasar Pemrograman SOLID",
    description: "Sertifikat kelulusan dari Dicoding Indonesia",
    image_path: "/images/sertificate/6.png",
    sertificate_url: "https://www.dicoding.com/certificates/QLZ9R9VGMP5D",
  },
  {
    title: "Fundamental Front End Web",
    description: "Sertifikat kelulusan dari Dicoding Indonesia",
    image_path: "/images/sertificate/3.png",
    sertificate_url: "https://www.dicoding.com/certificates/JLX1W2VKJP72",
  },
  {
    title: "JavaScript Dasar",
    description: "Sertifikat kelulusan dari Dicoding Indonesia",
    image_path: "/images/sertificate/4.png",
    sertificate_url: "https://www.dicoding.com/certificates/N9ZO5VYGDPG5",
  },
  {
    title: "Application Back End Pemula",
    description: "Sertifikate kelulusan dari Dicoding Indonesia",
    image_path: "/images/sertificate/7.png",
    sertificate_url: "https://www.dicoding.com/certificates/MRZM85L0KZYQ",
  },
];
