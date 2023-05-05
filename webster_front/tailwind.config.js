/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height:{
        '2screen':'200vh',
        '1/2.1':'48%',
        '1\/12': '8.3%',
        '1\/24': '4.2%',
        '2\/24':'8.35%',
        '3\/24':'12.45%',
        '4\/24':'16.6%',
        '5\/24':'20.75%',
        '6\/24':'24.9%',
        '7\/24':'29%',
        '8\/24':'33.15%',
        '9\/24':'37.30%',
        '10\/24':'41.45%',
        '11\/24':'45.60%',
        '12\/24':'49.75%',
        '13\/24':'53.9%',
        '14\/24':'58.05%',
        '15\/24':'62.2%',
        '16\/24':'66.35%',
        '17\/24':'70.5%',
        '18\/24':'74.65%',
        '19\/24':'78.8%',
        '20\/24':'82.95%',
        '21\/24':'87.1%',
        '22\/24':'91.25%',
        '23\/24':'95.4%',
        '2full': '200%',
        '3full': '300%'
      },
      width:{
        '1.5/6': '18.5%',
        '1\/7': '14.2%',
        '6\/7':'85.2%'
      },
      colors:{
        'dark-purple':'#22223B',
        'dark-blue-pastel': '#4A4E69',
        'light-grey-pastel': '#9ABC98',
        'beige' : '#C9ADA7',
        'light-beige': '#F2E9E4',
        'lilovii' : '#9A7197',
        'light-blue': colors.sky,
        cyan: colors.cyan,
        'plum' : '#f092dd',
        'bone' : '#dad2bc',
        'pomp-and-power':'#8f6593'
      },
    },

  },
  plugins: [],
}

