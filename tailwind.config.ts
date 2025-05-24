import type { Config } from "tailwindcss";
import { brandColors } from "./src/lib/utils/theme-colors";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },
        // Brand colors
        brand: {
          primary: brandColors.primary.DEFAULT,
          'primary-dark': brandColors.primary.dark,
          'primary-light': brandColors.primary.light,
          'primary-lighter': brandColors.primary.lighter,
          gold: brandColors.gold.DEFAULT,
          'gold-light': brandColors.gold.light,
          'gold-dark': brandColors.gold.dark,
        },
        // Direct color references for easier use
        ruby: {
          DEFAULT: '#CD0105',
          dark: '#540102',
          light: '#F69583',
          lighter: '#EFC2B3',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F4D160',
          dark: '#A67C00',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #CD0105, #F69583)',
        'gradient-dark': 'linear-gradient(to right, #540102, #CD0105)',
        'gradient-gold': 'linear-gradient(to right, #A67C00, #D4AF37, #F4D160)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
