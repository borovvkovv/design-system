import { nextTick } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import { VueWrapper, mount } from '@vue/test-utils';
import BaseFlexibleMenu from '@comp/components/flexible-menu/BaseFlexibleMenu.vue';
import { mockResizeObserver } from '@comp/components/__tests__/utils/mockedResizeObserver';

const mockBoundingClientRect = (width: number): DOMRect => ({
  width,
  height: 100,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  x: 0,
  y: 0,
  toJSON: () => {},
});

const setBaseFlexibeMenuParams = ({
  wrapper,
  menuContainerWidth,
  menuContainerMargin,
  rightBoundaryWidth,
  rightBoundaryMargin,
  сollapsedMenuWidth,
  сollapsedMenuMargin,
}: {
  wrapper: VueWrapper<any>;
  menuContainerWidth?: number;
  menuContainerMargin?: number;
  rightBoundaryWidth?: number;
  rightBoundaryMargin?: number;
  сollapsedMenuWidth?: number;
  сollapsedMenuMargin?: number;
}): {
  menuContainer: HTMLElement;
} => {
  const menuContainer = wrapper.vm.$refs['menuContainer'] as HTMLElement;
  const rightBoundary = wrapper.vm.$refs['rightBoundaryRef'] as HTMLElement;
  const collapsedMenu = wrapper.vm.$refs['collapsedMenuRef'] as HTMLElement;

  vi.spyOn(menuContainer, 'getBoundingClientRect').mockImplementation(() =>
    mockBoundingClientRect(menuContainerWidth ?? 0),
  );
  menuContainer.style.marginLeft = `${menuContainerMargin ?? 0}px`;
  menuContainer.style.marginRight = `${menuContainerMargin ?? 0}px`;
  vi.spyOn(rightBoundary, 'getBoundingClientRect').mockImplementation(() =>
    mockBoundingClientRect(rightBoundaryWidth ?? 0),
  );
  rightBoundary.style.marginLeft = `${rightBoundaryMargin ?? 0}px`;
  rightBoundary.style.marginRight = `${rightBoundaryMargin ?? 0}px`;

  if (collapsedMenu) {
    vi.spyOn(collapsedMenu, 'getBoundingClientRect').mockImplementation(() =>
      mockBoundingClientRect(сollapsedMenuWidth ?? 0),
    );
    collapsedMenu.style.marginLeft = `${сollapsedMenuMargin ?? 0}px`;
    collapsedMenu.style.marginRight = `${сollapsedMenuMargin ?? 0}px`;
  }

  return {
    menuContainer,
  };
};

const getBaseFlexibleMenu = () =>
  mount(BaseFlexibleMenu, {
    props: {
      maxLines: 1,
    },
    slots: {
      visibleItems: '<div id="visibleItem1" /><div id="visibleItem2" />',
      collapsedMenu: '<div id="collapsedMenu" />',
      rightBoundary: '<div id="rightBoundary" />',
    },
    attachTo: document.body,
  });

describe('Компонент BaseFlexibleMenu', () => {
  test('При монтировании компонента видны только видимые пункты меню', () => {
    mockResizeObserver();
    const wrapper = getBaseFlexibleMenu();

    expect(wrapper.find('#collapsedMenu').exists()).toBeFalsy();
    expect(wrapper.vm.isCollapsedMenuVisible).toBeFalsy();
  });

  test(`При изменении размера меню вызывается ResizeObserver для высчитывания максимальной ширины видимых пунктов
  ((левый марджин + ширина меню + правый марджин) - (левый марджин + ширина кнопки "Еще" + правый марджин))`, () => {
    vi.useFakeTimers();
    const resizeObserver = mockResizeObserver();
    const wrapper = getBaseFlexibleMenu();

    const { menuContainer } = setBaseFlexibeMenuParams({
      wrapper,
      menuContainerWidth: 100,
      menuContainerMargin: 0,
      rightBoundaryWidth: 10,
      rightBoundaryMargin: 5,
    });

    resizeObserver.resize(menuContainer);
    vi.advanceTimersByTime(100);

    const visibleMenu = wrapper.vm.$refs['visibleMenuRef'] as HTMLElement;
    expect(visibleMenu.style.maxWidth).toBe('80px');
  });

  test(`При изменении размера меню вызывается эмит resize`, () => {
    vi.useFakeTimers();
    const resizeObserver = mockResizeObserver();
    const wrapper = getBaseFlexibleMenu();

    const menuContainer = wrapper.vm.$refs['menuContainer'] as HTMLElement;

    resizeObserver.resize(menuContainer);
    vi.advanceTimersByTime(100);

    expect(wrapper.emitted('resize')).toHaveLength(1);
  });

  test(`Высчитывание максимальной ширины видимых пунктов и вызов эмита resize происходит через 100 мс после изменения размера меню,
  если не произошло новое изменение размера меню`, () => {
    vi.useFakeTimers();
    const resizeObserver = mockResizeObserver();
    const wrapper = getBaseFlexibleMenu();

    const menuContainer = wrapper.vm.$refs['menuContainer'] as HTMLElement;

    resizeObserver.resize(menuContainer);
    vi.advanceTimersByTime(90);
    resizeObserver.resize(menuContainer);
    vi.advanceTimersByTime(90);
    resizeObserver.resize(menuContainer);
    vi.advanceTimersByTime(100);

    expect(wrapper.emitted('resize')).toHaveLength(1);
  });

  test('Кнопка "Еще" появляется/исчезает при выполнении метода changeCollapsedMenuVisibility', async () => {
    mockResizeObserver();
    const wrapper = getBaseFlexibleMenu();

    expect(wrapper.find('#collapsedMenu').exists()).toBeFalsy();

    wrapper.vm.changeCollapsedMenuVisibility(true);
    await nextTick();

    expect(wrapper.find('#collapsedMenu').exists()).toBeTruthy();
  });

  test('Меню меняет видимость при выполнении метода changeMenuContainerVisibility', () => {
    mockResizeObserver();
    const wrapper = getBaseFlexibleMenu();

    expect(wrapper.isVisible()).toBeTruthy();

    wrapper.vm.changeMenuContainerVisibility(false);

    expect(wrapper.isVisible()).toBeFalsy();
  });

  test('Метод getVisibleMenuItems возвращает видимые пункты меню', () => {
    mockResizeObserver();
    const wrapper = getBaseFlexibleMenu();

    expect(wrapper.vm.getVisibleMenuItems()).toStrictEqual([
      wrapper.find('#visibleItem1').element,
      wrapper.find('#visibleItem2').element,
    ]);
  });

  test('Если присутствует кнопка "Еще", то метод getVisibleMenuItems возвращает видимые пункты меню без кнопки "Еще"', () => {
    mockResizeObserver();
    const wrapper = getBaseFlexibleMenu();

    wrapper.vm.changeCollapsedMenuVisibility(true);

    const visibleItem1Ref = wrapper.find('#visibleItem1').element;
    expect(wrapper.vm.getVisibleMenuItems()).toStrictEqual([visibleItem1Ref]);
  });

  test('Метод getVisibleMenuWidth возвращает максимальную ширину видимых пунктов меню', () => {
    vi.useFakeTimers();
    const resizeObserver = mockResizeObserver();
    const wrapper = getBaseFlexibleMenu();
    const { menuContainer } = setBaseFlexibeMenuParams({
      wrapper,
      menuContainerWidth: 100,
      menuContainerMargin: 0,
      rightBoundaryWidth: 10,
      rightBoundaryMargin: 5,
    });

    resizeObserver.resize(menuContainer);
    vi.advanceTimersByTime(100);

    expect(wrapper.vm.getVisibleMenuWidth()).toBe(80);
  });

  test(`Метод getCollapsedMenuWidth возвращает ширину кнопки "Еще" по формуле:
  левый марджин + ширина кнопки + правый марджин`, async () => {
    mockResizeObserver();
    const wrapper = getBaseFlexibleMenu();

    wrapper.vm.changeCollapsedMenuVisibility(true);
    await nextTick();

    setBaseFlexibeMenuParams({
      wrapper,
      сollapsedMenuWidth: 100,
      сollapsedMenuMargin: 5,
    });
    expect(wrapper.vm.getCollapsedMenuWidth()).toBe(110);
  });
});
