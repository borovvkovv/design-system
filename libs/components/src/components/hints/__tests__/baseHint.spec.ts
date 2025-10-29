import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseHint from '@comp/components/hints/BaseHint.vue';
import { HintType } from '@comp/components/hints/utils/models';

const getBaseHint = (props: InstanceType<typeof BaseHint>['$props']) =>
  mount(BaseHint, {
    props,
    slots: {
      default: '<div />',
    },
  });

describe('Компонент BaseHint', () => {
  test('При пропе type = Error, текст и фон красный', () => {
    const wrapper = getBaseHint({ type: HintType.Error });

    expect(wrapper.classes()).toContainEqual('bg-red-6');
    expect(wrapper.classes()).toContainEqual('text-red-3');
  });

  test('При пропе type = Info, текст белый, фон синий', async () => {
    const wrapper = getBaseHint({ type: HintType.Info });

    expect(wrapper.classes()).toContainEqual('bg-darkBlue-2');
    expect(wrapper.classes()).toContainEqual('text-white');
  });
});
