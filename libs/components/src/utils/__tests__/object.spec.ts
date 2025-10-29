import { describe, expect, test } from 'vitest';
import { isObject, isArray, mergeDeep } from '@comp/utils/object';

-describe('Библиотека object', () => {
  test.each([
    [{ a: 'a' }, true],
    [{}, true],
    [undefined, false],
    [null, false],
    [NaN, false],
    [new Date(), true],
    [[], false],
    [[{ a: 'a' }], false],
    ['str', false],
    ['', false],
    [0, false],
  ])('isObject(%s) -> %s', (item, output) => {
    expect(isObject(item)).toBe(output);
  });

  test.each([
    [{ a: 'a' }, false],
    [{}, false],
    [undefined, false],
    [null, false],
    [NaN, false],
    [new Date(), false],
    [[], true],
    [[{ a: 'a' }], true],
    ['str', false],
    ['', false],
    [0, false],
  ])('isArray(%s) -> %s', (item, output) => {
    expect(isArray(item)).toBe(output);
  });

  const testObj1 = { a: { b: { c: { d: { e: 'f' } } } } };
  const testObj2 = { a: { b: { c: { d: { e: 'g' } } } } };

  test.each([
    { target: { a: 'a' }, source: { b: 'b' }, output: { a: 'a', b: 'b' } },
    { target: { a: 'a' }, source: { b: null }, output: { a: 'a', b: null } },
    { target: { a: 'a' }, source: { a: 'b' }, output: { a: 'b' } },
    { target: { a: 'a' }, source: {}, output: { a: 'a' } },
    { target: {}, source: { a: 'a' }, output: { a: 'a' } },
    { target: {}, source: {}, output: {} },

    { target: { b: null }, source: { b: 5 }, output: { b: 5 } },
    { target: { b: 5 }, source: { b: null }, output: { b: null } },

    { target: { c: [1, 2, 3] }, source: { c: [4, 5, 6] }, output: { c: [4, 5, 6] } },
    { target: { c: [1, 2, 3] }, source: { c: [] }, output: { c: [] } },
    { target: { c: [] }, source: { c: [{ a: 'a' }] }, output: { c: [{ a: 'a' }] } },

    { target: testObj1, source: testObj2, output: testObj2 },
  ])('mergeDeep(%s, %s) -> %s', ({ target, source, output }) => {
    expect(mergeDeep(target, source)).toStrictEqual(output);
  });
});
