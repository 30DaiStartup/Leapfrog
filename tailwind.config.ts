import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#1a1a1a',
          dark: '#0f0f0f',
        },
        p0: {
          DEFAULT: '#8B0000',
          light: '#A5292A',
        },
        p1: {
          DEFAULT: '#FF8C42',
          light: '#F77F00',
        },
        p2: {
          DEFAULT: '#4A90E2',
          light: '#0077B6',
        },
        string: {
          DEFAULT: 'rgba(255, 255, 255, 0.3)',
        },
      },
      animation: {
        'pulse-milestone': 'pulse 500ms ease-out',
      },
    },
  },
  plugins: [],
}
export default config
