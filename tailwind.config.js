/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@zach.codes/react-calendar/dist/**/*.js",
  ],
  theme: {
    fontSize: {
      tiny: "12px",
      base: "16px",
      sm: "18px",
      md: "24px",
      lg: "36px",
      xl: "60px",
    },
    extend: {},
  },
  plugins: [],
});
