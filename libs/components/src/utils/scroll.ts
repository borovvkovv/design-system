import { inject, type MaybeRef } from 'vue';

/**
 * Получить зависимость (элемент со скролом) из поставщика зависимостей
 * @returns Реактивный элемент со скролом
 */
export const getScrollElementToProvider = (): MaybeRef<HTMLElement | undefined> =>
  inject<MaybeRef<HTMLElement | undefined>>('scrollElement', undefined);
