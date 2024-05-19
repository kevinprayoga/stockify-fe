/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#5A4DF3',
        bg: '#F5F6F7',
        vSmallFont: '#494949',
        smallFont: '#626262',
        mediumFont: '#292A2E'
      },
      fontFamily: {
        bold: ['Poppins-Bold', 'sans-serif'],
        semiBold: ['Poppins-SemiBold', 'sans-serif'],
        medium: ['Poppins-Medium', 'sans-serif'],
        regular: ['Poppins-Regular', 'sans-serif'],
        light: ['Poppins-Light', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

