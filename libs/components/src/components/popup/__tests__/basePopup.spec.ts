import { nextTick } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BasePopup from '@comp/components/popup/BasePopup.vue';

const getClientRect = (width: number, height: number): DOMRect => ({
  x: 20,
  y: 20,
  top: 20,
  left: 20,
  right: 120,
  bottom: 120,
  width,
  height,
  toJSON: () => {},
});

const getBasePopup = (props?: Partial<InstanceType<typeof BasePopup>['$props']>) =>
  mount(BasePopup, {
    props,
    slots: { default: '<div />' },
  });

describe('Компонент BasePopup', () => {
  test('При монтировании компонента он изначально не виден', () => {
    const wrapper = getBasePopup();

    expect(wrapper.isVisible()).toBeFalsy();
  });

  test('При выполнении expose-метода showPopup попап появляется сразу', async () => {
    vi.useFakeTimers();
    const wrapper = getBasePopup();

    expect(wrapper.isVisible()).toBeFalsy();

    wrapper.vm.showPopup();
    await nextTick();

    expect(wrapper.isVisible()).toBeTruthy();
  });

  test('При выполнении expose-метода closePopup попап исчезает сразу', async () => {
    vi.useFakeTimers();
    const wrapper = getBasePopup();

    expect(wrapper.isVisible()).toBeFalsy();

    wrapper.vm.showPopup();
    await nextTick();

    expect(wrapper.isVisible()).toBeTruthy();

    wrapper.vm.closePopup();
    await nextTick();

    expect(wrapper.isVisible()).toBeFalsy();
  });

  test(`При выполнении expose-метода throttledOpenPopupAfter возвращается метод открытия попапа через N миллисекунд.
  Если до этого времени вызвать метод еще раз, то метод повторно не сработает`, async () => {
    vi.useFakeTimers();
    const wrapper = getBasePopup();

    const showPopup = wrapper.vm.throttledOpenPopupAfter(1000);
    showPopup();

    await vi.advanceTimersByTime(100);
    showPopup();

    await vi.advanceTimersByTime(800);
    expect(wrapper.isVisible()).toBeFalsy();
    showPopup();

    await vi.advanceTimersByTime(100);

    expect(wrapper.isVisible()).toBeTruthy();
  });

  test(`При выполнении expose-метода throttledClosePopupAfter возвращается метод закрытия попапа через N миллисекунд.
  Если до этого времени вызвать метод еще раз, то метод повторно не сработает`, async () => {
    vi.useFakeTimers();
    const wrapper = getBasePopup();

    wrapper.vm.showPopup();
    await nextTick();

    const closePopup = wrapper.vm.throttledClosePopupAfter(1000);
    closePopup();

    await vi.advanceTimersByTime(100);
    closePopup();

    await vi.advanceTimersByTime(800);
    expect(wrapper.isVisible()).toBeTruthy();
    closePopup();

    await vi.advanceTimersByTime(100);

    expect(wrapper.isVisible()).toBeFalsy();
  });

  test('Expose-свойство isShown указывает открыт или закрыт ли попап', async () => {
    vi.useFakeTimers();
    const wrapper = getBasePopup();

    expect(wrapper.vm.isShown).toBeFalsy();

    wrapper.vm.showPopup();
    await nextTick();

    expect(wrapper.vm.isShown).toBeTruthy();

    wrapper.vm.closePopup();
    await nextTick();

    expect(wrapper.vm.isShown).toBeFalsy();
  });

  test('При открытии попапа любым способом вызывается эмит popup:open', async () => {
    vi.useFakeTimers();
    const wrapper = getBasePopup();

    expect(wrapper.emitted('popup:open')).toBeUndefined();

    wrapper.vm.showPopup();
    await nextTick();

    expect(wrapper.emitted('popup:open')).toHaveLength(1);

    wrapper.vm.closePopup();
    await nextTick();

    const showPopup = wrapper.vm.throttledOpenPopupAfter(1000);
    showPopup();
    await vi.advanceTimersByTime(1000);

    expect(wrapper.emitted('popup:open')).toHaveLength(2);
  });

  test('При скролле попап закрывается', async () => {
    vi.useFakeTimers();
    const wrapper = getBasePopup();

    wrapper.vm.showPopup();
    await nextTick();

    expect(wrapper.isVisible()).toBeTruthy();

    wrapper.vm.closePopup();
    await wrapper.trigger('scroll');

    expect(wrapper.isVisible()).toBeFalsy();
  });

  test('При выводе курсора за пределы компонента вызывается эмит popup:mouseleave', async () => {
    const wrapper = getBasePopup();

    expect(wrapper.emitted('popup:mouseleave')).toBeUndefined();

    wrapper.vm.showPopup();
    await nextTick();

    await wrapper.trigger('mouseleave');

    expect(wrapper.emitted('popup:mouseleave')).toHaveLength(1);
  });

  test.each`
    translateXPercent | translateYPercent | position                                                   | popupLeft | popupTop
    ${0}              | ${0}              | ${{}}                                                      | ${400}    | ${400}
    ${0}              | ${0}              | ${{ toLeftFromPointerPx: 20 }}                             | ${280}    | ${400}
    ${0}              | ${0}              | ${{ toTopFromPointerPx: 40 }}                              | ${400}    | ${260}
    ${0}              | ${0}              | ${{ toRightFromPointerPx: 20 }}                            | ${420}    | ${400}
    ${0}              | ${0}              | ${{ toBottomFromPointerPx: 40 }}                           | ${400}    | ${440}
    ${0}              | ${0}              | ${{ toLeftFromPointerPx: 20, toTopFromPointerPx: 40 }}     | ${280}    | ${260}
    ${0}              | ${0}              | ${{ toRightFromPointerPx: 20, toBottomFromPointerPx: 40 }} | ${420}    | ${440}
    ${0}              | ${0}              | ${{ toLeftFromPointerPx: 20, toBottomFromPointerPx: 40 }}  | ${280}    | ${440}
    ${0}              | ${0}              | ${{ toRightFromPointerPx: 20, toTopFromPointerPx: 40 }}    | ${420}    | ${260}
    ${0}              | ${20}             | ${{}}                                                      | ${400}    | ${420}
    ${10}             | ${0}              | ${{}}                                                      | ${410}    | ${400}
    ${10}             | ${20}             | ${{}}                                                      | ${410}    | ${420}
    ${10}             | ${-20}            | ${{}}                                                      | ${410}    | ${380}
    ${-10}            | ${20}             | ${{}}                                                      | ${390}    | ${420}
    ${-10}            | ${-20}            | ${{}}                                                      | ${390}    | ${380}
    ${10}             | ${10}             | ${{ toLeftFromPointerPx: 20 }}                             | ${290}    | ${410}
    ${10}             | ${-10}            | ${{ toTopFromPointerPx: 40 }}                              | ${410}    | ${250}
    ${-10}            | ${10}             | ${{ toRightFromPointerPx: 20 }}                            | ${410}    | ${410}
    ${-10}            | ${-10}            | ${{ toBottomFromPointerPx: 40 }}                           | ${390}    | ${430}
    ${10}             | ${10}             | ${{ toLeftFromPointerPx: 20, toTopFromPointerPx: 40 }}     | ${290}    | ${270}
    ${10}             | ${-10}            | ${{ toRightFromPointerPx: 20, toBottomFromPointerPx: 40 }} | ${430}    | ${430}
    ${-10}            | ${10}             | ${{ toLeftFromPointerPx: 20, toBottomFromPointerPx: 40 }}  | ${270}    | ${450}
    ${-10}            | ${-10}            | ${{ toRightFromPointerPx: 20, toTopFromPointerPx: 40 }}    | ${410}    | ${250}
  `(
    `При показе попапа через expose-метод showPopup с координатами курсора (400,400), с параметрами попапа: translateXPercent:$translateXPercent,
    translateYPercent:$translateYPercent, position:$position. Координаты попапа будут left:$popupLeft, top:$popupTop`,
    async ({ translateXPercent, translateYPercent, position, popupLeft, popupTop }) => {
      vi.useFakeTimers();
      vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue(getClientRect(100, 100));
      const wrapper = getBasePopup({ translateXPercent, translateYPercent, ...position });

      wrapper.vm.showPopup(400, 400);
      await nextTick();

      expect(wrapper.element.style.left).toBe(`${popupLeft}px`);
      expect(wrapper.element.style.top).toBe(`${popupTop}px`);
    },
  );

  test.each`
    translateXPercent | translateYPercent | position                                                   | popupLeft | popupTop
    ${0}              | ${0}              | ${{}}                                                      | ${400}    | ${400}
    ${0}              | ${0}              | ${{ toLeftFromPointerPx: 20 }}                             | ${280}    | ${400}
    ${0}              | ${0}              | ${{ toTopFromPointerPx: 40 }}                              | ${400}    | ${260}
    ${0}              | ${0}              | ${{ toRightFromPointerPx: 20 }}                            | ${420}    | ${400}
    ${0}              | ${0}              | ${{ toBottomFromPointerPx: 40 }}                           | ${400}    | ${440}
    ${0}              | ${0}              | ${{ toLeftFromPointerPx: 20, toTopFromPointerPx: 40 }}     | ${280}    | ${260}
    ${0}              | ${0}              | ${{ toRightFromPointerPx: 20, toBottomFromPointerPx: 40 }} | ${420}    | ${440}
    ${0}              | ${0}              | ${{ toLeftFromPointerPx: 20, toBottomFromPointerPx: 40 }}  | ${280}    | ${440}
    ${0}              | ${0}              | ${{ toRightFromPointerPx: 20, toTopFromPointerPx: 40 }}    | ${420}    | ${260}
    ${0}              | ${20}             | ${{}}                                                      | ${400}    | ${420}
    ${10}             | ${0}              | ${{}}                                                      | ${410}    | ${400}
    ${10}             | ${20}             | ${{}}                                                      | ${410}    | ${420}
    ${10}             | ${-20}            | ${{}}                                                      | ${410}    | ${380}
    ${-10}            | ${20}             | ${{}}                                                      | ${390}    | ${420}
    ${-10}            | ${-20}            | ${{}}                                                      | ${390}    | ${380}
    ${10}             | ${10}             | ${{ toLeftFromPointerPx: 20 }}                             | ${290}    | ${410}
    ${10}             | ${-10}            | ${{ toTopFromPointerPx: 40 }}                              | ${410}    | ${250}
    ${-10}            | ${10}             | ${{ toRightFromPointerPx: 20 }}                            | ${410}    | ${410}
    ${-10}            | ${-10}            | ${{ toBottomFromPointerPx: 40 }}                           | ${390}    | ${430}
    ${10}             | ${10}             | ${{ toLeftFromPointerPx: 20, toTopFromPointerPx: 40 }}     | ${290}    | ${270}
    ${10}             | ${-10}            | ${{ toRightFromPointerPx: 20, toBottomFromPointerPx: 40 }} | ${430}    | ${430}
    ${-10}            | ${10}             | ${{ toLeftFromPointerPx: 20, toBottomFromPointerPx: 40 }}  | ${270}    | ${450}
    ${-10}            | ${-10}            | ${{ toRightFromPointerPx: 20, toTopFromPointerPx: 40 }}    | ${410}    | ${250}
  `(
    `При показе попапа через expose-метод throttledOpenPopupAfter с координатами курсора (400,400), с параметрами попапа: translateXPercent:$translateXPercent,
    translateYPercent:$translateYPercent, position:$position. Координаты попапа будут left:$popupLeft, top:$popupTop`,
    async ({ translateXPercent, translateYPercent, position, popupLeft, popupTop }) => {
      vi.useFakeTimers();
      vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue(getClientRect(100, 100));
      const wrapper = getBasePopup({ translateXPercent, translateYPercent, ...position });

      const showPopup = wrapper.vm.throttledOpenPopupAfter(1000);
      showPopup(400, 400);
      await vi.advanceTimersByTime(1000);

      expect(wrapper.element.style.left).toBe(`${popupLeft}px`);
      expect(wrapper.element.style.top).toBe(`${popupTop}px`);
    },
  );

  test.each`
    pointerX | pointerY | isOnPopup
    ${0}     | ${0}     | ${false}
    ${10}    | ${10}    | ${false}
    ${20}    | ${10}    | ${false}
    ${60}    | ${10}    | ${false}
    ${120}   | ${10}    | ${false}
    ${140}   | ${10}    | ${false}
    ${140}   | ${20}    | ${false}
    ${140}   | ${60}    | ${false}
    ${140}   | ${120}   | ${false}
    ${140}   | ${140}   | ${false}
    ${120}   | ${140}   | ${false}
    ${60}    | ${140}   | ${false}
    ${20}    | ${140}   | ${false}
    ${10}    | ${140}   | ${false}
    ${10}    | ${120}   | ${false}
    ${10}    | ${60}    | ${false}
    ${10}    | ${20}    | ${false}
    ${20}    | ${20}    | ${true}
    ${60}    | ${20}    | ${true}
    ${120}   | ${20}    | ${true}
    ${120}   | ${60}    | ${true}
    ${120}   | ${120}   | ${true}
    ${60}    | ${120}   | ${true}
    ${20}    | ${120}   | ${true}
    ${20}    | ${60}    | ${true}
    ${60}    | ${60}    | ${true}
  `(
    'Вызов expose-метода checkIsPointerOnPopup с координатами ($pointerX, $pointerY) возвращает $isOnPopup',
    async ({ pointerX, pointerY, isOnPopup }) => {
      vi.useFakeTimers();
      vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue(getClientRect(100, 100));
      const wrapper = getBasePopup();

      wrapper.vm.showPopup();
      await nextTick();

      expect(wrapper.vm.checkIsPointerOnPopup(pointerX, pointerY)).toBe(isOnPopup);
    },
  );
});
