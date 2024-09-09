/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Adjusted to target the 'src' folder typically used in React apps
  ],
  theme: {
    extend: {
      colors: {
        blackish: "#2E2E2E",
        primaryColor: "#00CDE1",
      },
      fontFamily: {
        inter: ['"Inter"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
