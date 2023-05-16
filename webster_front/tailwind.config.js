/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-purple': '#22223B',
        'dark-blue-pastel': '#4A4E69',
        'light-grey-pastel': '#9ABC98',
        'beige': '#C9ADA7',
        'light-beige': '#F2E9E4',
        'lilovii': '#9A7197',
        'light-blue': colors.sky,
        'cyan': colors.cyan,
        'plum': '#f092dd',
        'bone': '#dad2bc',
        'pomp-and-power': '#8f6593'
      },
    },
  },
  plugins: [],
}

