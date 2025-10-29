import { describe, expect, test, vi } from 'vitest';
import { Size } from '@comp/enums';
import { VueWrapper, mount } from '@vue/test-utils';
import MultiSelect from '@comp/components/selects/MultiSelect.vue';
import { mockBoundingClientRect } from '@comp/components/__tests__/utils';
import BaseSimpleSelect from '@comp/components/selects/BaseSimpleSelect.vue';
import MultiSelectChip from '@comp/components/selects/chips/MultiSelectChip.vue';
import BaseFlexibleMenu from '@comp/components/flexible-menu/BaseFlexibleMenu.vue';
import { mockResizeObserver } from '@comp/components/__tests__/utils/mockedResizeObserver';

const options = [
  { title: 'Title1', value: 'Value1' },
  { title: 'Title2', value: 'Value2' },
  { title: 'Title3', value: 'Value3' },
];

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

const getMultiSelect = (props?: Partial<InstanceType<typeof MultiSelect>['$props']>) => {
  const wrapper = mount(MultiSelect, {
    props: {
      size: Size.M,
      label: '',
      disabled: false,
      minWidth: 100,
      isNotPreventDefaultEnter: false,
      required: true,
      placeholder: '',
      isLoading: false,
      isErrorLoading: false,
      options,
      selectedOptions: [],
      'onUpdate:selectedOptions': (newSelectedOptions) => {
        wrapper.setProps({ selectedOptions: newSelectedOptions });
      },
      ...props,
    },
    global: {
      directives: {
        twMerge: {},
      },
    },
    attachTo: document.body,
  });

  return wrapper;
};

describe('Компонент MultiSelect', () => {
  test('В плейсхолдере инпута отрисовывается количество выбранных элементов', async () => {
    mockResizeObserver();
    const wrapper = getMultiSelect({ selectedOptions: [options[1], options[2]] });

    expect(wrapper.find('input').element.placeholder).toBe('Выбрано: 2');

    wrapper.unmount();
  });

  test('После выделения элементов в выпадающем списке при повторном открытии они перераспределяются', async () => {
    vi.useFakeTimers();
    mockResizeObserver();
    const wrapper = getMultiSelect({ selectedOptions: [options[1], options[2]] });

    wrapper.findComponent(BaseSimpleSelect).vm.setDropDownVisibility(true);
    await vi.runAllTimersAsync();

    const selectedOptions = wrapper.findAll('ul')[0];
    const notSelectedOptions = wrapper.findAll('ul')[1];

    expect(selectedOptions.text()).toContain('Title2');
    expect(selectedOptions.text()).toContain('Title3');
    expect(notSelectedOptions.text()).toContain('Title1');

    await selectedOptions.findAll('li')[1].trigger('click');
    await selectedOptions.findAll('li')[2].trigger('click');
    await notSelectedOptions.findAll('li')[0].trigger('click');
    await vi.runAllTimersAsync();

    wrapper.findComponent(BaseSimpleSelect).vm.setDropDownVisibility(false);
    await vi.runAllTimersAsync();
    wrapper.findComponent(BaseSimpleSelect).vm.setDropDownVisibility(true);
    await vi.runAllTimersAsync();

    expect(wrapper.findAll('ul')[0].text()).toContain('Title1');
    expect(wrapper.findAll('ul')[1].text()).toContain('Title2');
    expect(wrapper.findAll('ul')[1].text()).toContain('Title3');

    wrapper.unmount();
  });

  test('После выделения элементов в выпадающем списке при повторном открытии chips-элементы перерисовываются', async () => {
    vi.useFakeTimers();
    const resizeObserver = mockResizeObserver();
    const wrapper = getMultiSelect({ selectedOptions: [options[1], options[2]] });

    let { menuContainer } = setFlexibleMenuParams({
      wrapper,
      outerContainer: wrapper.element,
      containerWidth: 40,
      selectedElementsLength: 2,
    });
    resizeObserver.resize(menuContainer);
    await vi.advanceTimersByTimeAsync(100);

    wrapper.findComponent(BaseSimpleSelect).vm.setDropDownVisibility(true);
    await vi.runAllTimersAsync();

    expect(wrapper.findAllComponents(MultiSelectChip)).toHaveLength(2);

    await wrapper.findAll('ul')[0].findAll('li')[1].trigger('click');
    await wrapper.findAll('ul')[0].findAll('li')[2].trigger('click');
    await wrapper.findAll('ul')[1].findAll('li')[0].trigger('click');
    await vi.runAllTimersAsync();

    wrapper.findComponent(BaseSimpleSelect).vm.setDropDownVisibility(false);
    await vi.runAllTimersAsync();
    wrapper.findComponent(BaseSimpleSelect).vm.setDropDownVisibility(true);
    await vi.runAllTimersAsync();

    menuContainer = setFlexibleMenuParams({
      wrapper,
      outerContainer: wrapper.element,
      containerWidth: 40,
      selectedElementsLength: 1,
    }).menuContainer;
    resizeObserver.resize(menuContainer);
    await vi.advanceTimersByTimeAsync(100);

    expect(wrapper.findAllComponents(MultiSelectChip)).toHaveLength(1);

    wrapper.unmount();
  });

  test('Если после выделения элементов в выпадающем списке нажать на chips-элемент, то при повторном открытии элементы выпадающего списка перерисовываются', async () => {
    vi.useFakeTimers();
    mockResizeObserver();
    const wrapper = getMultiSelect({ selectedOptions: [options[1], options[2]] });

    wrapper.findComponent(BaseSimpleSelect).vm.setDropDownVisibility(true);
    await vi.runAllTimersAsync();

    expect(wrapper.findAll('ul')[0].text()).toContain('Title2');
    expect(wrapper.findAll('ul')[0].text()).toContain('Title3');
    expect(wrapper.findAll('ul')[1].text()).toContain('Title1');

    wrapper.findComponent(BaseSimpleSelect).vm.setDropDownVisibility(false);
    await vi.runAllTimersAsync();

    await wrapper.findAllComponents(MultiSelectChip)[1].trigger('click');
    await vi.runAllTimersAsync();

    wrapper.findComponent(BaseSimpleSelect).vm.setDropDownVisibility(true);
    await vi.runAllTimersAsync();

    expect(wrapper.findAll('ul')[0].text()).toContain('Title2');
    expect(wrapper.findAll('ul')[1].text()).toContain('Title3');
    expect(wrapper.findAll('ul')[1].text()).toContain('Title1');

    wrapper.unmount();
  });

  test('Если после вводе текста не подходит ни один элемент списка, то отображается соответствующая заглушка', async () => {
    vi.useFakeTimers();
    mockResizeObserver();
    const wrapper = getMultiSelect({ selectedOptions: [options[1], options[2]] });

    wrapper.findComponent(BaseSimpleSelect).vm.setDropDownVisibility(true);
    await vi.runAllTimersAsync();

    expect(wrapper.findAll('ul')[0].text()).toContain('Title2');
    expect(wrapper.findAll('ul')[0].text()).toContain('Title3');
    expect(wrapper.findAll('ul')[1].text()).toContain('Title1');

    await wrapper.find('input').setValue('different');

    expect(wrapper.text()).toContain('Ничего не найдено');
    expect(wrapper.text()).toContain('Попробуйте изменить запрос');

    wrapper.unmount();
  });

  test('Если после вводе текста не подходит ни один элемент списка, то chips-элементы не меняются', async () => {
    mockResizeObserver();
    const wrapper = getMultiSelect({ selectedOptions: [options[1], options[2]] });

    wrapper.findComponent(BaseSimpleSelect).vm.setDropDownVisibility(true);
    expect(wrapper.findAllComponents(MultiSelectChip)).toHaveLength(2);

    await wrapper.find('input').setValue('different');

    expect(wrapper.text()).toContain('Ничего не найдено');
    expect(wrapper.text()).toContain('Попробуйте изменить запрос');
    expect(wrapper.findAllComponents(MultiSelectChip)).toHaveLength(2);

    wrapper.unmount();
  });
});
