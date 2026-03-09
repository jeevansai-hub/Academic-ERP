/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '769px',
      'lg': '1025px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        'blue-deep': '#0C2461',
        'blue-mid': '#1A4494',
        'blue-accent': '#1E6EF5',
        'blue-sky': '#5B9BFF',
        'blue-ice': '#E8F1FF',
        'blue-pale': '#F0F5FF',
        'bg-offwhite': '#F7F9FC',
        'charcoal': '#374151',
        'slate-cool': '#94A3B8',
        'border-bluegrey': '#DDE5F0',
        'error': '#EF4444',
        'success': '#16A34A',
        'warning': '#F59E0B',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        title: ['Cormorant Garamond', 'serif'],
      },
      borderRadius: {
        'xs': '5px',
        'sm': '10px',
        'md': '14px',
        'lg': '20px',
        'full': '100px',
      },
    },
  },
  plugins: [],
}
