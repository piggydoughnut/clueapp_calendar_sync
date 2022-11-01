/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      tiny: "12px",
      base: "16px",
      sm: "18px",
      md: "24px",
      lg: "36px",
      xl: "42px",
      "2xl": "60px",
    },
    extend: {
      topBg: {
        topBg: "url('/top-bg.svg')",
      },
    },
  },
  plugins: [],
});
