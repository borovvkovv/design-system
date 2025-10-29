import { describe, expect, test, vi } from 'vitest';
import { VueWrapper, mount } from '@vue/test-utils';
import { mockBoundingClientRect } from '@comp/components/__tests__/utils';
import MultiSelectChip from '@comp/components/selects/chips/MultiSelectChip.vue';
import MultiSelectChips from '@comp/components/selects/chips/MultiSelectChips.vue';
import BaseFlexibleMenu from '@comp/components/flexible-menu/BaseFlexibleMenu.vue';
import { mockResizeObserver } from '@comp/components/__tests__/utils/mockedResizeObserver';

const setFlexibleMenuParams = ({
  wrapper,
  outerContainer,
  containerWidth,
  selectedElementsLength = 3,
}: {
  wrapper: VueWrapper<any>;
  outerContainer: HTMLElement;
  containerWidth: number;
  selectedElementsLength?: number;
}): {
  menuContainer: HTMLElement;
} => {
  Array.from({ length: selectedElementsLength }).forEach((_, index) => {
    const visibleItemElement = wrapper.getComponent(BaseFlexibleMenu).vm.getVisibleMenuItems()[index] as HTMLElement;
    vi.spyOn(visibleItemElement, 'getBoundingClientRect').mockReturnValue(mockBoundingClientRect({ width: 20 }));
    visibleItemElement.style.marginLeft = '0';
    visibleItemElement.style.marginRight = '0';
  });
  const menuContainer = wrapper.getComponent(BaseFlexibleMenu).vm.$refs['menuContainer'] as HTMLElement;
  const rightBoundary = wrapper.getComponent(BaseFlexibleMenu).vm.$refs['rightBoundaryRef'] as HTMLElement;
  vi.spyOn(menuContainer, 'getBoundingClientRect').mockReturnValue(mockBoundingClientRect({ width: containerWidth }));
  vi.spyOn(outerContainer, 'getBoundingClientRect').mockReturnValue(mockBoundingClientRect({ width: containerWidth }));
  vi.spyOn(rightBoundary, 'getBoundingClientRect').mockReturnValue(mockBoundingClientRect({ width: 0 }));

  return {
    menuContainer,
  };
};

const container = document.createElement('DIV');

const getMultiSelectChips = (props?: Partial<InstanceType<typeof MultiSelectChips>['$props']>) =>
  mount(MultiSelectChips, {
    props: {
      selectedOptions: [
        { title: 'Title1', value: 'Value1' },
        { title: 'Title2', value: 'Value2' },
        { title: 'Title3', value: 'Value3' },
      ],
      disabled: false,
      container,
      ...props,
    },
    attachTo: document.body,
  });

describe('Компонент MultiSelectChips', () => {
  test('Отображает все chips-элементы', async () => {
    vi.useFakeTimers();
    const resizeObserver = mockResizeObserver();
    const wrapper = getMultiSelectChips();

    const { menuContainer } = setFlexibleMenuParams({ wrapper, outerContainer: container, containerWidth: 40 });

    resizeObserver.resize(menuContainer);
    await vi.advanceTimersByTimeAsync(100);

    expect(wrapper.findAllComponents(MultiSelectChip)).toHaveLength(3);
    expect(wrapper.find('[data-test="CollapsedMenuForChips"]').exists()).toBeFalsy();
  });

  test('В случае, если chips-элементы не помещаются на две строки, остальные скрываются за кнопкой', async () => {
    vi.useFakeTimers();
    const resizeObserver = mockResizeObserver();
    const wrapper = getMultiSelectChips();

    const { menuContainer } = setFlexibleMenuParams({ wrapper, outerContainer: container, containerWidth: 20 });

    resizeObserver.resize(menuContainer);
    await vi.advanceTimersByTimeAsync(100);

    expect(wrapper.findAllComponents(MultiSelectChip)).toHaveLength(2);
    expect(wrapper.find('[data-test="CollapsedMenuForChips"]').exists()).toBeTruthy();
  });

  test('Кнопка показывает число не поместившихся chips-элементов', async () => {
    vi.useFakeTimers();
    const resizeObserver = mockResizeObserver();
    const wrapper = getMultiSelectChips();

    const { menuContainer } = setFlexibleMenuParams({ wrapper, outerContainer: container, containerWidth: 20 });

    resizeObserver.resize(menuContainer);
    await vi.advanceTimersByTimeAsync(100);

    expect(wrapper.find('[data-test="CollapsedMenuForChips"]').text()).toBe('+ 1');
  });

  test('При нажатии на кнопку все chips-элементы отображаются', async () => {
    vi.useFakeTimers();
    const resizeObserver = mockResizeObserver();
    const wrapper = getMultiSelectChips();

    const { menuContainer } = setFlexibleMenuParams({ wrapper, outerContainer: container, containerWidth: 20 });

    resizeObserver.resize(menuContainer);
    await vi.advanceTimersByTimeAsync(100);

    expect(wrapper.findAllComponents(MultiSelectChip)).toHaveLength(2);

    await wrapper.find('[data-test="CollapsedMenuForChips"]').trigger('click');
    expect(wrapper.findAllComponents(MultiSelectChip)).toHaveLength(3);
  });

  test('При нажатии на кнопку значение в ней, показывающее количество не поместившихся элементов, меняет знак', async () => {
    vi.useFakeTimers();
    const resizeObserver = mockResizeObserver();
    const wrapper = getMultiSelectChips();

    const { menuContainer } = setFlexibleMenuParams({ wrapper, outerContainer: container, containerWidth: 20 });

    resizeObserver.resize(menuContainer);
    await vi.advanceTimersByTimeAsync(100);

    expect(wrapper.find('[data-test="CollapsedMenuForChips"]').text()).toBe('+ 1');

    await wrapper.find('[data-test="CollapsedMenuForChips"]').trigger('click');

    expect(wrapper.find('[data-test="CollapsedMenuForChips"]').text()).toBe('– 1');
  });

  test('При нажатии на chips-элемент вызывается эмит delete:selectedOption с выбранным элементом', async () => {
    vi.useFakeTimers();
    const resizeObserver = mockResizeObserver();
    const wrapper = getMultiSelectChips();

    const { menuContainer } = setFlexibleMenuParams({ wrapper, outerContainer: container, containerWidth: 40 });

    resizeObserver.resize(menuContainer);
    await vi.advanceTimersByTimeAsync(100);

    expect(wrapper.emitted('delete:selectedOption')).toBeUndefined();

    await wrapper.findAllComponents(MultiSelectChip)?.[1].trigger('click');

    expect(wrapper.emitted('delete:selectedOption')).toHaveLength(1);
    expect(wrapper.emitted('delete:selectedOption')?.[0]).toStrictEqual([{ title: 'Title2', value: 'Value2' }]);
  });

  test('При изменении массива выбранных элементов, chips-элементы перерисовываются', async () => {
    vi.useFakeTimers();
    const resizeObserver = mockResizeObserver();
    const wrapper = getMultiSelectChips();

    let { menuContainer } = setFlexibleMenuParams({
      wrapper,
      outerContainer: container,
      containerWidth: 40,
      selectedElementsLength: 3,
    });

    resizeObserver.resize(menuContainer);
    await vi.advanceTimersByTimeAsync(100);

    expect(wrapper.findAllComponents(MultiSelectChip)).toHaveLength(3);
    expect(wrapper.find('[data-test="CollapsedMenuForChips"]').exists()).toBeFalsy();

    await wrapper.setProps({
      selectedOptions: [
        { title: 'Title1', value: 'Value1' },
        { title: 'Title2', value: 'Value2' },
        { title: 'Title3', value: 'Value3' },
        { title: 'Title4', value: 'Value4' },
        { title: 'Title5', value: 'Value5' },
        { title: 'Title6', value: 'Value6' },
      ],
    });
    await vi.runAllTimersAsync();

    vi.resetAllMocks();

    menuContainer = setFlexibleMenuParams({
      wrapper,
      outerContainer: container,
      containerWidth: 40,
      selectedElementsLength: 6,
    }).menuContainer;

    resizeObserver.resize(menuContainer);
    await vi.advanceTimersByTimeAsync(100);

    expect(wrapper.findAllComponents(MultiSelectChip)).toHaveLength(4);
    expect(wrapper.find('[data-test="CollapsedMenuForChips"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="CollapsedMenuForChips"]').text()).toBe('+ 2');
  });
});
