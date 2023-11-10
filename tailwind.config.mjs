/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "main-bg-color": "#1C1C1C"
      },
      fontFamily: {
        sans: ["Nunito Variable", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
