import { describe, expect, test } from 'vitest';
import { SortType, compare, compareByKey, compareByStringKey, isObjectsEqual } from '@comp/utils/compare';

type MockedObjectNumberType = {
  a: number;
  b: number;
};

type MockedObjectStringType = {
  a: string;
  b: string;
};

describe('Библиотека compare', () => {
  test.each([
    [0, 1, SortType.Asc, -1],
    [1, 0, SortType.Desc, -1],
    [1, 0, SortType.Asc, 1],
    [0, 1, SortType.Desc, 1],
    [0, 0, SortType.Asc, 0],
    [0, 0, SortType.Desc, 0],
  ])('compare(%s, %s, %s) -> %s', (current, previous, sortType, output) => {
    expect(compare(current, previous, sortType)).toBe(output);
  });

  test.each([
    {
      key: 'a',
      sortType: SortType.Asc,
      compareObjectsFn: compareByKey<MockedObjectNumberType>('a', SortType.Asc),
      currentObject: { a: 0, b: 0 },
      previousObject: { a: 1, b: 0 },
      output: -1,
    },
    {
      key: 'a',
      sortType: SortType.Desc,
      compareObjectsFn: compareByKey<MockedObjectNumberType>('a', SortType.Desc),
      currentObject: { a: 1, b: 0 },
      previousObject: { a: 0, b: 0 },
      output: -1,
    },
    {
      key: 'b',
      sortType: SortType.Asc,
      compareObjectsFn: compareByKey<MockedObjectNumberType>('b', SortType.Asc),
      currentObject: { a: 0, b: 1 },
      previousObject: { a: 0, b: 0 },
      output: 1,
    },
    {
      key: 'b',
      sortType: SortType.Desc,
      compareObjectsFn: compareByKey<MockedObjectNumberType>('b', SortType.Desc),
      currentObject: { a: 0, b: 0 },
      previousObject: { a: 0, b: 1 },
      output: 1,
    },
    {
      key: 'a',
      sortType: undefined,
      compareObjectsFn: compareByKey<MockedObjectNumberType>('a'),
      currentObject: { a: 1, b: 1 },
      previousObject: { a: 1, b: 0 },
      output: 0,
    },
  ])(
    'compareByKey($key, $sortType) -> compareObjectsFn($currentObject, $prevObject) -> $output',
    ({ compareObjectsFn, currentObject, previousObject, output }) => {
      expect(compareObjectsFn(currentObject, previousObject)).toBe(output);
    },
  );

  test.each([
    {
      key: 'a',
      sortType: SortType.Asc,
      compareObjectsFn: compareByStringKey<MockedObjectStringType>('a', SortType.Asc),
      currentObject: { a: 'a', b: 'a' },
      previousObject: { a: 'B', b: 'a' },
      output: -1,
    },
    {
      key: 'a',
      sortType: SortType.Desc,
      compareObjectsFn: compareByStringKey<MockedObjectStringType>('a', SortType.Desc),
      currentObject: { a: 'B', b: 'a' },
      previousObject: { a: 'a', b: 'a' },
      output: -1,
    },
    {
      key: 'b',
      sortType: SortType.Asc,
      compareObjectsFn: compareByStringKey<MockedObjectStringType>('b', SortType.Asc),
      currentObject: { a: 'a', b: 'B' },
      previousObject: { a: 'a', b: 'a' },
      output: 1,
    },
    {
      key: 'b',
      sortType: SortType.Desc,
      compareObjectsFn: compareByStringKey<MockedObjectStringType>('b', SortType.Desc),
      currentObject: { a: 'a', b: 'a' },
      previousObject: { a: 'a', b: 'B' },
      output: 1,
    },
    {
      key: 'a',
      sortType: undefined,
      compareObjectsFn: compareByStringKey<MockedObjectStringType>('a'),
      currentObject: { a: 'A', b: 'B' },
      previousObject: { a: 'a', b: 'a' },
      output: 0,
    },
  ])(
    'compareByStringKey($key, $sortType) -> compareObjectsFn($currentObject, $prevObject) -> $output',
    ({ compareObjectsFn, currentObject, previousObject, output }) => {
      expect(compareObjectsFn(currentObject, previousObject)).toBe(output);
    },
  );

  test.each([
    [{ a: 'a', b: 'b' }, { a: 'a', b: 'b' }, true],
    [{ a: 'a', b: 'b' }, { b: 'b', a: 'a' }, true],
    [{ a: 'a', b: 'b' }, { a: 'A', b: 'B' }, false],
    [{ a: 'a', b: 'b' }, { a: 'b', b: 'a' }, false],
    [{ a: 'a', b: 'b' }, { a: 'a' }, false],
    [{ a: 'a' }, { a: 'a', b: 'b' }, false],
    [{}, { a: 'a' }, false],
    [{ a: 'a' }, {}, false],
    [{}, {}, true],
  ])('isObjectsEqual(%s, %s) -> %s', (object1, object2, output) => {
    expect(isObjectsEqual(object1, object2)).toBe(output);
  });
});
