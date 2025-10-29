import { beforeEach, describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import IconCross24 from '@comp/components/icons/IconCross24.vue';
import AppModalBase from '@comp/components/modals/AppModalBase.vue';
import AppModalBaseBackdrop from '@comp/components/modals/AppModalBaseBackdrop.vue';

const getAppModalBase = (props?: Partial<InstanceType<typeof AppModalBase>['$props']>) =>
  mount(AppModalBase, {
    props: {
      position: 'left',
      withCloseCross: true,
      withBackdrop: true,
      openImmediately: false,
      ...props,
    },
    attachTo: document.body,
    slots: {
      header: '<div/>',
      default: '<button />',
    },
  });

describe('Компонент AppModalBase', () => {
  beforeEach(() => {
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
    vi.useFakeTimers();
    const wrapper = getAppModalBase();
    await vi.runAllTimersAsync();

    expect(wrapper.isVisible()).toBeFalsy();
  });

  test('Если задан проп openImmediately=true, то модальное окно изначально отображается', async () => {
    vi.useFakeTimers();
    const wrapper = getAppModalBase({ openImmediately: true });
    await vi.runAllTimersAsync();

    expect(wrapper.isVisible()).toBeTruthy();
  });

  test('При выполнении expose-метода openModal модальное окно становится видимым', async () => {
    vi.useFakeTimers();
    const wrapper = getAppModalBase();

    expect(wrapper.isVisible()).toBeFalsy();

    wrapper.vm.openModal();
    await vi.runAllTimersAsync();

    expect(wrapper.isVisible()).toBeTruthy();
  });

  test('При выполнении expose-метода closeModal модальное окно становится невидимым и вызывается эмит onClose', async () => {
    vi.useFakeTimers();
    const wrapper = getAppModalBase();

    expect(wrapper.isVisible()).toBeFalsy();

    wrapper.vm.openModal();
    await vi.runAllTimersAsync();

    expect(wrapper.isVisible()).toBeTruthy();
    expect(wrapper.emitted('onClose')).toBeUndefined();

    wrapper.vm.closeModal();
    await vi.runAllTimersAsync();

    expect(wrapper.isVisible()).toBeFalsy();
    expect(wrapper.emitted('onClose')).toHaveLength(1);
  });

  test('Если задан проп withCloseCross=true, то в модальном окне отображается крестик при нажатии на который становится невидимым окно,вызывается эмит onClose', async () => {
    vi.useFakeTimers();
    const wrapper = getAppModalBase({ openImmediately: true });
    await vi.runAllTimersAsync();

    expect(wrapper.findComponent(IconCross24).exists()).toBeTruthy();

    await wrapper.findComponent(IconCross24).trigger('click');
    await vi.runAllTimersAsync();

    expect(wrapper.isVisible()).toBeFalsy();
    expect(wrapper.emitted('onClose')).toHaveLength(1);

    await wrapper.setProps({ withCloseCross: false });

    expect(wrapper.findComponent(IconCross24).exists()).toBeFalsy();
  });

  test('Если задан проп withBackdrop=true, то модальное окно отображается поверх затемненного фона', async () => {
    vi.useFakeTimers();
    const wrapper = getAppModalBase({ openImmediately: true });
    await vi.runAllTimersAsync();

    expect(wrapper.findComponent(AppModalBaseBackdrop).exists()).toBeTruthy();

    await wrapper.setProps({ withBackdrop: false });
    await vi.runAllTimersAsync();

    expect(wrapper.findComponent(AppModalBaseBackdrop).exists()).toBeFalsy();
  });
});
