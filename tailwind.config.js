/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1200px',
      },
    },
    extend: {
      colors: {
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          light: 'hsl(var(--primary-light) / <alpha-value>)',
          dark: 'hsl(var(--primary-dark) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        gold: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          light: 'hsl(var(--primary-light) / <alpha-value>)',
          dark: 'hsl(var(--primary-dark) / <alpha-value>)',
        },
        secondary: 'hsl(var(--secondary) / <alpha-value>)',
        cream: 'hsl(var(--secondary) / <alpha-value>)',
        accent: 'hsl(var(--accent) / <alpha-value>)',
        warm: 'hsl(var(--accent) / <alpha-value>)',
        charcoal: 'hsl(var(--charcoal) / <alpha-value>)',
        border: 'hsl(var(--border) / <alpha-value>)',
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        destructive: 'hsl(var(--destructive) / <alpha-value>)',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        eyebrow: '0.3em',
        widish: '0.15em',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
      },
      maxWidth: {
        prose: '68ch',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #CC9F33, #C9A04D)',
        'gold-text': 'linear-gradient(135deg, #CC9F33, #DCC388, #CC9F33)',
        'image-overlay': 'linear-gradient(180deg, rgba(38,33,28,0.45), rgba(38,33,28,0.25))',
      },
      boxShadow: {
        soft: '0 10px 40px -15px rgba(42, 38, 34, 0.18)',
        card: '0 4px 24px -8px rgba(42, 38, 34, 0.12)',
        gold: '0 12px 32px -12px rgba(204, 159, 51, 0.45)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        shimmer: 'shimmer 6s ease infinite',
      },
    },
  },
  plugins: [],
}
