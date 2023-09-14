/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts.tsx}",
    "./src/**/*"
  ],
  theme: {
    extend: {
      colors: {
        darkblue: "#222653ff",
        lightblue: "#3b88b6ff",
        frame: "#a6afc8ff"
      }
    },
  },
  plugins: [],
}

