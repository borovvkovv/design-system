import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { IconName } from '@comp/components/icons/utils/models';
import IconArrangeAsc from '@comp/components/icons/IconArrangeAsc.vue';
import AppTableCellIcon from '@comp/components/table/cells/AppTableCellIcon.vue';

const getAppTableCellIcon = () =>
  mount(AppTableCellIcon, {
    props: {
      cell: {
        type: 'icon',
        icon: IconName.IconArrangeAsc,
      },
    },
    global: {
      directives: {
        twMerge: {},
      },
    },
  });

describe('Компонент AppTableCellIcon', () => {
  test('Отрисовывает иконка имя которой передано через проп', async () => {
    const wrapper = getAppTableCellIcon();
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(IconArrangeAsc).exists()).toBeTruthy();
  });
});
