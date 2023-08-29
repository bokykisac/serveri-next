import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        "screen-nav": "calc(100vh - 40px)",
      },
      width: {
        "30-input": "calc(30vw - 24px)",
        inherit: "inherit",
      },
      maxWidth: {
        "70-responsive": "calc(70vw)",
      },
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
      },
      blur: {
        xs: "2px",
      },
      transitionProperty: {
        width: "width",
      },
    },
  },
  plugins: [],
};
export default config;
