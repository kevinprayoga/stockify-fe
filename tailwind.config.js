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
        b: ['Poppins-Bold', 'sans-serif'],
        s: ['Poppins-SemiBold', 'sans-serif'],
        m: ['Poppins-Medium', 'sans-serif'],
        r: ['Poppins-Regular', 'sans-serif'],
        l: ['Poppins-Light', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

