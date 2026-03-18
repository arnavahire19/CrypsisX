/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#080808', // Slightly lifted from #050505 for better contrast
          darker: '#040404',
          lighter: '#121212',
        },
        ember: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          DEFAULT: '#f97316',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          'sans-serif',
        ],
      },
      letterSpacing: {
        'tightest': '-0.04em',
        'tighter': '-0.02em',
      },
      spacing: {
        'section': '160px',
        'section-tight': '100px',
        'section-open': '220px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'in-out-quint': 'cubic-bezier(0.83, 0, 0.17, 1)',
      },
    },
  },
  plugins: [],
}
