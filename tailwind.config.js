/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        righteous: ["Righteous", "cursive"], // Add 'cursive' as fallback
      },
    },
  },
  plugins: [],
};
