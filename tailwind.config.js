/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme')
//const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        primary: ['Montserrat', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        //white: '#ffffff',
        //black: '#000000',
        dark: {
          400: '#21222A',
          500: '#101117',
        },
        brand: {
          500: '#FF0090',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
