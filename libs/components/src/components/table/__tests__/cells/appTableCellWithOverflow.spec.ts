import { h } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import { VueWrapper, mount } from '@vue/test-utils';
import { mockBoundingClientRect } from '@comp/components/__tests__/utils';
import BaseFlexibleMenu from '@comp/components/flexible-menu/BaseFlexibleMenu.vue';
import { mockResizeObserver } from '@comp/components/__tests__/utils/mockedResizeObserver';
import AppTableCellWithOverflow from '@comp/components/table/cells/AppTableCellWithOverflow.vue';

const setFlexibleMenuParams = ({
  wrapper,
  menuItems,
}: {
  wrapper: VueWrapper<any>;
  menuItems: string[];
}): {
  menuContainer: HTMLElement;
} => {
  const menuContainer = wrapper.getComponent(BaseFlexibleMenu).vm.$refs['menuContainer'] as HTMLElement;
  const rightBoundary = wrapper.getComponent(BaseFlexibleMenu).vm.$refs['rightBoundaryRef'] as HTMLElement;
  vi.spyOn(menuContainer, 'getBoundingClientRect').mockImplementation(() => mockBoundingClientRect({ width: 20 }));
  vi.spyOn(rightBoundary, 'getBoundingClientRect').mockImplementation(() => mockBoundingClientRect({ width: 0 }));

  menuItems.forEach((_, charIndex) => {
    const visibleItemElement = wrapper.getComponent(BaseFlexibleMenu).vm.getVisibleMenuItems()[
      charIndex
    ] as HTMLElement;
    vi.spyOn(visibleItemElement, 'getBoundingClientRect').mockImplementation(() =>
      mockBoundingClientRect({ width: 2 }),
    );
    visibleItemElement.style.marginLeft = '0';
    visibleItemElement.style.marginRight = '0';
  });

  return {
    menuContainer,
  };
};

const cellText: string = 'Текст длинной в 50 символов по два пикселя каждый.';
const newCellText: string = 'Текст в 20 символов.';

const getAppTableCellWithOverflow = () =>
  mount(AppTableCellWithOverflow, {
    props: {
      items: cellText.split(''),
      maxLines: 2,
      popupText: cellText,
    },
    attachTo: document.body,
    slots: {
      default: (properties) =>
        properties.visibleItems.map((char, charIndex) => h('span', { id: `visibleItem${charIndex}` }, char as string)),
    },
    global: {
      directives: {
        twMerge: {},
      },
    },
  });

describe('Компонент AppTableCellWithOverflow', () => {
  test('При первом изменении размера ячейки содержимое становится видимым и отображаются только те буквы, которые поместились в две строки', async () => {
    vi.useFakeTimers();
    const resizeObserver = mockResizeObserver();
    const wrapper = getAppTableCellWithOverflow();

    const { menuContainer } = setFlexibleMenuParams({ wrapper, menuItems: cellText.split('') });
    expect(menuContainer.style.visibility).not.toBe('visible');

    resizeObserver.resize(menuContainer);
    vi.advanceTimersByTime(100);
    await vi.runAllTimersAsync();
    vi.runAllTicks();

    expect(menuContainer.style.visibility).toBe('visible');
    expect(wrapper.text()).toBe(`${cellText.substring(0, 20)}...`);
  });

  test('При изменении пропа items ячейка перерисовывается', async () => {
    vi.useFakeTimers();
    const resizeObserver = mockResizeObserver();
    const wrapper = getAppTableCellWithOverflow();

    const { menuContainer } = setFlexibleMenuParams({ wrapper, menuItems: cellText.split('') });

    resizeObserver.resize(menuContainer);
    vi.advanceTimersByTime(100);
    await vi.runAllTimersAsync();
    vi.runAllTicks();

    expect(wrapper.text()).toBe(`${cellText.substring(0, 20)}...`);

    await wrapper.setProps({ items: newCellText.split('') });
    await vi.runAllTimersAsync();

    resizeObserver.resize(menuContainer);
    vi.advanceTimersByTime(100);
    await vi.runAllTimersAsync();
    vi.runAllTicks();

    expect(wrapper.text()).toBe(newCellText);
  });

  test('Если весь текст не помещается в ячейку, то при наведении на нее отображается попап с полным текстом', async () => {
    vi.useFakeTimers();
    const resizeObserver = mockResizeObserver();
    const wrapper = getAppTableCellWithOverflow();
    const { menuContainer } = setFlexibleMenuParams({ wrapper, menuItems: cellText.split('') });

    resizeObserver.resize(menuContainer);
    vi.advanceTimersByTime(100);
    await vi.runAllTimersAsync();
    vi.runAllTicks();
    await wrapper.find('div').trigger('mouseenter');

    expect(wrapper.text()).toContain(cellText);
  });
});
