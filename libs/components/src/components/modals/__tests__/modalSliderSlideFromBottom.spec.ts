import { beforeEach, describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { DialogPanel, DialogTitle } from '@headlessui/vue';
import AppLink from '@comp/components/app-link/AppLink.vue';
import IconCross24 from '@comp/components/icons/IconCross24.vue';
import TextButton from '@comp/components/buttons/TextButton.vue';
import AppModalBase from '@comp/components/modals/AppModalBase.vue';
import ModalSliderSlideFromBottom from '@comp/components/modals/ModalSliderSlideFromBottom.vue';

const getModalSliderSlideFromBottom = (props?: Partial<InstanceType<typeof ModalSliderSlideFromBottom>['$props']>) =>
  mount(ModalSliderSlideFromBottom, {
    props: {
      activatePrevPoint: vi.fn(),
      activateNextPoint: vi.fn(),
      isFirst: true,
      isLast: false,
      transitionKey: 'key',
      ...props,
    },
    attachTo: document.body,
    slots: {
      default: '<button />',
    },
    global: {
      directives: {
        twMerge: {},
      },
    },
  });

describe('Компонент ModalSliderSlideFromBottom', () => {
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
    const wrapper = getModalSliderSlideFromBottom();
    await vi.runAllTimersAsync();

    expect(wrapper.getComponent(AppModalBase).isVisible()).toBeFalsy();
  });

  test('При выполнении expose-метода openModal модальное окно становится видимым', async () => {
    const wrapper = getModalSliderSlideFromBottom();

    expect(wrapper.getComponent(AppModalBase).isVisible()).toBeFalsy();

    wrapper.vm.openModal();
    await vi.runAllTimersAsync();

    expect(wrapper.getComponent(AppModalBase).isVisible()).toBeTruthy();

    wrapper.unmount();
  });

  test('При выполнении expose-метода closeModal модальное окно становится невидимым и вызывается эмит modal:close', async () => {
    const wrapper = getModalSliderSlideFromBottom();

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
    const wrapper = getModalSliderSlideFromBottom();

    wrapper.vm.openModal();
    await vi.runAllTimersAsync();

    expect(wrapper.findComponent(IconCross24).exists()).toBeFalsy();

    wrapper.unmount();
  });

  test('При закрытии модального окна нажатием за пределы окна/Esc вызывается эмит modal:close', async () => {
    const wrapper = getModalSliderSlideFromBottom();
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
    const wrapper = getModalSliderSlideFromBottom();

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
    const wrapper = getModalSliderSlideFromBottom();

    wrapper.vm.openModal();
    await vi.runAllTimersAsync();

    expect(wrapper.getComponent(DialogTitle).text()).toBe('');

    wrapper.unmount();
  });

  test('При свайпе влево вызывается проп activateNextPoint', async () => {
    const wrapper = getModalSliderSlideFromBottom();

    wrapper.vm.openModal();
    await vi.runAllTimersAsync();

    expect(wrapper.vm.$props.activateNextPoint).toHaveBeenCalledTimes(0);

    const swipeField = document.querySelector('[data-test="testSlider"]') as HTMLElement;
    swipeField.dispatchEvent(new MouseEvent('mousedown', { clientX: 100, clientY: 10 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 10 }));
    swipeField.dispatchEvent(new MouseEvent('mouseup'));
    await vi.runAllTimersAsync();

    expect(wrapper.vm.$props.activateNextPoint).toHaveBeenCalledTimes(1);

    wrapper.unmount();
  });

  test('При свайпе вправо вызывается проп activatePrevPoint', async () => {
    const wrapper = getModalSliderSlideFromBottom();

    wrapper.vm.openModal();
    await vi.runAllTimersAsync();

    expect(wrapper.vm.$props.activateNextPoint).toHaveBeenCalledTimes(0);

    const swipeField = document.querySelector('[data-test="testSlider"]') as HTMLElement;
    swipeField.dispatchEvent(new MouseEvent('mousedown', { clientX: 10, clientY: 10 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 10 }));
    swipeField.dispatchEvent(new MouseEvent('mouseup'));
    await vi.runAllTimersAsync();

    expect(wrapper.vm.$props.activatePrevPoint).toHaveBeenCalledTimes(1);

    wrapper.unmount();
  });

  test('Стрелка влево недоступна, если текущий слайд - первый', async () => {
    const wrapper = getModalSliderSlideFromBottom();

    wrapper.vm.openModal();
    await vi.runAllTimersAsync();

    expect(wrapper.findAllComponents(AppLink)[0].vm.isDisabled).toBeTruthy();

    wrapper.unmount();
  });

  test('Стрелка вправо недоступна, если текущий слайд - первый', async () => {
    const wrapper = getModalSliderSlideFromBottom({ isLast: true });

    wrapper.vm.openModal();
    await vi.runAllTimersAsync();

    expect(wrapper.findAllComponents(AppLink)[1].vm.isDisabled).toBeTruthy();

    wrapper.unmount();
  });

  test('При нажатии на кнопку "Закрыть" на модальном окне вызывается эмит modal:close', async () => {
    const wrapper = getModalSliderSlideFromBottom();

    wrapper.vm.openModal();
    await vi.runAllTimersAsync();

    expect(wrapper.emitted('modal:close')).toBeUndefined();

    await wrapper.getComponent(TextButton).trigger('click');

    expect(wrapper.emitted('modal:close')).toHaveLength(1);
  });
});
