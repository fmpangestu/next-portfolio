import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      kaushan: ["Kaushan Script"],
    },
    boxShadow: {
      "custom-light": "0 0 10px #313131",
      "custom-dark": "5px 5px 10px #020617, -5px -5px 10px #020617",
    },
    extend: {
      colors: {
        blues: {
          DEFAULT: "#172554",
        },
      },
    },
    variants: {
      extend: {
        boxShadow: ["dark"],
      },
    },
  },
  plugins: [],
};
export default config;
