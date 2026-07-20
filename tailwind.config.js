export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand blues
        brand: {
          DEFAULT: '#0e50a6',
          mid:     '#116ed0',
          deep:    '#042d63',
          bg:      '#E3EFFF',
          light:   '#bee3f8',
        },
        // Grupos de instrumentos
        secondary: '#6561f7',
        tertiary:  '#0e9ca6',
        // Semantic text shades
        ink: {
          dark:  '#1a202c',
          mid:   '#2a4365',
          muted: '#718096',
          sub:   '#4a5568',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'slide-in': {
          '0%':   { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'slide-in': 'slide-in 0.25s ease-out',
      },
    },
  },
  plugins: [],
}
