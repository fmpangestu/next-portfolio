import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import english from "@/public/united-kingdom.png";
import indonesia from "@/public/indonesia.png";
import Image from "next/image";
const LanguageSwitcher = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLocale = router.locale || "en";

  // Tutup dropdown ketika klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Konfigurasi bahasa
  const languages = {
    en: { name: "English", flag: english },
    id: { name: "Indonesia", flag: indonesia },
  };

  return (
    <div
      className="fixed top-1 md:top-3 right-4 z-50 shadow-custom-light dark:shadow-custom-dark rounded-md"
      ref={dropdownRef}
    >
      <button
        className="flex items-center justify-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 rounded-md shadow-md hover:shadow-lg transition-all duration-300 dark:text-white"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Ubah bahasa"
      >
        <div className="w-4 h-4 relative">
          <Image
            src={languages[currentLocale as keyof typeof languages].flag}
            alt={`${currentLocale} flag`}
            fill
            sizes="24px"
            style={{ objectFit: "cover" }}
          />
        </div>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-md shadow-lg overflow-hidden">
          {Object.entries(languages).map(([locale, { name, flag }]) => (
            <Link
              href={router.asPath}
              locale={locale}
              key={locale}
              className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 ${
                locale === currentLocale ? "bg-gray-100 dark:bg-slate-700" : ""
              } dark:text-white`}
              onClick={() => setIsOpen(false)}
            >
              <div className="w-4 h-4 relative">
                <Image
                  src={flag}
                  alt={`${locale} flag`}
                  fill
                  sizes="24px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <span>{name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
