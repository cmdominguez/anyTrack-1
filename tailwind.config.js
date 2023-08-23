const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#fafafc", //el color de fondo de la pantalla
        secondary: "#fff",
        third: "#0070f0", //el azul
        navBar: "#f4f4f5",
        textPrimary: "#03001C",
        success: "#5FD068",
        darkprimary: "#1B2430",
        darknavBar: "#212d3d",
        darksecondary: "#1D2D50",
        darktextPrimary: "#f4f4f5",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
