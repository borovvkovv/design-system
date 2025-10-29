import type { Config } from 'tailwindcss';
import { colors } from './tailwind.config.colors';
import { spacings } from './tailwind.config.spacings';
import { fontSize } from './tailwind.config.fonts';
import { screens } from './tailwind.config.screens';
import plugin from 'tailwindcss/plugin';

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors,
    fontSize,
    screens,
    extend: {
      ...spacings,
      boxShadow: {
        '-2': '0px -2px 4px 0px rgba(0, 0, 0, 0.08), 0px 0px 1px 0px rgba(0, 0, 0, 0.08)',
        2: '0px 2px 4px 0px rgba(0, 0, 0, 0.08), 0px 0px 1px 0px rgba(0, 0, 0, 0.08)',
        4: '0px 4px 8px 2px  rgba(0, 0, 0, 0.18)',
        8: '0px 8px 16px 0px rgba(0, 0, 0, 0.08), 0px 0px 1px 0px rgba(0, 0, 0, 0.08)',
        24: '0px 16px 32px 0px rgba(0, 0, 0, 0.08), 0px 0px 2px 0px rgba(0, 0, 0, 0.08)',
        right4:
          '0px 8px 0px rgba(255, 255, 255, 1), 0px -8px 0px rgba(255, 255, 255, 1), 4px 0px 4px rgba(0, 0, 0, 0.08)',
      },
      flexShrink: {
        8: '8',
      },
      flexGrow: {
        2.2: '2.2',
      },
      padding: { inherit: 'inherit' },
      transitionProperty: {
        height: 'height',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true, preferredStrategy: 'pseudoelements' }),
    plugin(function ({ addVariant }) {
      addVariant('hover-compatible', '@media (hover: hover)');
      addVariant('hover-incompatible', '@media (hover: none)');
    }),
  ],
} satisfies Config;
