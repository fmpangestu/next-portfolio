/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import { GetServerSidePropsContext, GetStaticPropsContext } from "next";
import ServiceCard from "@/components/ServiceCard";
import { services } from "../data";
import { motion } from "framer-motion";
import { fadeUp, routeAnimate, stagger } from "@/animate";
// import Image from "next/image";
// import { IService } from "../type";
// { services }: { services: IService[] }
export default function Home() {
  return (
    <motion.div
      variants={routeAnimate}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col flex-grow px-6 pt-1  overflow-y-scroll custom-scrollbar"
      style={{ height: "65vh" }}
    >
      <motion.h5
        variants={fadeUp}
        initial="initial"
        animate="animate"
        className="font-medium"
      >
        Hello, I'm Farhan Maulana Pangestu, a Front End Developer, and I'm
        Student Universitas Alma Ata. I'm developer web applications. I have
        experience with programming languages React, Next.js, Node.js, Laravel,
        Express.js, and MongoDB. I'm currently looking for a job as a Fullstack
        Developer.
      </motion.h5>
      <div
        className="flex-grow p-4 mt-2 bg-gray-200 dark:bg-slate-950"
        style={{ marginLeft: "-1.5rem", marginRight: "-1.5rem" }}
      >
        <h6 className="my-3 text-xl font-bold tracking-wide">
          Skill and Experience
        </h6>
        <motion.div
          variants={stagger}
          animate="animate"
          initial="initial"
          className="grid gap-6 md:grid-cols-2 "
        >
          {services.map((service) => (
            <motion.div
              variants={fadeUp}
              key={service.title}
              className={`bg-slate-100 dark:bg-slate-900 rounded-xl`}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
//? server side props
// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const res = await fetch("http://localhost:3000/api/services");
//   const data = await res.json();
//   console.log("server", services);
//   return {
//     props: {
//       services: data.services,
//     },
//   };
// };
//? static props
// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   const res = await fetch("http://localhost:3000/api/services");
//   const data = await res.json();
//   console.log("server", services);
//   return {
//     props: {
//       services: data.services,
//     },
//   };
// };

{
  /* <div className="grid items-center justify-center w-full grid-cols-4 sm:grid-cols-6 md:grid-cols-10 2xl:flex 2xl:mt-7">
                <a
                  href="https://reactjs.org/docs/getting-started.html"
                  target="_blank"
                  className="py-4 mx-auto transition duration-500 lg:grayscale lg:opacity-60 hover:grayscale-0 hover:opacity-100 "
                  rel="noreferrer"
                >
                  <Image
                    src="https://skillicons.dev/icons?i=react"
                    alt="React skill"
                    width={50}
                    height={50}
                  />
                </a>
                <a
                  href="https://expressjs.com/en/starter/installing.html"
                  target="_blank"
                  className="py-4 mx-auto transition duration-500 lg:grayscale lg:opacity-60 hover:grayscale-0 hover:opacity-100 "
                  rel="noreferrer"
                >
                  <Image
                    src="https://skillicons.dev/icons?i=express"
                    alt="Express skill"
                    width={50}
                    height={50}
                  />
                </a>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
                  target="_blank"
                  className="py-4 mx-auto transition duration-500 lg:grayscale lg:opacity-60 hover:grayscale-0 hover:opacity-100 "
                  rel="noreferrer"
                >
                  <Image
                    src="https://skillicons.dev/icons?i=javascript"
                    alt="JavaScript skill"
                    width={50}
                    height={50}
                  />
                </a>
                <a
                  href="https://nodejs.org/en/docs/"
                  target="_blank"
                  className="py-4 mx-auto transition duration-500 lg:grayscale lg:opacity-60 hover:grayscale-0 hover:opacity-100 "
                  rel="noreferrer"
                >
                  <Image
                    src="https://skillicons.dev/icons?i=nodejs"
                    alt="Node.js skill"
                    width={50}
                    height={50}
                  />
                </a>
                <a
                  href="https://www.php.net/docs.php"
                  target="_blank"
                  className="py-4 mx-auto transition duration-500 lg:grayscale lg:opacity-60 hover:grayscale-0 hover:opacity-100 "
                  rel="noreferrer"
                >
                  <Image
                    src="https://skillicons.dev/icons?i=php"
                    alt="PHP skill"
                    width={50}
                    height={50}
                  />
                </a>
                <a
                  href="https://laravel.com/docs"
                  target="_blank"
                  className="py-4 mx-auto transition duration-500 lg:grayscale lg:opacity-60 hover:grayscale-0 hover:opacity-100 "
                  rel="noreferrer"
                >
                  <Image
                    src="https://skillicons.dev/icons?i=laravel"
                    alt="Laravel skill"
                    width={50}
                    height={50}
                  />
                </a>
                <a
                  href="https://tailwindcss.com/docs"
                  target="_blank"
                  className="py-4 mx-auto transition duration-500 lg:grayscale lg:opacity-60 hover:grayscale-0 hover:opacity-100 "
                  rel="noreferrer"
                >
                  <Image
                    src="https://skillicons.dev/icons?i=tailwind"
                    alt="Tailwind CSS skill"
                    width={50}
                    height={50}
                  />
                </a>
                <a
                  href="https://docs.mongodb.com/"
                  target="_blank"
                  className="py-4 mx-auto transition duration-500 lg:grayscale lg:opacity-60 hover:grayscale-0 hover:opacity-100 "
                  rel="noreferrer"
                >
                  <Image
                    src="https://skillicons.dev/icons?i=mongodb"
                    alt="MongoDB skill"
                    width={50}
                    height={50}
                  />
                </a>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/HTML"
                  target="_blank"
                  className="py-4 mx-auto transition duration-500 lg:grayscale lg:opacity-60 hover:grayscale-0 hover:opacity-100 "
                  rel="noreferrer"
                >
                  <Image
                    src="https://skillicons.dev/icons?i=html"
                    alt="HTML skill"
                    width={50}
                    height={50}
                  />
                </a>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/CSS"
                  target="_blank"
                  className="py-4 mx-auto transition duration-500 lg:grayscale lg:opacity-60 hover:grayscale-0 hover:opacity-100 "
                  rel="noreferrer"
                >
                  <Image
                    src="https://skillicons.dev/icons?i=css"
                    alt="CSS skill"
                    width={50}
                    height={50}
                  />
                </a>
                <a
                  href="https://nextjs.org/"
                  target="_blank"
                  className="py-4 mx-auto transition duration-500 lg:grayscale lg:opacity-60 hover:grayscale-0 hover:opacity-100 "
                  rel="noreferrer"
                >
                  <Image
                    src="https://skillicons.dev/icons?i=nextjs"
                    alt="NextJS"
                    width={50}
                    height={50}
                  />
                </a>
                <a
                  href="https://www.typescriptlang.org/"
                  target="_blank"
                  className="py-4 mx-auto transition duration-500 lg:grayscale lg:opacity-60 hover:grayscale-0 hover:opacity-100 "
                  rel="noreferrer"
                >
                  <Image
                    src="https://skillicons.dev/icons?i=typescript"
                    alt="TypeScript"
                    width={50}
                    height={50}
                  />
                </a>
              </div> */
}
