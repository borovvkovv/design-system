import { describe, expectTypeOf, test } from 'vitest';
import type { ComparableKey, ComparableStringKey } from '@comp/utils/compare';

describe('Библиотека compare. Типы', () => {
  type Type1 = {
    a: string;
    b: number;
    c: Array<number>;
  };
  type Type2 = {
    a: number;
    b: number;
  };
  type Type3 = {
    a: string;
    b: string;
  };
  type Type4 = {};

  test('ComparableKey. Объединение ключей свойств объекта, значение которых типа string | number', () => {
    expectTypeOf<'a' | 'b'>().toMatchTypeOf<ComparableKey<Type1>>();
  });
  test('ComparableKey. Объединение ключей свойств объекта, значение которых типа string | number', () => {
    expectTypeOf<'a' | 'b'>().toMatchTypeOf<ComparableKey<Type2>>();
  });
  test('ComparableKey. Объединение ключей свойств объекта, значение которых типа string | number', () => {
    expectTypeOf<'a' | 'b'>().toMatchTypeOf<ComparableKey<Type3>>();
  });
  test('ComparableKey. Объединение ключей свойств объекта, значение которых типа string | number', () => {
    expectTypeOf<never>().toMatchTypeOf<ComparableKey<Type4>>();
  });

  test('ComparableStringKey. Объединение ключей свойств объекта, значение которых типа string', () => {
    expectTypeOf<'a'>().toMatchTypeOf<ComparableStringKey<Type1>>();
  });
  test('ComparableStringKey. Объединение ключей свойств объекта, значение которых типа string', () => {
    expectTypeOf<never>().toMatchTypeOf<ComparableStringKey<Type2>>();
  });
  test('ComparableStringKey. Объединение ключей свойств объекта, значение которых типа string', () => {
    expectTypeOf<'a' | 'b'>().toMatchTypeOf<ComparableStringKey<Type3>>();
  });
  test('ComparableStringKey. Объединение ключей свойств объекта, значение которых типа string', () => {
    expectTypeOf<never>().toMatchTypeOf<ComparableStringKey<Type4>>();
  });
});
