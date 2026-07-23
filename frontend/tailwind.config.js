/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#080C14',
          card: 'rgba(24, 34, 54, 0.75)',
          surface: '#101726',
        },
        accent: {
          cyan: '#00F2FE',
          blue: '#4FACFE',
          purple: '#7928CA',
        },
        brand: {
          success: '#10B981',
          danger: '#EF4444',
          warning: '#F59E0B',
        }
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'sm': '6px',
        'md': '12px',
        'lg': '20px',
      }
    },
  },
  plugins: [],
};
