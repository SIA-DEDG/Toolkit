export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1a2f5e',
          dark: '#0f2244',
          light: '#243d7a',
        },
        sky: {
          flow: '#4a8fd4',
        },
        text: '#2A4365',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
