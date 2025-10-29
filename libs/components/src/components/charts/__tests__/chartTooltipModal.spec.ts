import { beforeEach, describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ChartTooltipModal from '@comp/components/charts/tooltips/ChartTooltipModal.vue';
import ChartTooltipModalBody from '@comp/components/charts/tooltips/modal-tooltip/ChartTooltipModalBody.vue';

const getChartTooltipModal = (props?: Partial<InstanceType<typeof ChartTooltipModal>['$props']>) =>
  mount(ChartTooltipModal, {
    props: {
      activatePrevPoint: () => {},
      activateNextPoint: () => {},
      isFirst: false,
      isLast: false,
      xAxisLabel: 'Test xAxisLabel',
      values: [
        {
          color: '#000',
          text: 'Test text 1',
        },
        {
          color: '#fff',
          text: 'Test text 2',
        },
      ],
      tooltipTitle: 'Test tooltipTitle',
      ...props,
    },
    global: {
      directives: {
        twMerge: {},
      },
    },
    attachTo: document.body,
  });

describe('Компонент ChartTooltipModal', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'ResizeObserver',
      vi.fn(() => ({
        disconnect: () => {},
        observe: () => {},
        unobserve: () => {},
      })),
    );
  });

  test('При монтировании компонента попап не отрисовывается', async () => {
    vi.useFakeTimers();
    const wrapper = getChartTooltipModal();

    await vi.runAllTicks();
    await vi.runAllTimers();

    expect(wrapper.findComponent(ChartTooltipModalBody).exists()).toBeFalsy();
  });

  test('Попап появляется/исчезает при выполнении expose-метода openModal/closeModal', async () => {
    vi.useFakeTimers();
    const wrapper = getChartTooltipModal();

    wrapper.vm.openModal();
    await vi.runAllTicks();
    await vi.runAllTimers();

    expect(wrapper.findComponent(ChartTooltipModalBody).exists()).toBeTruthy();

    wrapper.vm.closeModal();
    await vi.runAllTicks();
    await vi.runAllTimers();

    expect(wrapper.findComponent(ChartTooltipModalBody).exists()).toBeFalsy();
  });

  test('Попап отрисовывает заголовок', async () => {
    vi.useFakeTimers();
    const wrapper = getChartTooltipModal();

    wrapper.vm.openModal();
    await vi.runAllTicks();

    expect(wrapper.findComponent(ChartTooltipModalBody).text()).toContain('Test tooltipTitle');
  });

  test('Попап отрисовывает наименование оси X', async () => {
    vi.useFakeTimers();
    const wrapper = getChartTooltipModal();

    wrapper.vm.openModal();
    await vi.runAllTicks();

    expect(wrapper.findComponent(ChartTooltipModalBody).text()).toContain('Test xAxisLabel');
  });

  test('Попап отрисовывает значения', async () => {
    vi.useFakeTimers();
    const wrapper = getChartTooltipModal();

    wrapper.vm.openModal();
    await vi.runAllTicks();

    expect(wrapper.findComponent(ChartTooltipModalBody).text()).toContain('Test text 1');
    expect(wrapper.findComponent(ChartTooltipModalBody).text()).toContain('Test text 2');
  });

  test('Если передано только одно значение, то цвет набора данных не отображается', async () => {
    vi.useFakeTimers();
    const wrapper = getChartTooltipModal({
      values: [{ color: '#000', text: 'value1' }],
    });

    wrapper.vm.openModal();
    await vi.runAllTicks();

    expect(wrapper.findComponent(ChartTooltipModalBody).findAll('[data-test="datasetColor"]')).toHaveLength(0);
  });

  test('Если передано более одного значения, то цвет набора данных отображается', async () => {
    vi.useFakeTimers();
    const wrapper = getChartTooltipModal();

    wrapper.vm.openModal();
    await vi.runAllTicks();

    expect(wrapper.findComponent(ChartTooltipModalBody).findAll('[data-test="datasetColor"]')).toHaveLength(2);
  });
});
