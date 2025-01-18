/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        righteous: ["Righteous", "cursive"], // Add 'cursive' as fallback
      },
      fontSize: {
        xxs: "0.6rem",
        xxxs: "0.5rem",
      },
      listStyleType: {
        square: "square",
      },
    },
  },
  plugins: [],
};
