export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-deep': 'var(--blue-deep)',
        'blue-mid': 'var(--blue-mid)',
        'blue-accent': 'var(--blue-accent)',
        'blue-sky': 'var(--blue-sky)',
        'blue-ice': 'var(--blue-ice)',
        'blue-pale': 'var(--blue-pale)',
        'bg-offwhite': 'var(--bg-offwhite)',
        'charcoal': 'var(--charcoal)',
        'slate-cool': 'var(--slate-cool)',
        'border-bluegrey': 'var(--border-bluegrey)',
        'error': 'var(--error)',
        'success': 'var(--success)',
        'warning': 'var(--warning)',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'xs': 'var(--radius-xs)',
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'full': 'var(--radius-full)',
      }
    },
  },
  plugins: [],
}
