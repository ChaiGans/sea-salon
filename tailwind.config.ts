import type { Config } from "tailwindcss";

const { fontFamily } = require("tailwindcss/defaultTheme");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      colors: {
        "custom-purple-1": "#411C3B",
        "custom-purple-2": "#42243C",
        "custom-purple-3": "#3D1F42",
        "custom-purple-4": "#3C173C",
        "custom-purple-5": "#531C43",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        poppinsbold: ["Poppins-Bold", "sans-serif"],
        poppinslight: ["Poppins-Light", "sans-serif"],
        poppinsmedium: ["Poppins-Medium", "sans-serif"],
        poppinsregular: ["Poppins-Regular", "sans-serif"],
        poppinssb: ["Poppins-SemiBold", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
