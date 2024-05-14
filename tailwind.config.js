/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#5A4DF3',
        bg: '#F5F6F7'
      },
      fontFamily: {
        h: ['Poppins-Bold', 'sans-serif'],
        p: ['Poppins-Regular', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

