import type { KeyValuePair, ResolvableTo, ThemeConfig } from 'tailwindcss/types/config';

const getRem = (value: number) => `${0.25 * value}rem`;
const getSpacing = (values: number[]): ResolvableTo<KeyValuePair> =>
  values.reduce((obj, key) => ({ ...obj, [key]: getRem(key) }), {});

export const spacings: Partial<ThemeConfig> = {
  spacing: getSpacing([
    0.5, 1.75, 2.75, 4.5, 5, 5.5, 7, 8.5, 9.5, 11, 13, 13.5, 15, 16, 17, 18, 21, 23, 25, 26, 29, 30, 32.5, 33, 35, 36,
    39, 41, 42, 44.5, 45, 46, 49, 50, 65, 70, 72, 75, 80, 81, 84, 85, 90, 100, 106, 110, 111.5, 124, 144,
  ]),
  width: {
    ...getSpacing([42, 46, 53]),
  },
  height: getSpacing([112]),
  minWidth: {
    ...getSpacing([5, 32]),
  },
  minHeight: getSpacing([5, 10, 112, 117]),
  maxWidth: {
    ...getSpacing([38, 40, 95, 190, 320, 360]),
  },
};
