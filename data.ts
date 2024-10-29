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
import { FiFramer } from "react-icons/fi";

export const services: IService[] = [
  {
    title: "Frontend Development",
    description:
      "I can create attractive user interface and client user websites using <b>ReactJS</b>, <b>NextJS</b>, and <b>TailwindCSS</b>.",
    Icon: FaCode,
  },
  {
    title: "BackEnd Development",
    description:
      "I can create efficient server side and database driven websites using  <b>NodeJS</b>, <b>ExpressJS</b>, <b>Laravel</b>, and <b>TypeScript</b>. which can be integrated with Front Development.",
    Icon: FaDatabase,
  },
  {
    title: "Resful API",
    description:
      "I can create Restful API using <b>NodeJS</b>, <b>ExpressJS</b>, <b>NextJs</b>, and <b>MongoDB</b>, <b>Firebase</b>.",
    Icon: AiOutlineApi,
  },
  {
    title: "Dicoding Indonesia",
    description:
      "Is one of the MSIB KAMPUS MERDEKA BATCH 5 platforms, following the program (MBKM) at that time, for 6 months (1 semester), I got a lot of experience.",
    image: dicoding,
  },
  {
    title: "IDCamp Indosat",
    description:
      "Is one of the platforms that I signed up for when I joined the Dicoding Indonesia MBKM, because of several mentors at Dicoding.",
    image: idcamp,
  },
  {
    title: "Kampus Merdeka",
    description:
      "It is a platform that provides innovations created by the Ministry of Education and Culture in order to produce graduates who are ready to face social, cultural changes.",
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
  {
    title: "Framer Motion",
    level: "75%",
    Icon: FiFramer,
  },
];

export const projects: IProject[] = [
  {
    id: 1,
    title: "JoRan (Jokes Random)",
    description: "A project using react js logic tools",
    image_path: "/images/projects/1.png",
    deployed_url: "https://jokes-random-v1.netlify.app/",
    github_url: "https://github.com/fmpangestu/Jokes-random",
    category: ["react"],
    key_techs: ["ReactJS", "TailwindCSS"],
  },
  {
    id: 2,
    title: "Todo App",
    description: "A React project with Todo Logic",
    image_path: "/images/projects/2.png",
    deployed_url: "https://todo-apps-v1.netlify.app/",
    github_url: "https://github.com/fmpangestu/Todo-app",
    category: ["react"],
    key_techs: ["ReactJS", "TailwindCSS"],
  },
  {
    id: 3,
    title: "Note Apps",
    description: "A React project with Note Logic",
    image_path: "/images/projects/3.png",
    deployed_url: "https://shooping-notesqu.netlify.app/",
    github_url: "https://github.com/fmpangestu/shopping-note",
    category: ["react"],
    key_techs: ["ReactJS", "TailwindCSS"],
  },
  {
    id: 4,
    title: "Wisata_ID",
    description: "A project team with react, express.js, which is very complex",
    image_path: "/images/projects/4.png",
    deployed_url: "https://wisataid.vercel.app/",
    github_url: "https://github.com/fmpangestu/wisataid",
    category: ["react", "node", "express", "mysql"],
    key_techs: ["ReactJS", "ExpressJS", "NodeJS", "MySQL"],
  },
  {
    id: 5,
    title: "Yok Ngopi",
    description: "A project that uses vanilla language, html css javascript",
    image_path: "/images/projects/5.png",
    deployed_url: "https://yokngopicuy.netlify.app/",
    github_url: "https://github.com/fmpangestu/restaurant_web",
    category: ["html", "css", "javascript"],
    key_techs: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: 6,
    title: "Web Chat Clone",
    description:
      "A project developed with MERN Stack, which can be used online",
    image_path: "/images/projects/6.png",
    github_url: "https://github.com/fmpangestu/chat-api-MERN",
    category: ["react", "node", "express", "mongodb"],
    key_techs: ["ReactJS", "ExpressJS", "NodeJS", "MongoDB"],
  },
  {
    id: 7,
    title: "Beasiswa Finder",
    description:
      "A project developed with laravel and also with MySQL. as project team",
    image_path: "/images/projects/7.png",
    github_url: "https://github.com/fmpangestu/beasiswa-finder",
    category: ["laravel", "mysql"],
    key_techs: ["Laravel", "MySQL"],
  },
  {
    id: 8,
    title: "Sistem Informasi Desa Sitemu",
    description:
      "A project developed with an attractive UI/UX, and also react js development, and some features that are prioritized.",
    image_path: "/images/projects/8.png",
    deployed_url: "https://sitemubersatu.com/",
    github_url: "https://github.com/fmpangestu/desa-sitemu",
    category: ["react", "node"],
    key_techs: ["ReactJS", "NodeJS", "tailwindCSS"],
  },
  {
    id: 9,
    title: "My Portfolio",
    description:
      "A personal portfolio project developed with ReactJS and TailwindCSS.",
    image_path: "/images/projects/9.png",
    deployed_url: "https://farhanmp.xyz",
    github_url: "https://github.com/fmpangestu/portfolioqu",
    category: ["react"],
    key_techs: ["ReactJS", "TailwindCSS"],
  },
  {
    id: 10,
    title: "Tabungan Sederhana",
    description: "A project developed with typescript logic.",
    image_path: "/images/projects/10.png",
    github_url: "https://github.com/fmpangestu/learn-ts",
    category: ["typescript", "html", "css"],
    key_techs: ["TypeScript", "CSS", "HTML"],
  },
  {
    id: 11,
    title: "Logika login credentials dan google dengan NextJs",
    description: "A project developed with NextJs and NextAuth.",
    image_path: "/images/projects/11.png",
    deployed_url: "https://my-app-next-fmp.vercel.app/",
    github_url: "https://github.com/fmpangestu/next-ts",
    category: ["nextJs", "typescript"],
    key_techs: ["NextJS", "TypeScript", "TailwindCss", "Firebase"],
  },
];

export const sertificats: ISertificate[] = [
  {
    id: 1,
    title: "Front End Web Development Expert",
    description: "Certificate of completion from Dicoding Indonesia",
    image_path: "/images/sertificate/1.png",
    sertificate_url: "https://www.dicoding.com/certificates/4EXG4MYEQPRL",
  },
  {
    id: 2,
    title: "Prinsip Dasar Pemrograman SOLID",
    description: "Certificate of completion from Dicoding Indonesia",
    image_path: "/images/sertificate/6.png",
    sertificate_url: "https://www.dicoding.com/certificates/QLZ9R9VGMP5D",
  },
  {
    id: 3,
    title: "Fundamental Front End Web",
    description: "Certificate of completion from Dicoding Indonesia",
    image_path: "/images/sertificate/3.png",
    sertificate_url: "https://www.dicoding.com/certificates/JLX1W2VKJP72",
  },
  {
    id: 4,
    title: "JavaScript Dasar",
    description: "Certificate of completion from Dicoding Indonesia",
    image_path: "/images/sertificate/4.png",
    sertificate_url: "https://www.dicoding.com/certificates/N9ZO5VYGDPG5",
  },
  {
    id: 5,
    title: "Application Back End Pemula",
    description: "Certificate of completion from Dicoding Indonesia",
    image_path: "/images/sertificate/7.png",
    sertificate_url: "https://www.dicoding.com/certificates/MRZM85L0KZYQ",
  },
];
