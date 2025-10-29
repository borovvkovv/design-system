/**
 * Выполнить колбэк после N миллисекунд.
 * Игнорировать повторные вызовы throttle до выполнения колбэка
 * @param timeout Количество миллисекунд после которых выполняется колбэк
 * @param callback Колбэк
 */
export const useThrottle = (timeout: number, callback: (...args: any[]) => void) => {
  let timer: NodeJS.Timeout | undefined = undefined;
  return (...args: any[]) => {
    if (timer) return;

    timer = setTimeout(() => {
      callback(...args);
      clearTimeout(timer);
      timer = undefined;
    }, timeout);
  };
};
