import { beforeEach, describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { DialogPanel, DialogTitle } from '@headlessui/vue';
import IconCross24 from '@comp/components/icons/IconCross24.vue';
import AppModalBase from '@comp/components/modals/AppModalBase.vue';
import ModalSlideFromBottom from '@comp/components/modals/ModalSlideFromBottom.vue';

const getModalSlideFromBottom = () =>
  mount(ModalSlideFromBottom, {
    attachTo: document.body,
    slots: {
      default: '<button />',
    },
  });

describe('Компонент ModalSlideFromBottom', () => {
  beforeEach(() => {
    vi.useFakeTimers();

    vi.stubGlobal(
      'ResizeObserver',
      vi.fn(() => ({
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      })),
    );
  });

  test('При монтировании компонента, изначально модальное окно не отображается', async () => {
    const wrapper = getModalSlideFromBottom();
    await vi.runAllTimersAsync();

    expect(wrapper.getComponent(AppModalBase).isVisible()).toBeFalsy();
  });

  test('При выполнении expose-метода openModal модальное окно становится видимым', async () => {
    const wrapper = getModalSlideFromBottom();

    expect(wrapper.getComponent(AppModalBase).isVisible()).toBeFalsy();

    wrapper.vm.openModal();
    await vi.runAllTimersAsync();

    expect(wrapper.getComponent(AppModalBase).isVisible()).toBeTruthy();

    wrapper.unmount();
  });

  test('При выполнении expose-метода closeModal модальное окно становится невидимым и вызывается эмит modal:close', async () => {
    const wrapper = getModalSlideFromBottom();

    expect(wrapper.getComponent(AppModalBase).isVisible()).toBeFalsy();

    wrapper.vm.openModal();
    await vi.runAllTimersAsync();

    expect(wrapper.getComponent(AppModalBase).isVisible()).toBeTruthy();
    expect(wrapper.emitted('modal:close')).toBeUndefined();

    wrapper.vm.closeModal();
    await vi.runAllTimersAsync();

    expect(wrapper.getComponent(AppModalBase).isVisible()).toBeFalsy();
    expect(wrapper.emitted('modal:close')).toHaveLength(1);
  });

  test('В модальном окне не отображается крестик', async () => {
    const wrapper = getModalSlideFromBottom();

    wrapper.vm.openModal();
    await vi.runAllTimersAsync();

    expect(wrapper.findComponent(IconCross24).exists()).toBeFalsy();

    wrapper.unmount();
  });

  test('При закрытии модального окна нажатием за пределы окна/Esc вызывается эмит modal:close', async () => {
    const wrapper = getModalSlideFromBottom();
    wrapper.vm.openModal();
    await vi.runAllTimersAsync();

    expect(wrapper.getComponent(AppModalBase).isVisible()).toBeTruthy();
    expect(wrapper.emitted('modal:close')).toBeUndefined();

    await wrapper.getComponent(DialogPanel).trigger('keydown', { key: 'Escape' });
    await vi.runAllTimersAsync();

    expect(wrapper.getComponent(AppModalBase).isVisible()).toBeFalsy();
    expect(wrapper.emitted('modal:close')).toHaveLength(1);
  });

  test('При свайпе вниз по контейнеру модального окна оно закрывается, вызывается эмит modal:close', async () => {
    const wrapper = getModalSlideFromBottom();

    wrapper.vm.openModal();
    await vi.runAllTimersAsync();

    const swipeField = document.querySelector('[data-test="modalContainer"]') as HTMLElement;
    expect(wrapper.getComponent(AppModalBase).isVisible()).toBeTruthy();
    expect(wrapper.emitted('modal:close')).toBeUndefined();

    swipeField.dispatchEvent(new MouseEvent('mousedown', { clientX: 10, clientY: 10 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 100 }));
    swipeField.dispatchEvent(new MouseEvent('mouseup'));
    await vi.runAllTimersAsync();

    expect(wrapper.getComponent(AppModalBase).isVisible()).toBeFalsy();
    expect(wrapper.emitted('modal:close')).toHaveLength(1);
  });

  test('Слот хэдера в AppModalBase не задан', async () => {
    const wrapper = getModalSlideFromBottom();

    wrapper.vm.openModal();
    await vi.runAllTimersAsync();

    expect(wrapper.getComponent(DialogTitle).text()).toBe('');
  });
});
