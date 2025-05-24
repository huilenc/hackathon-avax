// Brand color palette
export const brandColors = {
  primary: {
    DEFAULT: '#CD0105',
    dark: '#540102',
    light: '#F69583',
    lighter: '#EFC2B3',
  },
  gold: {
    DEFAULT: '#D4AF37', // Classic gold color
    light: '#F4D160',
    dark: '#A67C00',
  },
  neutral: {
    50: '#F9F5F5',
    100: '#F0E6E6',
    200: '#E1CDCD',
    300: '#C9ADAD',
    400: '#B08E8E',
    500: '#8D6E6E',
    600: '#6D5454',
    700: '#4F3D3D',
    800: '#362A2A',
    900: '#1F1919',
    950: '#120E0E',
  }
};

// CSS variables for use in tailwind.config.js
export const cssVariables = {
  '--color-primary': brandColors.primary.DEFAULT,
  '--color-primary-dark': brandColors.primary.dark,
  '--color-primary-light': brandColors.primary.light,
  '--color-primary-lighter': brandColors.primary.lighter,
  '--color-gold': brandColors.gold.DEFAULT,
  '--color-gold-light': brandColors.gold.light,
  '--color-gold-dark': brandColors.gold.dark,
};

// Gradient definitions
export const gradients = {
  primaryToLight: 'linear-gradient(to right, var(--color-primary), var(--color-primary-light))',
  darkToPrimary: 'linear-gradient(to right, var(--color-primary-dark), var(--color-primary))',
  goldAccent: 'linear-gradient(to right, var(--color-gold-dark), var(--color-gold), var(--color-gold-light))',
};
