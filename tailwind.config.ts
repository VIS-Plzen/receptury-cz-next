import type { Config } from "tailwindcss";

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
    },
    fontFamily: {
      sans: ["var(--font-nunito)", "sans-serif"],
    },

    // Extending theme
    extend: {},
  },
  plugins: [],
};
export default config;
