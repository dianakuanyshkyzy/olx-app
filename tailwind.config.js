// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          light: '#f5f5dc',
          DEFAULT: '#f5f5dc',
          dark: '#e3d9ca',
        },
        teal: {
          light: '#5eead4',
          DEFAULT: '#14b8a6',
          dark: '#0d9488',
        },
      },
    },
  },
  plugins: [],
};
