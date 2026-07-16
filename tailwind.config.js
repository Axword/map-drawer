/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lovecraft: {
          dark: '#0d0f12',
          card: '#161922',
          border: '#2a2f3d',
          gold: '#c5a059',
          goldHover: '#d8b46a',
          red: '#8b0000',
          redHover: '#a30000',
          parchment: '#e6dec5',
          muted: '#8c95a5',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
