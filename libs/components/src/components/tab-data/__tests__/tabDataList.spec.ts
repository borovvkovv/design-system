import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import TabDataList from '../TabDataList.vue';
import AppLink from '@comp/components/app-link/AppLink.vue';

const getTabDataList = () => {
  const wrapper = mount(TabDataList, {
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
  });

  return wrapper;
};
describe('Компонент IconTextStub', () => {
  test('Компонент отрисовывает заголовки вкладок', () => {
    const wrapper = getTabDataList();

    expect(wrapper.text()).toContain('Title1');
    expect(wrapper.text()).toContain('Title2');
    expect(wrapper.text()).toContain('Title3');
  });

  test('При нажатии на вкладку вызывается эмит update:modelValue с данной вкладкой', async () => {
    const wrapper = getTabDataList();

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();

    await wrapper.findAllComponents(AppLink)[0].trigger('click');

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')?.[0]).toStrictEqual([{ title: 'Title1', value: 'Value1' }]);

    await wrapper.findAllComponents(AppLink)[1].trigger('click');

    expect(wrapper.emitted('update:modelValue')).toHaveLength(2);
    expect(wrapper.emitted('update:modelValue')?.[1]).toStrictEqual([{ title: 'Title2', value: 'Value2' }]);

    await wrapper.findAllComponents(AppLink)[2].trigger('click');

    expect(wrapper.emitted('update:modelValue')).toHaveLength(3);
    expect(wrapper.emitted('update:modelValue')?.[2]).toStrictEqual([{ title: 'Title3', value: 'Value3' }]);
  });

  test('Вкладка, значение которой совпадает со значением пропа modelValue, активная', async () => {
    const wrapper = getTabDataList();

    expect(wrapper.findAllComponents(AppLink)?.[0].vm.isActive).toBe(true);
    expect(wrapper.findAllComponents(AppLink)?.[1].vm.isActive).toBe(false);
    expect(wrapper.findAllComponents(AppLink)?.[2].vm.isActive).toBe(false);

    await wrapper.findAllComponents(AppLink)[0].trigger('click');

    expect(wrapper.findAllComponents(AppLink)?.[0].vm.isActive).toBe(true);
    expect(wrapper.findAllComponents(AppLink)?.[1].vm.isActive).toBe(false);
    expect(wrapper.findAllComponents(AppLink)?.[2].vm.isActive).toBe(false);

    await wrapper.findAllComponents(AppLink)[1].trigger('click');

    expect(wrapper.findAllComponents(AppLink)?.[0].vm.isActive).toBe(false);
    expect(wrapper.findAllComponents(AppLink)?.[1].vm.isActive).toBe(true);
    expect(wrapper.findAllComponents(AppLink)?.[2].vm.isActive).toBe(false);

    await wrapper.findAllComponents(AppLink)[2].trigger('click');

    expect(wrapper.findAllComponents(AppLink)?.[0].vm.isActive).toBe(false);
    expect(wrapper.findAllComponents(AppLink)?.[1].vm.isActive).toBe(false);
    expect(wrapper.findAllComponents(AppLink)?.[2].vm.isActive).toBe(true);
  });
});
