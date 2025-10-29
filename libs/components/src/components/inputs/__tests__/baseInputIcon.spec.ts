import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { IconName } from '@comp/components/icons/utils/models';
import IconNone from '@comp/components/icons/IconNone.vue';
import BaseInputIcon from '@comp/components/inputs/BaseInputIcon.vue';

const getBaseInputIcon = (props?: Partial<InstanceType<typeof BaseInputIcon>['$props']>) =>
  mount(BaseInputIcon, {
    props: {
      iconName: IconName.IconNone,
      onIconClick: vi.fn(),
      disabled: false,
      ...props,
    },
  });

describe('Компонент BaseInputIcon', () => {
  test('Если задан колбэк, то при клике на иконку вызывается данный колбэк', async () => {
    const wrapper = getBaseInputIcon();

    expect(wrapper.props().onIconClick).toHaveBeenCalledTimes(0);

    await wrapper.trigger('click');

    expect(wrapper.props().onIconClick).toHaveBeenCalledTimes(1);
  });

  test('Если задан колбэк, то отрисовывается кнопка', async () => {
    const wrapper = getBaseInputIcon();

    expect(wrapper.find('button').exists()).toBeTruthy();
    expect(wrapper.find('span').exists()).toBeFalsy();
  });

  test('Если колбэк не задан, то отрисовывается span', async () => {
    const wrapper = getBaseInputIcon({ onIconClick: undefined });

    expect(wrapper.find('button').exists()).toBeFalsy();
    expect(wrapper.find('span').exists()).toBeTruthy();
  });

  test('Отрисовывается заданная иконка', async () => {
    const wrapper = getBaseInputIcon();
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(IconNone).exists()).toBeTruthy();
  });
});
