import { beforeAll, describe, expect, test, vi } from 'vitest';
import { stringToNumber } from '@comp/utils/number';

const mockedCalcDelimiter = '.';
const mockedDigitDelimiter = '_';

describe('Библиотека number', () => {
  beforeAll(() => {
    vi.mock('@comp/stores/organizationInfoStore', () => ({
      useOrganizationInfoStore: () => ({
        delimiters: {
          calcDelimiter: mockedCalcDelimiter,
          digitDelimiter: mockedDigitDelimiter,
        },
      }),
    }));
  });

  test.each([
    ['5', 5],
    ['5.5', 5.5],
    ['5,5', undefined],
    ['.5', 0.5],
    ['notNumber', undefined],
    ['', undefined],
    ['NaN', undefined],
  ])('stringToNumber(%s) -> %s', (str, output) => {
    expect(stringToNumber(str)).toBe(output);
  });
});
