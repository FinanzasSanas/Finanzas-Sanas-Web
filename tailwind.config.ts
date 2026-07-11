import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#001527",
          dark: "#000E1C",
        },
        forest: "#0A3428",
        gold: {
          DEFAULT: "#BD8B40",
          dark: "#9C7132",
          light: "#C79A4B",
        },
        sage: "#6FA184",
        cream: "#F4F2EF",
        mist: "#E5E9E4",
        ink: {
          DEFAULT: "#14212E",
          soft: "#5A6570",
        },
      },
      fontFamily: {
        serif: ["var(--font-lora)", "Georgia", "serif"],
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
