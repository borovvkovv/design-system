import { beforeEach, describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import AppLink from '@comp/components/app-link/AppLink.vue';
import TextButton from '@comp/components/buttons/TextButton.vue';
import ModalSlider from '@comp/components/modals/ModalSlider.vue';

const getModalSlideFromBottom = (props?: Partial<InstanceType<typeof ModalSlider>['$props']>) =>
  mount(ModalSlider, {
    props: {
      activatePrevPoint: vi.fn(),
      activateNextPoint: vi.fn(),
      isFirst: true,
      isLast: false,
      transitionKey: 'key',
      ...props,
    },
    slots: {
      default: '<div />',
    },
    global: {
      directives: {
        twMerge: {},
      },
    },
    attachTo: document.body,
  });

describe('Компонент ModalSlider', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  test('При свайпе влево вызывается проп activateNextPoint', async () => {
    const wrapper = getModalSlideFromBottom();
    await vi.runAllTimersAsync();

    expect(wrapper.vm.$props.activateNextPoint).toHaveBeenCalledTimes(0);

    const swipeField = wrapper.find('[data-test="testSlider"]').element;
    swipeField.dispatchEvent(new MouseEvent('mousedown', { clientX: 100, clientY: 10 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 10 }));
    swipeField.dispatchEvent(new MouseEvent('mouseup'));
    await vi.runAllTimersAsync();

    expect(wrapper.vm.$props.activateNextPoint).toHaveBeenCalledTimes(1);
  });

  test('При свайпе вправо вызывается проп activatePrevPoint', async () => {
    const wrapper = getModalSlideFromBottom();
    await vi.runAllTimersAsync();

    expect(wrapper.vm.$props.activateNextPoint).toHaveBeenCalledTimes(0);

    const swipeField = wrapper.find('[data-test="testSlider"]').element;
    swipeField.dispatchEvent(new MouseEvent('mousedown', { clientX: 10, clientY: 10 }));
    swipeField.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 10 }));
    swipeField.dispatchEvent(new MouseEvent('mouseup'));
    await vi.runAllTimersAsync();

    expect(wrapper.vm.$props.activatePrevPoint).toHaveBeenCalledTimes(1);
  });

  test('Стрелка влево недоступна, если текущий слайд - первый', async () => {
    const wrapper = getModalSlideFromBottom();
    await vi.runAllTimersAsync();

    expect(wrapper.findAllComponents(AppLink)[0].vm.isDisabled).toBeTruthy();
  });

  test('Стрелка вправо недоступна, если текущий слайд - первый', async () => {
    const wrapper = getModalSlideFromBottom({ isLast: true });
    await vi.runAllTimersAsync();

    expect(wrapper.findAllComponents(AppLink)[1].vm.isDisabled).toBeTruthy();
  });

  test('При нажатии на кнопку "Закрыть" на модальном окне вызывается эмит click:close', async () => {
    const wrapper = getModalSlideFromBottom();
    await vi.runAllTimersAsync();

    expect(wrapper.emitted('click:close')).toBeUndefined();

    await wrapper.getComponent(TextButton).trigger('click');

    expect(wrapper.emitted('click:close')).toHaveLength(1);
  });
});
