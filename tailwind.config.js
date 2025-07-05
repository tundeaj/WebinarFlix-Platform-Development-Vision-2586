/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        netflix: {
          red: '#E50914',
          black: '#141414',
          dark: '#0F0F0F',
          gray: '#333333',
          light: '#B3B3B3'
        }
      },
      fontFamily: {
        'netflix': ['Netflix Sans', 'Helvetica Neue', 'Arial', 'sans-serif']
      }
    },
  },
  plugins: [],
}