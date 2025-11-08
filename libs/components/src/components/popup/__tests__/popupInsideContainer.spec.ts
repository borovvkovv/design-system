import { afterAll, beforeAll, beforeEach, describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import PopupInsideContainer from '@comp/components/popup/PopupInsideContainer.vue';

const container = document.createElement('DIV');

const popupLeft = vi.hoisted(() => vi.fn());
const popupTop = vi.hoisted(() => vi.fn());

const getPopupInsideContainer = (
  props?: Partial<InstanceType<typeof PopupInsideContainer>['$props']>,
  isFixed: boolean = false,
) =>
  mount(PopupInsideContainer, {
    props: { container, ...props },
    slots: { default: '<div />' },
    attrs: { class: isFixed ? 'fixed' : '' },
  });

describe('Компонент PopupInsideContainer', () => {
  beforeAll(() => {
    Object.defineProperty(document.documentElement, 'clientWidth', {
      value: 1000,
      writable: false,
      configurable: true,
    });
    Object.defineProperty(document.documentElement, 'clientHeight', {
      value: 1000,
      writable: false,
      configurable: true,
    });
  });

  beforeEach(() => {
    vi.spyOn(container, 'getBoundingClientRect').mockReturnValue({
      x: 100,
      y: 100,
      top: 100,
      left: 100,
      right: 900,
      bottom: 900,
      width: 800,
      height: 800,
      toJSON: () => {},
    });

    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(() => ({
      x: popupLeft() ?? 0,
      y: popupTop() ?? 0,
      left: popupLeft() ?? 0,
      top: popupTop() ?? 0,
      right: (popupLeft() ?? 0) + 100,
      bottom: (popupTop() ?? 0) + 100,
      width: 100,
      height: 100,
      toJSON: () => {},
    }));
  });

  afterAll(() => {
    Object.defineProperty(document.documentElement, 'clientWidth', {
      value: 0,
      writable: false,
    });
    Object.defineProperty(document.documentElement, 'clientHeight', {
      value: 0,
      writable: false,
    });
  });

  test.each`
    popupDOMRectLeftBefore | popupDOMRectTopBefore | stylePopupLeft | stylePopupTop
    ${100}                 | ${100}                | ${undefined}   | ${undefined}
    ${100}                 | ${800}                | ${undefined}   | ${undefined}
    ${800}                 | ${100}                | ${undefined}   | ${undefined}
    ${100}                 | ${900}                | ${undefined}   | ${700}
    ${900}                 | ${100}                | ${700}         | ${undefined}
    ${900}                 | ${900}                | ${700}         | ${700}
  `(
    `Позиционирование попапа относительно контейнера.
    Предполагается, что событие открытия попапа вызывается только внутри контейнера.
    В случае выхода границы попапа по вертикали - отзеркаливание попапа относительно курсора.
    В случае выхода границы попапа на горизонтали - сдвигаем попап до границы контейнера.
    Попап по умолчанию соприкасается с курсором левым/верхним краем.
    `,
    async ({ popupDOMRectLeftBefore, popupDOMRectTopBefore, stylePopupLeft, stylePopupTop }) => {
      vi.useFakeTimers();
      popupLeft.mockReturnValue(popupDOMRectLeftBefore);
      popupTop.mockReturnValue(popupDOMRectTopBefore);
      const wrapper = getPopupInsideContainer({ toRightFromPointerPx: 0, toBottomFromPointerPx: 0 });

      wrapper.vm.showPopup?.();
      await nextTick();

      if (stylePopupLeft !== undefined) expect(wrapper.element.style.left).toBe(`${stylePopupLeft}px`);

      if (stylePopupTop !== undefined) expect(wrapper.element.style.top).toBe(`${stylePopupTop}px`);
    },
  );

  test.each`
    popupDOMRectLeftBefore | popupDOMRectTopBefore | stylePopupLeft | stylePopupTop
    ${0}                   | ${0}                  | ${0}           | ${0}
    ${0}                   | ${800}                | ${0}           | ${undefined}
    ${800}                 | ${0}                  | ${undefined}   | ${0}
    ${0}                   | ${900}                | ${0}           | ${undefined}
    ${900}                 | ${0}                  | ${undefined}   | ${0}
    ${900}                 | ${900}                | ${undefined}   | ${undefined}
  `(
    `Позиционирование попапа относительно контейнера.
    Предполагается, что событие открытия попапа вызывается только внутри контейнера.
    В случае выхода границы попапа по вертикали - отзеркаливание попапа относительно курсора.
    В случае выхода границы попапа на горизонтали - сдвигаем попап до границы контейнера.
    Попап по умолчанию соприкасается с курсором правым/нижним краем.
    `,
    async ({ popupDOMRectLeftBefore, popupDOMRectTopBefore, stylePopupLeft, stylePopupTop }) => {
      vi.useFakeTimers();
      popupLeft.mockReturnValue(popupDOMRectLeftBefore);
      popupTop.mockReturnValue(popupDOMRectTopBefore);
      const wrapper = getPopupInsideContainer({ toLeftFromPointerPx: 0, toTopFromPointerPx: 0 });

      wrapper.vm.showPopup?.();
      await nextTick();

      if (stylePopupLeft !== undefined) expect(wrapper.element.style.left).toBe(`${stylePopupLeft}px`);

      if (stylePopupTop !== undefined) expect(wrapper.element.style.top).toBe(`${stylePopupTop}px`);
    },
  );

  test.each`
    popupDOMRectLeftBefore | popupDOMRectTopBefore | stylePopupLeft | stylePopupTop
    ${100}                 | ${100}                | ${undefined}   | ${undefined}
    ${100}                 | ${800}                | ${undefined}   | ${undefined}
    ${800}                 | ${100}                | ${undefined}   | ${undefined}
    ${100}                 | ${900}                | ${undefined}   | ${800}
    ${900}                 | ${100}                | ${800}         | ${undefined}
    ${900}                 | ${900}                | ${800}         | ${800}
  `(
    `Позиционирование попапа относительно вьюпорта.
    Предполагается, что событие открытия попапа вызывается только внутри контейнера.
    В случае выхода границы попапа по вертикали - отзеркаливание попапа относительно курсора.
    В случае выхода границы попапа на горизонтали - сдвигаем попап до границы контейнера.
    Попап по умолчанию соприкасается с курсором левым/верхним краем.
    `,
    async ({ popupDOMRectLeftBefore, popupDOMRectTopBefore, stylePopupLeft, stylePopupTop }) => {
      vi.useFakeTimers();
      popupLeft.mockReturnValue(popupDOMRectLeftBefore);
      popupTop.mockReturnValue(popupDOMRectTopBefore);
      const wrapper = getPopupInsideContainer({ toRightFromPointerPx: 0, toBottomFromPointerPx: 0 }, true);

      wrapper.vm.showPopup?.();
      await nextTick();

      if (stylePopupLeft !== undefined) expect(wrapper.element.style.left).toBe(`${stylePopupLeft}px`);

      if (stylePopupTop !== undefined) expect(wrapper.element.style.top).toBe(`${stylePopupTop}px`);
    },
  );

  test.each`
    popupDOMRectLeftBefore | popupDOMRectTopBefore | stylePopupLeft | stylePopupTop
    ${100}                 | ${100}                | ${undefined}   | ${undefined}
    ${100}                 | ${800}                | ${undefined}   | ${undefined}
    ${800}                 | ${100}                | ${undefined}   | ${undefined}
    ${100}                 | ${900}                | ${undefined}   | ${800}
    ${900}                 | ${100}                | ${800}         | ${undefined}
    ${900}                 | ${900}                | ${800}         | ${800}
  `(
    `Позиционирование попапа относительно контейнера.
    Предполагается, что событие открытия попапа вызывается только внутри контейнера.
    В случае выхода границы попапа по вертикали - отзеркаливание попапа относительно курсора.
    В случае выхода границы попапа на горизонтали - сдвигаем попап до границы контейнера.
    Попап по умолчанию соприкасается с курсором левым/верхним краем.
    `,
    async ({ popupDOMRectLeftBefore, popupDOMRectTopBefore, stylePopupLeft, stylePopupTop }) => {
      vi.useFakeTimers();
      popupLeft.mockReturnValue(popupDOMRectLeftBefore);
      popupTop.mockReturnValue(popupDOMRectTopBefore);
      const wrapper = getPopupInsideContainer({ toRightFromPointerPx: 0, toBottomFromPointerPx: 0 }, true);

      wrapper.vm.showPopup?.();
      await nextTick();

      if (stylePopupLeft !== undefined) expect(wrapper.element.style.left).toBe(`${stylePopupLeft}px`);

      if (stylePopupTop !== undefined) expect(wrapper.element.style.top).toBe(`${stylePopupTop}px`);
    },
  );

  test.each`
    popupDOMRectLeftBefore | popupDOMRectTopBefore | stylePopupLeft | stylePopupTop
    ${100}                 | ${100}                | ${undefined}   | ${undefined}
    ${100}                 | ${800}                | ${undefined}   | ${undefined}
    ${800}                 | ${100}                | ${undefined}   | ${undefined}
    ${100}                 | ${900}                | ${undefined}   | ${580}
    ${900}                 | ${100}                | ${700}         | ${undefined}
    ${900}                 | ${900}                | ${700}         | ${580}
  `(
    `Позиционирование попапа относительно контейнера.
    Предполагается, что событие открытия попапа вызывается только внутри контейнера.
    В случае выхода границы попапа по вертикали - отзеркаливание попапа относительно курсора.
    В случае выхода границы попапа на горизонтали - сдвигаем попап до границы контейнера.
    Попап по умолчанию соприкасается с курсором левым/верхним краем.
    `,
    async ({ popupDOMRectLeftBefore, popupDOMRectTopBefore, stylePopupLeft, stylePopupTop }) => {
      vi.useFakeTimers();
      popupLeft.mockReturnValue(popupDOMRectLeftBefore);
      popupTop.mockReturnValue(popupDOMRectTopBefore);
      const wrapper = getPopupInsideContainer({
        toRightFromPointerPx: 0,
        toBottomFromPointerPx: 50,
        translateYPercent: 10,
      });

      wrapper.vm.showPopup?.();
      await nextTick();

      if (stylePopupLeft !== undefined) expect(wrapper.element.style.left).toBe(`${stylePopupLeft}px`);

      if (stylePopupTop !== undefined) expect(wrapper.element.style.top).toBe(`${stylePopupTop}px`);
    },
  );

  test.each`
    popupDOMRectLeftBefore | popupDOMRectTopBefore | stylePopupLeft | stylePopupTop
    ${0}                   | ${0}                  | ${0}           | ${120}
    ${0}                   | ${800}                | ${0}           | ${undefined}
    ${800}                 | ${0}                  | ${undefined}   | ${120}
    ${0}                   | ${900}                | ${0}           | ${undefined}
    ${900}                 | ${0}                  | ${undefined}   | ${120}
    ${900}                 | ${900}                | ${undefined}   | ${undefined}
  `(
    `Позиционирование попапа относительно контейнера.
    Предполагается, что событие открытия попапа вызывается только внутри контейнера.
    В случае выхода границы попапа по вертикали - отзеркаливание попапа относительно курсора.
    В случае выхода границы попапа на горизонтали - сдвигаем попап до границы контейнера.
    Попап по умолчанию соприкасается с курсором правым/нижним краем.
    `,
    async ({ popupDOMRectLeftBefore, popupDOMRectTopBefore, stylePopupLeft, stylePopupTop }) => {
      vi.useFakeTimers();
      popupLeft.mockReturnValue(popupDOMRectLeftBefore);
      popupTop.mockReturnValue(popupDOMRectTopBefore);
      const wrapper = getPopupInsideContainer({
        toLeftFromPointerPx: 0,
        toTopFromPointerPx: 50,
        translateYPercent: 10,
      });

      wrapper.vm.showPopup?.();
      await nextTick();

      if (stylePopupLeft !== undefined) expect(wrapper.element.style.left).toBe(`${stylePopupLeft}px`);

      if (stylePopupTop !== undefined) expect(wrapper.element.style.top).toBe(`${stylePopupTop}px`);
    },
  );
});
