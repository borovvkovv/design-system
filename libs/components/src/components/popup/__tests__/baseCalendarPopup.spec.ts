import { nextTick } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseCalendarPopup from '@comp/components/popup/BaseCalendarPopup.vue';

const getBaseCalendarPopup = () =>
  mount(BaseCalendarPopup, {
    props: { container: undefined, text: 'Test text' },
  });

describe('Компонент BaseCalendarPopup', () => {
  test('Попап отображает текст из пропа', async () => {
    vi.useFakeTimers();
    const wrapper = getBaseCalendarPopup();

    wrapper.vm.showPopup(new MouseEvent(''));
    await nextTick();

    expect(wrapper.text()).toBe('Test text');
  });

  test('При выполнении expose-метода showPopup попап появляется сразу', async () => {
    vi.useFakeTimers();
    const wrapper = getBaseCalendarPopup();

    expect(wrapper.isVisible()).toBeFalsy();

    wrapper.vm.showPopup(new MouseEvent(''));
    await nextTick();

    expect(wrapper.isVisible()).toBeTruthy();
  });

  test('При выполнении expose-метода closePopup попап исчезает сразу', async () => {
    vi.useFakeTimers();
    const wrapper = getBaseCalendarPopup();

    expect(wrapper.isVisible()).toBeFalsy();

    wrapper.vm.showPopup(new MouseEvent(''));
    await nextTick();

    expect(wrapper.isVisible()).toBeTruthy();

    wrapper.vm.closePopup();
    await nextTick();

    expect(wrapper.isVisible()).toBeFalsy();
  });

  test(`При выполнении expose-метода throttledClosePopupAfter возвращается метод закрытия попапа через N миллисекунд.
  Если до этого времени вызвать метод еще раз, то метод повторно не сработает`, async () => {
    vi.useFakeTimers();
    const wrapper = getBaseCalendarPopup();

    wrapper.vm.showPopup(new MouseEvent(''));
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
});
