import Bar from "@/components/Bar";
import { languages, tools } from "@/data";

/* eslint-disable react/no-unescaped-entities */
export default function Resume() {
  return (
    <div className="flex flex-col flex-grow px-6 py-2 ">
      <div className="grid gap-6 md:grid-cols-2 text-slate-800">
        <div className="">
          <h1 className="font-semibold">Education</h1>
          <h3 className="font-semibold">Informatics Engineering</h3>
          <h4 className="font-semibold">
            Universitas Alma ata (2021 - Sekarang)
          </h4>
          <p className="text-[.8rem]">
            Informatics Engineering study program at Alma Ata University who has
            a special interest and talent in technology, especially in Web
            Development.
          </p>
        </div>
        <div className="">
          <h1 className="font-semibold">Experience</h1>
          <h3 className="font-semibold">Internship</h3>
          <h4 className="text-[.8rem] font-semibold">
            PT. TECH ACADEMYINTERNATIONAL (2021 - Sekarang)
          </h4>
          <p>I interned as a Front End Engineering Website Developer </p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h6 className="my-3 text-xl font-bold tracking-wide">
            Language & Framework
          </h6>
          <div className="my-2">
            {languages.map((language) => (
              <Bar data={language} key={language.title} />
            ))}
          </div>
        </div>
        <div>
          <h6 className="my-3 text-xl font-bold tracking-wide">
            Tools & Software
          </h6>
          <div className="my-2 ">
            {tools.map((language) => (
              <Bar data={language} key={language.title} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
