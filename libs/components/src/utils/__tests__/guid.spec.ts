import { describe, expect, test } from 'vitest';
import { createGuid } from '@comp/utils/guid';

describe('Библиотека guid', () => {
  test('createGuid должен возвращать каждый раз разные guid', () => {
    const guids = new Set<string>();
    for (let i = 0; i < 100; i++) guids.add(createGuid());

    expect(guids).toHaveLength(100);
  });

  test('createGuid должен возвращать guid определенного формата', () => {
    const regexp = new RegExp(/[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}/i);

    expect(createGuid()).toMatch(regexp);
  });
});
