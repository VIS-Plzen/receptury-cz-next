import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");
// import default tailwind colors
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Overriding theme
    screens: {
      sm: "576px",
      md: "768px",
      lg: "960px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: colors.white,
      black: colors.black,
      gray: colors.stone,
      "dark-purple": "#541348", // used for logo (footer)
      primary: {
        DEFAULT: "#ED7002", // 500
        50: "#FEF8F0",
        100: "#FDECD8",
        200: "#FAD5B2",
        300: "#F6B87E",
        400: "#FD9235",
        500: "#ED7002",
        600: "#DE5A02",
        700: "#C14406",
        800: "#A4380A",
        900: "#7D2E12",
        950: "#431407",
      },
      bonduelle: {
        DEFAULT: colors.lime[500],
        ...colors.lime,
      },
      bidfood: {
        DEFAULT: colors.emerald[500],
        ...colors.emerald,
      },
      secondary: {
        DEFAULT: colors.sky[500],
        ...colors.sky,
      },
      success: {
        DEFAULT: colors.green[500],
        ...colors.green,
      },
      warning: {
        DEFAULT: colors.yellow[500],
        ...colors.yellow,
      },
      error: {
        DEFAULT: colors.red[500],
        ...colors.red,
      },
      healthy: {
        DEFAULT: colors.green[500],
        ...colors.green,
      },
    },
    fontFamily: {
      sans: ["var(--font-nunito)", ...defaultTheme.fontFamily.sans],
    },

    // Extending theme
    extend: {
      opacity: {
        2.5: "0.025",
        7.5: "0.075",
        15: "0.15",
        35: "0.35",
        45: "0.45",
        55: "0.55",
        65: "0.65",
        85: "0.85",
      },
      zIndex: {
        dropbown: "100",
        "sticky-below": "225",
        sticky: "250",
        "sticky-above": "275",
        "fixed-below": "325",
        fixed: "350",
        "fixed-above": "375",
        "offcanvas-below": "425",
        offcanvas: "450",
        "offcanvas-above": "475",
        "popover-below": "525",
        popover: "550",
        "popover-above": "575",
        "modal-below": "625",
        modal: "650",
        "modal-above": "675",
        tooltip: "700",
      },
      transitionTimingFunction: {
        "in-circ": "cubic-bezier(0.55, 0, 1, 0.45)",
        "out-circ": "cubic-bezier(0, 0.55, 0.45, 1)",
        "in-out-circ": "cubic-bezier(0.85, 0, 0.15, 1)",
        "in-back": "cubic-bezier(0.36, 0, 0.66, -0.56)",
        "out-back": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "in-out-back": "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
      },
      flex: {
        slides1: "0 0 100%",
        slides2: "0 0 calc(50% - 16px)",
        slides3: "0 0 calc(33% - 16px)",
        slides4: "0 0 calc(25% - 16px)",
        slides5: "0 0 calc(20% - 16px)",
        slides6: "0 0 calc(16.667% - 16px)",
        slides7: "0 0 calc(14.826% - 16px",
        slides8: "0 0 calc(12.5% - 16px)",
      },
    },
  },
  plugins: [],
};
export default config;
