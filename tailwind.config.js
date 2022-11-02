/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      plusJakarta: ["Plus Jakarta Sans", "sans-serif"],
    },
    colors: {
      lightPink: "#FEF6F9",
    },
    fontSize: {
      tiny: "12px",
      base: "16px",
      sm: "14px",
      md: "16px",
      lg: "18px",
      xl: "34px",
      "2xl": "36px",
      "3xl": "42px",
    },
    extend: {
      topBg: {
        topBg: "url('/top-bg.svg')",
      },
    },
  },
  plugins: [],
});
