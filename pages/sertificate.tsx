import SertifCard from "@/components/SertifCard";
import { sertificats } from "@/data";

const sertificate = () => {
  return (
    <div
      className="px-5 py-2 overflow-y-scroll custom-scrollbar "
      style={{ height: "65vh" }}
    >
      <h1>Sertifikat dan Licensi</h1>
      <div className="grid grid-cols-12 gap-4 my-2 2xl:mt-1 relative">
        {sertificats.map((sertif) => (
          <div
            className="col-span-12 sm:col-span-6 lg:col-span-4 bg-gray-300 rounded-lg dark:bg-slate-950"
            key={sertif.title}
          >
            <SertifCard sertif={sertif} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default sertificate;
