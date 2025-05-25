export const brandColors = {
  primary: {
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
} as const;

export type BrandColors = typeof brandColors; 