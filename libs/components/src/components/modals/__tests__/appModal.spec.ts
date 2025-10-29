import { beforeEach, describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { DialogPanel } from '@headlessui/vue';
import AppModal from '@comp/components/modals/AppModal.vue';
import IconCross24 from '@comp/components/icons/IconCross24.vue';

const getAppModal = (props?: Partial<InstanceType<typeof AppModal>['$props']>) =>
  mount(AppModal, {
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

describe('Компонент AppModal', () => {
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
    const wrapper = getAppModal();
    await vi.runAllTimersAsync();

    expect(wrapper.isVisible()).toBeFalsy();
  });

  test('Если задан проп openImmediately=true, то модальное окно изначально отображается', async () => {
    vi.useFakeTimers();
    const wrapper = getAppModal({ openImmediately: true });
    await vi.runAllTimersAsync();

    expect(wrapper.isVisible()).toBeTruthy();
  });

  test('При выполнении expose-метода openModal модальное окно становится видимым', async () => {
    vi.useFakeTimers();
    const wrapper = getAppModal();

    expect(wrapper.isVisible()).toBeFalsy();

    wrapper.vm.openModal();
    await vi.runAllTimersAsync();

    expect(wrapper.isVisible()).toBeTruthy();
  });

  test('При выполнении expose-метода closeModal модальное окно становится невидимым и вызывается эмит onClose', async () => {
    vi.useFakeTimers();
    const wrapper = getAppModal();

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

  test('Если задан проп withCloseCross=true, то в модальном окне отображается крестик при нажатии на который становится невидимым окно, вызывается эмит onClose', async () => {
    vi.useFakeTimers();
    const wrapper = getAppModal({ openImmediately: true });
    await vi.runAllTimersAsync();

    expect(wrapper.findComponent(IconCross24).exists()).toBeTruthy();

    await wrapper.findComponent(IconCross24).trigger('click');
    await vi.runAllTimersAsync();

    expect(wrapper.isVisible()).toBeFalsy();
    expect(wrapper.emitted('onClose')).toHaveLength(1);

    await wrapper.setProps({ withCloseCross: false });

    expect(wrapper.findComponent(IconCross24).exists()).toBeFalsy();
  });

  test('Если слот хэдера задан, то он оборачивается в div с верхним марджином', async () => {
    vi.useFakeTimers();
    const wrapper = getAppModal({ openImmediately: true });
    await vi.runAllTimersAsync();

    expect(wrapper.getComponent(DialogPanel).find('[data-test="slotHeaderWrapper"]').exists()).toBeTruthy();
  });

  test('Если слот хэдера не задан, то обертка-div с верхним марджином не отображается', async () => {
    vi.useFakeTimers();
    const wrapper = mount(AppModal, {
      props: {
        openImmediately: true,
      },
      attachTo: document.body,
      slots: {
        default: '<button />',
      },
    });
    await vi.runAllTimersAsync();

    expect(wrapper.getComponent(DialogPanel).find('[data-test="slotHeaderWrapper"]').exists()).toBeFalsy();
  });
});
