import { describe, expect, test, vi } from 'vitest';
import { useThrottle } from '@comp/utils/useThrottle';

describe('useThrottle', () => {
  test('Должен вызывать колбэк не чаще, чем раз в секунду', () => {
    vi.useFakeTimers();

    const testFn = vi.fn();
    const call = useThrottle(1000, () => testFn());
    call();
    vi.advanceTimersByTime(100);
    call();
    vi.advanceTimersByTime(100);
    call();
    vi.advanceTimersByTime(100);
    call();
    vi.advanceTimersByTime(100);
    call();
    vi.advanceTimersByTime(100);
    expect(testFn).not.toBeCalled();
    vi.advanceTimersByTime(500);
    expect(testFn).toBeCalledTimes(1);

    vi.useRealTimers();
  });
});
