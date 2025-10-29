import { describe, expect, test, vi } from 'vitest';
import { useDebounce } from '@comp/utils/useDebounce';

describe('useDebounce', () => {
  test(`Должен после каждого вызова debounce начинать отсчет с начала.
  Если на протяжении секунды больше не было вызовов debounce, должен выполниться колбэк`, () => {
    vi.useFakeTimers();

    const testFn = vi.fn();
    const call = useDebounce(1000, () => testFn());
    call();
    vi.advanceTimersByTime(900);
    expect(testFn).not.toBeCalled();
    call();
    vi.advanceTimersByTime(900);
    expect(testFn).not.toBeCalled();
    call();
    vi.advanceTimersByTime(900);
    expect(testFn).not.toBeCalled();
    vi.advanceTimersByTime(100);
    expect(testFn).toBeCalledTimes(1);

    vi.useRealTimers();
  });
});
