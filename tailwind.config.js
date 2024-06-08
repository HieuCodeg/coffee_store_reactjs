/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";
 
export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#793939",
        "main-color": "#53382c",
        "label-color": "#333333",
        "highLight-color": "#b22830",
        "disabled-color": "#919eabcc",
      },
    },
  },
  plugins: [],
});