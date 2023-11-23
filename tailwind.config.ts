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
      primary: colors.orange,
      secondary: colors.sky,
      success: colors.green,
      warning: colors.yellow,
      error: colors.red,
      "dark-purple": "#541348",
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
