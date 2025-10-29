/**
 * Выполнить колбэк после N миллисекунд.
 * При повторном вызове debounce, начинать отсчет с начала
 * @param timeoutMs Количество миллисекунд, которое должно пройти после вызова debounce, для выполнения колбэка
 * @param callback Колбэк
 */
export const useDebounce = (timeoutMs: number, callback: (...args: any[]) => void) => {
  let previousCall: number | undefined = undefined;
  let timer: NodeJS.Timeout | undefined = undefined;
  return (...args: any[]) => {
    const lastCall = Date.now();

    if (previousCall && lastCall - previousCall <= timeoutMs) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => callback(...args), timeoutMs);

    previousCall = lastCall;
  };
};
