import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import AppIcon from '@comp/components/AppIcon.vue';
import { IconName } from '@comp/components/icons/utils/models';
import IconArrangeAsc from '@comp/components/icons/IconArrangeAsc.vue';

const getAppIcon = () =>
  mount(AppIcon, {
    props: {
      icon: IconName.IconArrangeAsc,
      size: 55,
    },
  });

describe('Компонент AppIcon', () => {
  test('Иконка отрисовывается в соответствии с пропом icon', async () => {
    const wrapper = getAppIcon();
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(IconArrangeAsc).exists()).toBeTruthy();
  });

  test('Размер иконки передается без изменений', async () => {
    const wrapper = getAppIcon();
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(AppIcon).vm.size).toBe(55);
  });
});
