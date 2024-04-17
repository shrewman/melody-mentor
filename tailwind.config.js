/** @type {import('tailwindcss').Config} */
import catppuccinTailwindCSS from "@catppuccin/tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    catppuccinTailwindCSS({
      defaultFlavour: "mocha",
    }),
  ],
};
