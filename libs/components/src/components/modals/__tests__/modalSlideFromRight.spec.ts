import { ref } from 'vue';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { DialogPanel, DialogTitle } from '@headlessui/vue';
import IconCross24 from '@comp/components/icons/IconCross24.vue';
import AppModalBase from '@comp/components/modals/AppModalBase.vue';
import ModalSlideFromRight from '@comp/components/modals/ModalSlideFromRight.vue';

const getModalSlideFromRight = () =>
  mount(ModalSlideFromRight, {
    attachTo: document.body,
    slots: {
      default: '<button />',
      header: 'headerSlot',
    },
  });

describe('Компонент ModalSlideFromRight', () => {
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

    vi.mock('@comp/components/utils/hooks/useBreakpoints', () => ({
      useBreakpoints: () => ({
        smaller: () => ref(false),
      }),
    }));
  });

  test('При монтировании компонента, изначально модальное окно не отображается', async () => {
    const wrapper = getModalSlideFromRight();
    await vi.runAllTimersAsync();

    expect(wrapper.getComponent(AppModalBase).isVisible()).toBeFalsy();
  });

  test('При выполнении expose-метода openModal модальное окно становится видимым', async () => {
    const wrapper = getModalSlideFromRight();

    expect(wrapper.getComponent(AppModalBase).isVisible()).toBeFalsy();

    wrapper.vm.openModal();
    await vi.runAllTimersAsync();

    expect(wrapper.getComponent(AppModalBase).isVisible()).toBeTruthy();

    wrapper.unmount();
  });

  test('При выполнении expose-метода closeModal модальное окно становится невидимым', async () => {
    const wrapper = getModalSlideFromRight();

    expect(wrapper.getComponent(AppModalBase).isVisible()).toBeFalsy();

    wrapper.vm.openModal();
    await vi.runAllTimersAsync();

    expect(wrapper.getComponent(AppModalBase).isVisible()).toBeTruthy();

    wrapper.vm.closeModal();
    await vi.runAllTimersAsync();

    expect(wrapper.getComponent(AppModalBase).isVisible()).toBeFalsy();
  });

  test('В модальном окне отображается крестик', async () => {
    const wrapper = getModalSlideFromRight();

    wrapper.vm.openModal();
    await vi.runAllTimersAsync();

    expect(wrapper.findComponent(IconCross24).exists()).toBeTruthy();

    wrapper.unmount();
  });

  test('Нажатие за пределы окна/Esc закрывает модальное окно', async () => {
    const wrapper = getModalSlideFromRight();
    wrapper.vm.openModal();
    await vi.runAllTimersAsync();

    expect(wrapper.getComponent(AppModalBase).isVisible()).toBeTruthy();

    await wrapper.getComponent(DialogPanel).trigger('keydown', { key: 'Escape' });
    await vi.runAllTimersAsync();

    expect(wrapper.getComponent(AppModalBase).isVisible()).toBeFalsy();
  });

  test('Слот хэдера в AppModalBase задан', async () => {
    const wrapper = getModalSlideFromRight();

    wrapper.vm.openModal();
    await vi.runAllTimersAsync();

    expect(wrapper.getComponent(DialogTitle).text()).toBe('headerSlot');
  });
});
