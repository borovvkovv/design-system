import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { MenuButton, MenuItems } from '@headlessui/vue';
import AppLink from '@comp/components/app-link/AppLink.vue';
import TabDataMenu from '../TabDataMenu.vue';
import IconArrowDownTriangle from '@comp/components/icons/IconArrowDownTriangle.vue';
import IconArrowUpTriangle from '@comp/components/icons/IconArrowUpTriangle.vue';

const getTabDataMenu = () => {
  const wrapper = mount(TabDataMenu, {
    props: {
      modelValue: { title: 'Title1', value: 'Value1' },
      options: [
        { title: 'Title1', value: 'Value1' },
        { title: 'Title2', value: 'Value2' },
        { title: 'Title3', value: 'Value3' },
      ],
      'onUpdate:modelValue': (newValue) => {
        wrapper.setProps({ modelValue: newValue });
      },
    },
    attachTo: document.body,
  });

  return wrapper;
};
describe('Компонент TabDataMenu', () => {
  test('Кнопка меню вкладок отображает заголовок выбраной вкладки', async () => {
    const wrapper = getTabDataMenu();

    expect(wrapper.findComponent(MenuButton).text()).toBe('Title1');

    await wrapper.findComponent(MenuButton).trigger('click');
    await wrapper.findComponent(MenuItems).findAllComponents(AppLink)[2].trigger('click');

    expect(wrapper.findComponent(MenuButton).text()).toBe('Title3');
  });

  test('При открытии и закрытии выпадающего списка вкладок, в кнопке меню меняет направление иконка-стрелка', async () => {
    const wrapper = getTabDataMenu();

    expect(wrapper.findComponent(IconArrowDownTriangle).exists()).toBeTruthy();

    await wrapper.findComponent(MenuButton).trigger('click');

    expect(wrapper.findComponent(IconArrowUpTriangle).exists()).toBeTruthy();
  });

  test('Выпадающий список меню отображает заголовки вкладок', async () => {
    const wrapper = getTabDataMenu();

    await wrapper.findComponent(MenuButton).trigger('click');

    expect(wrapper.findComponent(MenuItems).text()).toContain('Title1');
    expect(wrapper.findComponent(MenuItems).text()).toContain('Title2');
    expect(wrapper.findComponent(MenuItems).text()).toContain('Title3');
  });

  test('При нажатии на один из заголовков вкладок, вызывается эмит update:modelValue', async () => {
    const wrapper = getTabDataMenu();

    await wrapper.findComponent(MenuButton).trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();

    await wrapper.findComponent(MenuItems).findAllComponents(AppLink)[0].trigger('click');

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')?.[0]).toStrictEqual([{ title: 'Title1', value: 'Value1' }]);
  });

  test('После выбора вкладки, выпадающтй список закрывается', async () => {
    vi.useFakeTimers();
    const wrapper = getTabDataMenu();

    await wrapper.findComponent(MenuButton).trigger('click');

    expect(wrapper.findComponent(MenuItems).text()).toContain('Title1');
    expect(wrapper.findComponent(MenuItems).text()).toContain('Title2');
    expect(wrapper.findComponent(MenuItems).text()).toContain('Title3');

    await wrapper.findComponent(MenuItems).findAllComponents(AppLink)[0].trigger('click');
    vi.runAllTicks();

    expect(wrapper.findComponent(MenuItems).text()).not.toContain('Title1');
    expect(wrapper.findComponent(MenuItems).text()).not.toContain('Title2');
    expect(wrapper.findComponent(MenuItems).text()).not.toContain('Title3');
  });
});
