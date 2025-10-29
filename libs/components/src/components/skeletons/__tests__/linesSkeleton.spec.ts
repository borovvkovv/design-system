import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import LineSkeleton from '@comp/components/skeletons/LineSkeleton.vue';
import LinesSkeleton from '@comp/components/skeletons/LinesSkeleton.vue';

const getLinesSkeleton = () =>
  mount(LinesSkeleton, {
    props: {
      rowsCount: 2,
      rowHeight: 22,
      rowsGap: 25,
    },
  });

describe('Компонент LinesSkeleton', () => {
  test('Количество линий для каркасного загрузчика передается через проп rowsCount', async () => {
    const wrapper = getLinesSkeleton();

    expect(wrapper.findAllComponents(LineSkeleton)).toHaveLength(2);
  });
});
