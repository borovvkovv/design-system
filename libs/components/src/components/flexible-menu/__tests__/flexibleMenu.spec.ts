import { nextTick } from 'vue';
import { describe, expect, test, vi } from 'vitest';
import { VueWrapper, mount } from '@vue/test-utils';
import { mockBoundingClientRect } from '@comp/components/__tests__/utils';
import FlexibleMenu from '@comp/components/flexible-menu/FlexibleMenu.vue';
import BaseFlexibleMenu from '@comp/components/flexible-menu/BaseFlexibleMenu.vue';
import { mockResizeObserver } from '@comp/components/__tests__/utils/mockedResizeObserver';

const visibleItem1 = document.createElement('DIV');
const visibleItem2 = document.createElement('DIV');
const visibleItem3 = document.createElement('DIV');
visibleItem1.innerHTML = '<div id="visibleItem1" />';
visibleItem2.innerHTML = '<div id="visibleItem2" />';
visibleItem3.innerHTML = '<div id="visibleItem3" />';

const visibleItems = [visibleItem1, visibleItem2, visibleItem3];

const setFlexibleMenuParams = ({
  wrapper,
  menuContainerWidth,
  visibleItem1Width,
  visibleItem2Width,
  visibleItem3Width,
}: {
  wrapper: VueWrapper<any>;
  visibleItem1Width?: number;
  visibleItem2Width?: number;
  visibleItem3Width?: number;
  menuContainerWidth?: number;
}): {
  menuContainer: HTMLElement;
} => {
  const visibleItemElement1 = wrapper.getComponent(BaseFlexibleMenu).vm.getVisibleMenuItems()[0] as HTMLElement;
  const visibleItemElement2 = wrapper.getComponent(BaseFlexibleMenu).vm.getVisibleMenuItems()[1] as HTMLElement;
  const visibleItemElement3 = wrapper.getComponent(BaseFlexibleMenu).vm.getVisibleMenuItems()[2] as HTMLElement;
  const menuContainer = wrapper.getComponent(BaseFlexibleMenu).vm.$refs['menuContainer'] as HTMLElement;
  const rightBoundary = wrapper.getComponent(BaseFlexibleMenu).vm.$refs['rightBoundaryRef'] as HTMLElement;
  vi.spyOn(visibleItemElement1, 'getBoundingClientRect').mockImplementation(() =>
    mockBoundingClientRect({ width: visibleItem1Width ?? 20 }),
  );
  vi.spyOn(visibleItemElement2, 'getBoundingClientRect').mockImplementation(() =>
    mockBoundingClientRect({ width: visibleItem2Width ?? 20 }),
  );
  vi.spyOn(visibleItemElement3, 'getBoundingClientRect').mockImplementation(() =>
    mockBoundingClientRect({ width: visibleItem3Width ?? 20 }),
  );
  vi.spyOn(menuContainer, 'getBoundingClientRect').mockImplementation(() =>
    mockBoundingClientRect({ width: menuContainerWidth ?? 20 }),
  );
  vi.spyOn(rightBoundary, 'getBoundingClientRect').mockImplementation(() => mockBoundingClientRect({ width: 0 }));
  visibleItemElement1.style.marginLeft = '0';
  visibleItemElement1.style.marginRight = '0';
  visibleItemElement2.style.marginLeft = '0';
  visibleItemElement2.style.marginRight = '0';
  visibleItemElement3.style.marginLeft = '0';
  visibleItemElement3.style.marginRight = '0';

  return {
    menuContainer,
  };
};

const getFlexibleMenu = (showAllItems: boolean = false, maxLines: number = 1) => {
  const wrapper = mount(FlexibleMenu, {
    props: {
      visibleItems,
      collapsedItems: [] as Array<number>,
      maxLines,
      showAllItems,
      'onUpdate:visibleItems': (visibleItems) => {
        wrapper.setProps({ visibleItems });
      },
      'onUpdate:collapsedItems': (collapsedItems) => {
        wrapper.setProps({ collapsedItems });
      },
    },
    slots: {
      visibleItems: visibleItems.reduce((acc, i) => (acc += i.innerHTML), ''),
      collapsedMenu: '<div id="collapsedMenu" style="width: 10" />',
      rightBoundary: '<div id="rightBoundary" />',
    },
    attachTo: document.body,
  });

  return wrapper;
};

describe('Компонент FlexibleMenu', () => {
  test(`При первом изменении резмера меню оно становится видимым`, () => {
    vi.useFakeTimers();
    const resizeObserver = mockResizeObserver();
    const wrapper = getFlexibleMenu(false, 2);

    const { menuContainer } = setFlexibleMenuParams({ wrapper });

    expect(menuContainer.style.visibility).not.toBe('visible');

    resizeObserver.resize(menuContainer);
    vi.advanceTimersByTime(100);

    expect(menuContainer.style.visibility).toBe('visible');
  });

  test('При вызове метода rerender с новыми пунктами меню, отрисовываются все новые элементы в видимой части меню', async () => {
    vi.useFakeTimers();
    const resizeObserver = mockResizeObserver();
    const wrapper = getFlexibleMenu();

    const { menuContainer } = setFlexibleMenuParams({ wrapper, menuContainerWidth: 40 });

    resizeObserver.resize(menuContainer);
    await vi.advanceTimersByTimeAsync(100);

    expect(wrapper.vm.$props.visibleItems).toStrictEqual([visibleItem1, visibleItem2]);
    expect(wrapper.vm.$props.collapsedItems).toStrictEqual([visibleItem3]);

    const newVisibleItem1 = document.createElement('DIV');
    const newVisibleItem2 = document.createElement('DIV');
    const newVisibleItem3 = document.createElement('DIV');
    newVisibleItem1.innerHTML = '<div id="newVisibleItem1" />';
    newVisibleItem2.innerHTML = '<div id="newVisibleItem2" />';
    newVisibleItem3.innerHTML = '<div id="newVisibleItem3" />';
    wrapper.vm.rerender([newVisibleItem1, newVisibleItem2, newVisibleItem3]);
    await nextTick();

    expect(wrapper.vm.$props.visibleItems).toStrictEqual([newVisibleItem1, newVisibleItem2, newVisibleItem3]);
    expect(wrapper.vm.$props.collapsedItems).toStrictEqual([]);
  });

  test(`При изменении размера меню, выполняется расчет indexOfNotFitItem`, () => {
    vi.useFakeTimers();
    const resizeObserver = mockResizeObserver();
    const wrapper = getFlexibleMenu();

    const { menuContainer } = setFlexibleMenuParams({ wrapper, menuContainerWidth: 40 });

    resizeObserver.resize(menuContainer);
    vi.advanceTimersByTime(100);

    expect(wrapper.vm.indexOfNotFitItem).toBe(2);
  });

  test(`indexOfNotFitItem равен индексу не уместившегося пункта однострочного меню`, () => {
    vi.useFakeTimers();
    const resizeObserver = mockResizeObserver();
    const wrapper = getFlexibleMenu();

    const { menuContainer } = setFlexibleMenuParams({ wrapper, menuContainerWidth: 60 });

    resizeObserver.resize(menuContainer);
    vi.advanceTimersByTime(100);

    expect(wrapper.vm.indexOfNotFitItem).toBe(-1);

    vi.spyOn(menuContainer, 'getBoundingClientRect').mockImplementation(() => mockBoundingClientRect({ width: 59 }));
    resizeObserver.resize(menuContainer);
    vi.advanceTimersByTime(100);

    expect(wrapper.vm.indexOfNotFitItem).toBe(2);

    vi.spyOn(menuContainer, 'getBoundingClientRect').mockImplementation(() => mockBoundingClientRect({ width: 19 }));
    resizeObserver.resize(menuContainer);
    vi.advanceTimersByTime(100);

    expect(wrapper.vm.indexOfNotFitItem).toBe(0);
  });

  test(`indexOfNotFitItem равен индексу не уместившегося пункта многострочного меню`, () => {
    vi.useFakeTimers();
    const resizeObserver = mockResizeObserver();
    const wrapper = getFlexibleMenu(false, 3);

    const { menuContainer } = setFlexibleMenuParams({
      wrapper,
      visibleItem1Width: 10,
      visibleItem2Width: 20,
      visibleItem3Width: 30,
      menuContainerWidth: 30,
    });

    resizeObserver.resize(menuContainer);
    vi.advanceTimersByTime(100);

    expect(wrapper.vm.indexOfNotFitItem).toBe(-1);

    vi.spyOn(menuContainer, 'getBoundingClientRect').mockImplementation(() => mockBoundingClientRect({ width: 10 }));
    resizeObserver.resize(menuContainer);
    vi.advanceTimersByTime(100);

    expect(wrapper.vm.indexOfNotFitItem).toBe(1);

    vi.spyOn(menuContainer, 'getBoundingClientRect').mockImplementation(() => mockBoundingClientRect({ width: 9 }));
    resizeObserver.resize(menuContainer);
    vi.advanceTimersByTime(100);

    expect(wrapper.vm.indexOfNotFitItem).toBe(0);
  });

  test(`При пропе showAllItems=true всегда отображаются все пункты многострочного меню`, async () => {
    vi.useFakeTimers();
    const resizeObserver = mockResizeObserver();
    const wrapper = getFlexibleMenu(true, 2);

    const { menuContainer } = setFlexibleMenuParams({ wrapper });

    resizeObserver.resize(menuContainer);
    await vi.advanceTimersByTimeAsync(100);

    expect(wrapper.vm.$props.visibleItems).toStrictEqual(visibleItems);
  });

  test(`При пропе showAllItems=false отображаются только пункты меню, которые поместились`, async () => {
    vi.useFakeTimers();
    const resizeObserver = mockResizeObserver();
    const wrapper = getFlexibleMenu(false, 2);

    const { menuContainer } = setFlexibleMenuParams({ wrapper });

    resizeObserver.resize(menuContainer);
    await vi.advanceTimersByTimeAsync(100);

    expect(wrapper.vm.$props.visibleItems).toStrictEqual([visibleItem1, visibleItem2]);
  });

  test(`Если не все пунты меню помещаются, то отрисовывается кнопка "Еще"`, async () => {
    vi.useFakeTimers();
    const resizeObserver = mockResizeObserver();
    const wrapper = getFlexibleMenu(false, 2);

    const { menuContainer } = setFlexibleMenuParams({ wrapper });

    expect(wrapper.find('#collapsedMenu').exists()).toBeFalsy();
    resizeObserver.resize(menuContainer);
    await vi.advanceTimersByTimeAsync(100);

    expect(wrapper.find('#collapsedMenu').exists()).toBeTruthy();
  });

  test(`Если при очередной перерисовке меню с кнопкой "Еще" последний пункт может вместиться без кнопки, то вместо кнопки отрисовывется последний пункт меню`, async () => {
    vi.useFakeTimers();
    const resizeObserver = mockResizeObserver();
    const wrapper = getFlexibleMenu(false, 2);

    const { menuContainer } = setFlexibleMenuParams({ wrapper });

    expect(wrapper.find('#collapsedMenu').exists()).toBeFalsy();
    resizeObserver.resize(menuContainer);
    await vi.advanceTimersByTimeAsync(100);

    expect(wrapper.find('#collapsedMenu').exists()).toBeTruthy();
    expect(wrapper.vm.$props.visibleItems).toStrictEqual([visibleItem1, visibleItem2]);
    expect(wrapper.vm.$props.collapsedItems).toStrictEqual([visibleItem3]);

    vi.spyOn(menuContainer, 'getBoundingClientRect').mockImplementation(() => mockBoundingClientRect({ width: 40 }));
    resizeObserver.resize(menuContainer);
    await vi.advanceTimersByTimeAsync(100);

    expect(wrapper.find('#collapsedMenu').exists()).toBeFalsy();
    expect(wrapper.vm.$props.visibleItems).toStrictEqual([visibleItem1, visibleItem2, visibleItem3]);
    expect(wrapper.vm.$props.collapsedItems).toStrictEqual([]);
  });

  test('При размонтировании компонента вызываются эмиты update:visibleItems с массивом всех пунктов меню и update:collapsedItems с пустым массивом', () => {
    mockResizeObserver();
    const wrapper = getFlexibleMenu();

    wrapper.unmount();

    expect(wrapper.emitted('update:visibleItems')).toHaveLength(1);
    expect(wrapper.emitted('update:visibleItems')?.[0]).toStrictEqual([visibleItems]);
    expect(wrapper.emitted('update:collapsedItems')).toHaveLength(1);
    expect(wrapper.emitted('update:collapsedItems')?.[0]).toStrictEqual([[]]);
  });
});
