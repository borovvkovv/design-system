import { beforeEach, describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { mockBoundingClientRect } from '@comp/components/__tests__/utils';
import MultiSelectChip from '@comp/components/selects/chips/MultiSelectChip.vue';

const container = document.createElement('DIV');

const getMultiSelectChip = (props?: Partial<InstanceType<typeof MultiSelectChip>['$props']>) =>
  mount(MultiSelectChip, {
    props: {
      selectedOption: { title: 'Title', value: 'Value' },
      container,
      ...props,
    },
    attachTo: document.body,
  });

describe('Компонент MultiSelectChip', () => {
  beforeEach(() => {
    vi.spyOn(container, 'getBoundingClientRect').mockReturnValue(mockBoundingClientRect({ width: 50 }));

    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(mockBoundingClientRect({ width: 100 }));
  });

  test('Chips-элемент отображает заголовок выбранного элемента', () => {
    const wrapper = getMultiSelectChip();

    expect(wrapper.text()).toContain('Title');
  });

  test('При нажатии на chips-элемент вызывается эмит delete:selectedOption', async () => {
    const wrapper = getMultiSelectChip();

    expect(wrapper.emitted('delete:selectedOption')).toBeUndefined();

    await wrapper.trigger('click');

    expect(wrapper.emitted('delete:selectedOption')).toHaveLength(1);
  });

  test('Ширина chips-элемента не может быть шире контейнера, если контейнер задан', async () => {
    vi.useFakeTimers();
    const wrapper = getMultiSelectChip();
    await vi.runAllTimersAsync();

    expect(wrapper.element.style.width).toBe('50px');
  });

  test('Если контейнер не задан, то ширина chips-элемента будет зафиксирована после монтирования компонента', async () => {
    vi.useFakeTimers();
    const wrapper = getMultiSelectChip({ container: undefined });
    await vi.runAllTimersAsync();

    expect(wrapper.element.style.width).toBe('100px');
  });

  test('При изменении выбранного элемента, ширина chips-элемента перерасчитывается', async () => {
    vi.useFakeTimers();
    const wrapper = getMultiSelectChip();
    await vi.runAllTimersAsync();

    expect(wrapper.element.style.width).toBe('50px');

    await wrapper.setProps({ container: undefined, selectedOption: { title: 'NewTitle', value: 'NewValue' } });
    await vi.runAllTimersAsync();

    expect(wrapper.element.style.width).toBe('100px');
  });
});
