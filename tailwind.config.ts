import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        /* ── Brand raw palette ── */
        navy:       '#000000',
        grey:       '#575757',
        offwhite:   '#F7F5F0',
        red:        '#8B1D1B',
        'red-dark': '#B32724',

        /* ── shadcn semantic tokens ── */
        background: 'oklch(0.972 0.006 80)',
        foreground: 'oklch(0 0 0)',

        border: 'oklch(0.42 0 0 / <alpha-value>)',
        input:  'oklch(0.42 0 0 / <alpha-value>)',
        ring:   'oklch(0.368 0.14 22 / <alpha-value>)',

        primary: {
          DEFAULT:    'oklch(0.368 0.14 22 / <alpha-value>)',  /* #8B1D1B */
          foreground: 'oklch(0.972 0.006 80)',
        },
        secondary: {
          DEFAULT:    'oklch(0.94 0.003 80 / <alpha-value>)',
          foreground: 'oklch(0 0 0)',
        },
        destructive: {
          DEFAULT:    'oklch(0.452 0.158 24 / <alpha-value>)', /* #B32724 */
          foreground: 'oklch(0.972 0.006 80)',
        },
        muted: {
          DEFAULT:    'oklch(0.92 0.003 80 / <alpha-value>)',
          foreground: 'oklch(0.42 0 0)',                       /* #575757 */
        },
        accent: {
          DEFAULT:    'oklch(0.95 0.01 22 / <alpha-value>)',
          foreground: 'oklch(0.368 0.14 22)',
        },
        popover: {
          DEFAULT:    'oklch(1 0 0)',
          foreground: 'oklch(0 0 0)',
        },
        card: {
          DEFAULT:    'oklch(1 0 0)',
          foreground: 'oklch(0 0 0)',
        },
      },

      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
        sans:    ['var(--font-body)', 'system-ui', 'sans-serif'],
      },

      borderRadius: {
        lg:  '0.5rem',
        md:  '0.375rem',
        sm:  '0.125rem',
        full:'9999px',
      },

      ringWidth: {
        3: '3px',
      },

      animation: {
        first:  'moveVertical 30s ease infinite',
        second: 'moveInCircle 20s reverse infinite',
        third:  'moveInCircle 40s linear infinite',
        fourth: 'moveHorizontal 40s ease infinite',
        fifth:  'moveInCircle 20s ease infinite',
      },
      keyframes: {
        moveHorizontal: {
          '0%':   { transform: 'translateX(-50%) translateY(-10%)' },
          '50%':  { transform: 'translateX(50%) translateY(10%)' },
          '100%': { transform: 'translateX(-50%) translateY(-10%)' },
        },
        moveInCircle: {
          '0%':   { transform: 'rotate(0deg)' },
          '50%':  { transform: 'rotate(180deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        moveVertical: {
          '0%':   { transform: 'translateY(-50%)' },
          '50%':  { transform: 'translateY(50%)' },
          '100%': { transform: 'translateY(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
