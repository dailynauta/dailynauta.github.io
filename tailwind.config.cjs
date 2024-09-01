/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Bricolage Grotesque Variable",
          "Inter Variable",
          "Inter",
          ...defaultTheme.fontFamily.sans,
        ],
        simpson: ['"Cabin Sketch"', 'Comic Sans MS', 'cursive'], // Nueva fuente personalizada
      },
      colors: {
        simpsonYellow: '#FDD835', // Amarillo similar al de "Los Simpson"
        simpsonBlue: '#3B82F6',   // Azul vibrante
        simpsonRed: '#EF4444',    // Rojo vibrante
        simpsonSkyNight: '#0a1a2f', // Cielo nocturno oscuro
      },
      backgroundImage: {
        'starry-night': `
          radial-gradient(circle at 20% 20%, #ffffff 2px, transparent 2px),
          radial-gradient(circle at 80% 30%, #ffffff 1.5px, transparent 2px),
          radial-gradient(circle at 50% 50%, #ffffff 1px, transparent 1px),
          radial-gradient(circle at 10% 80%, #ffffff 2px, transparent 2px),
          radial-gradient(circle at 70% 70%, #ffffff 1px, transparent 1px),
          radial-gradient(circle at 90% 40%, #ffffff 1.5px, transparent 1.5px),
          radial-gradient(circle at 40% 60%, #ffffff 1px, transparent 1px),
          radial-gradient(circle at 30% 40%, #ffffff 2px, transparent 2px),
          radial-gradient(circle at 60% 10%, #ffffff 1.5px, transparent 1.5px)
        `,
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
