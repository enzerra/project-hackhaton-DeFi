/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        vercel: {
          bg: '#FFFFFF',
          card: '#FFFFFF',
          surface: '#FAFAFA',
          border: 'rgba(0, 0, 0, 0.08)',
          text: '#171717',
          muted: '#666666',
          subtle: '#888888',
          accent: '#0070F3',
          red: '#FF5B4F',
          pink: '#DE1D8D',
          blue: '#0A72EF',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'vercel-border': '0px 0px 0px 1px rgba(0, 0, 0, 0.08)',
        'vercel-card': '0px 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 2px 4px rgba(0, 0, 0, 0.04)',
        'vercel-hover': '0px 0px 0px 1px rgba(0, 0, 0, 0.16), 0px 6px 12px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
};
