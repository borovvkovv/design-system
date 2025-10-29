import { describe, expect, test } from 'vitest';
import { removePxMeasureFromValue, sortISelectItems, uppercaseFirst } from '@comp/utils/string';
import type { ISelectItem } from '@comp/components/selects/utils/models';
import { SortType } from '@comp/utils/compare';

describe('Библиотека string', () => {
  test.each([
    ['sdfrDrgsE', 'SdfrDrgsE'],
    ['SDFsdf', 'SDFsdf'],
    ['SDF', 'SDF'],
    ['', ''],
  ])('Uppercase first letter test (%s => %s)', (input, output) => {
    expect(uppercaseFirst(input)).toBe(output);
  });

  test.each([
    [
      SortTestArray,
      SortType.Asc,
      [
        { title: 'alpha', value: 'zzz' },
        { title: 'Alpha', value: 'Alpha' },
        { title: 'Beta', value: 'Beta' },
        { title: 'beta', value: 'beta' },
        { title: 'Charly', value: 'Charly' },
      ],
    ],
    [
      SortTestArray,
      SortType.Desc,
      [
        { title: 'Charly', value: 'Charly' },
        { title: 'Beta', value: 'Beta' },
        { title: 'beta', value: 'beta' },
        { title: 'alpha', value: 'zzz' },
        { title: 'Alpha', value: 'Alpha' },
      ],
    ],
  ])('sortISelectItems test (%s, %s) => (%s)', (input, option, output) => {
    expect(sortISelectItems(input, option)).toStrictEqual(output);
  });

  test.each([
    ['158px', 158],
    ['158PX', 158],
    ['158', 158],
    ['0', 0],
  ])('removePxMeasureFromValue test (%s => %s)', (input, output) => {
    expect(removePxMeasureFromValue(input)).toBe(output);
  });
});

const SortTestArray: ISelectItem[] = [
  { title: 'Beta', value: 'Beta' },
  { title: 'alpha', value: 'zzz' },
  { title: 'Alpha', value: 'Alpha' },
  { title: 'Charly', value: 'Charly' },
  { title: 'beta', value: 'beta' },
];
