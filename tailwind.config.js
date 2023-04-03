/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens:{
      '@media340': { 'max': '680px' }
    }

  },
  plugins: [],
}
