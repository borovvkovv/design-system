import type { ResolvableTo, ScreensConfig } from 'tailwindcss/types/config';

export const screens: ResolvableTo<ScreensConfig> = {
  md: '744px',
  // => @media (min-width: 744px) { ... }

  lg: '1140px',
  // => @media (min-width: 1140px) { ... }

  xl: '1360px',
  // => @media (min-width: 1360px) { ... }

  '2xl': '1520px',
  // => @media (min-width: 1520px) { ... }
};
