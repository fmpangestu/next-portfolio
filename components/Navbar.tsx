import { CodeXml, DollarSign, FileUser, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FunctionComponent, useEffect, useState } from "react";
import { GrCertificate } from "react-icons/gr";
import PricingModal from "./PricingModal";
import { useTranslation } from "next-i18next";

const NavItem: FunctionComponent<{
  activeItem?: string;
  setActiveItem: (name: string) => void;
  name: string;
  route: string;
  className?: string;
  icons?: JSX.Element;
  isModal?: boolean;
  onClick?: () => void;
}> = ({
  activeItem,
  name,
  route,
  setActiveItem,
  className,
  icons,
  isModal,
  onClick,
}) => {
  const { t } = useTranslation("common");
  // Jika isModal true, render sebagai button dengan corner brackets di luar
  const translatedName = t(name.toLowerCase());
  if (isModal) {
    return (
      <div className="relative p-0.5">
        {/* Corner Brackets - DI LUAR BUTTON */}
        {/* Top Left */}
        <div className="absolute -top-0.5 -left-1 w-4 h-3 border-l-2 border-t-2 dark:border-white dark:group-hover:border-white border-blue-400 group-hover:border-blue-300 transition-colors duration-300"></div>

        {/* Bottom Right */}
        <div className="absolute -bottom-0.5 -right-1 w-4 h-3 border-r-2 border-b-2 dark:border-white dark:group-hover:border-white border-blue-400 group-hover:border-blue-300 transition-colors duration-300"></div>

        <button
          onClick={onClick}
          className={`${className} group overflow-hidden transition-all duration-700 ease-in-out w-8 hover:w-20 relative z-10`}
        >
          <div className="flex items-center justify-start whitespace-nowrap">
            {icons && <span className="flex-shrink-0 min-w-4">{icons}</span>}
            <span className="ml-2">{t("pricings")}</span>
          </div>
        </button>
      </div>
    );
  }

  // Jika bukan modal, render sebagai Link biasa
  return activeItem !== name ? (
    <Link href={route} className={className}>
      <p className="flex items-center justify-center text-center">
        {icons && <span className="mr-1">{icons}</span>}
        <span
          onClick={() => setActiveItem(name)}
          className="transition duration-300 text-sm sm:text-base hover:text-sky-950 dark:hover:text-slate-200"
        >
          {translatedName}
        </span>
      </p>
    </Link>
  ) : null;
};

const Navbar = () => {
  const { t } = useTranslation("common");
  const [activeItem, setActiveItem] = useState("");
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const pathname = usePathname();
  const translatedActiveItem = activeItem ? t(activeItem.toLowerCase()) : "";
  useEffect(() => {
    if (pathname === "/") setActiveItem("About");
    if (pathname === "/projects") setActiveItem("Projects");
    if (pathname === "/resume") setActiveItem("Resume");
    if (pathname === "/certificates") setActiveItem("Certificates");
  }, [pathname]);

  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 my-2">
        {/* Pricing sebagai modal button dengan corner brackets */}
        <div className="flex justify-center items-center space-x-4">
          <NavItem
            setActiveItem={setActiveItem}
            className="hidden sm:block dark:bg-blue-950 bg-blue-950 text-white font-medium py-1 px-2 rounded-md shadow text-sm hover:shadow-lg"
            name="Pricing"
            route="/"
            icons={<DollarSign className="w-4 h-4" />}
            isModal={true}
            onClick={() => setIsPricingModalOpen(true)}
          />
          <span className="text-sm sm:text-xl font-bold border-b-2 dark:text-slate-200 text-sky-950 border-sky-600">
            {translatedActiveItem}
          </span>
        </div>

        <div
          className="
                    relative flex items-center gap-3 text-[5px] md:text-[1rem]
                   px-1 py-1.5 md:px-3 md:py-2 rounded-md
                    text-slate-900
                    dark:text-slate-400
                    bg-white/10 dark:bg-slate-900/30
                    backdrop-blur-xl backdrop-saturate-150
                    ring-1 ring-white/20 dark:ring-white/10
                    shadow-lg shadow-black/10

                    /* fallback kalau browser belum support backdrop-filter */
                    supports-[backdrop-filter:blur(0px)]:bg-white/10
                    supports-[backdrop-filter:blur(0px)]:backdrop-blur-2xl

                    /* highlight tipis ala iOS */
                    before:pointer-events-none before:absolute before:inset-0 before:rounded-xl
                    before:bg-gradient-to-b before:from-white/60 before:to-white/5 before:opacity-[0.06]
                  "
        >
          <NavItem
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            name="About"
            icons={<LayoutGrid className="h-2.5 w-2.5 sm:w-4 sm:h-4" />}
            route="/"
          />
          <NavItem
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            name="Projects"
            route="/projects"
            icons={<CodeXml className="h-2.5 w-2.5 sm:w-4 sm:h-4" />}
          />
          <NavItem
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            name="Resume"
            route="/resume"
            icons={<FileUser className="h-2.5 w-2.5 sm:w-4 sm:h-4" />}
          />
          <NavItem
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            name="Certificates"
            route="/certificates"
            icons={<GrCertificate className="h-2.5 w-2.5 sm:w-4 sm:h-4" />}
          />
        </div>
      </div>

      {/* Pricing Modal */}
      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
