import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "custom-purple-1": "#411C3B",
        "custom-purple-2": "#42243C",
        "custom-purple-3": "#3D1F42",
        "custom-purple-4": "#3C173C",
        "custom-purple-5": "#531C43",
      },
      fontFamily: {
        poppinsbold: ["Poppins-Bold", "sans-serif"],
        poppinslight: ["Poppins-Light", "sans-serif"],
        poppinsmedium: ["Poppins-Medium", "sans-serif"],
        poppinsregular: ["Poppins-Regular", "sans-serif"],
        poppinssb: ["Poppins-SemiBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
