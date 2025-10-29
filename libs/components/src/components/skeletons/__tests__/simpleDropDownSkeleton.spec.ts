import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import LineSkeleton from '@comp/components/skeletons/LineSkeleton.vue';
import SimpleDropDownSkeleton from '../../skeletons/SimpleDropDownSkeleton.vue';

const getSimpleDropDownSkeleton = () =>
  mount(SimpleDropDownSkeleton, {
    props: {
      rowsCount: 2,
      rowHeight: 22,
      rowsGap: 25,
    },
  });

describe('Компонент SimpleDropDownSkeleton', () => {
  test('Количество линий для каркасного загрузчика передается через проп rowsCount', async () => {
    const wrapper = getSimpleDropDownSkeleton();

    expect(wrapper.findAllComponents(LineSkeleton)).toHaveLength(2);
  });
});
