import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import LineSkeleton from '@comp/components/skeletons/LineSkeleton.vue';
import FilesSkeleton from '@comp/components/skeletons/FilesSkeleton.vue';

const getFilesSkeleton = () =>
  mount(FilesSkeleton, {
    props: {
      rowsCount: 2,
      rowsGap: 25,
      isWithSize: false,
    },
  });

describe('Компонент FilesSkeleton', () => {
  test('Количество линий зависит от пропа isWithSize', async () => {
    const wrapper = getFilesSkeleton();

    expect(wrapper.findAllComponents(LineSkeleton)).toHaveLength(4);

    await wrapper.setProps({ isWithSize: true });

    expect(wrapper.findAllComponents(LineSkeleton)).toHaveLength(6);
  });
});
