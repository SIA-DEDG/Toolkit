export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        // Tokens resolvidos por CSS variables RGB (ver index.css) — o padrão
        // rgb(var(--x) / <alpha-value>) permite modificadores de opacidade (bg-x/60)
        // Brand blues
        brand: {
          DEFAULT: 'rgb(var(--brand) / <alpha-value>)',
          mid:     'rgb(var(--brand-mid) / <alpha-value>)',
          deep:    'rgb(var(--brand-deep) / <alpha-value>)',
          bg:      'rgb(var(--brand-bg) / <alpha-value>)',
          light:   'rgb(var(--brand-light) / <alpha-value>)',
        },
        // Grupos de instrumentos
        secondary: 'rgb(var(--secondary) / <alpha-value>)',
        tertiary:  'rgb(var(--tertiary) / <alpha-value>)',
        // Semantic text shades
        ink: {
          dark:  'rgb(var(--ink-dark) / <alpha-value>)',
          mid:   'rgb(var(--ink-mid) / <alpha-value>)',
          muted: 'rgb(var(--ink-muted) / <alpha-value>)',
          sub:   'rgb(var(--ink-sub) / <alpha-value>)',
        },
        // Superfície de cards/painéis (branco no claro, escuro no dark)
        surface: {
          DEFAULT: 'rgb(var(--surface) / <alpha-value>)',
          alt:     'rgb(var(--surface-alt) / <alpha-value>)',
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
