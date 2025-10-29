import { describe, expect, test, vitest } from 'vitest';
import { Size } from '@comp/enums';
import { mount } from '@vue/test-utils';
import { IconName } from '@comp/components/icons/utils/models';
import IconQuestionFill from '@comp/components/icons/IconQuestionFill.vue';
import { IconPosition } from '@comp/components/buttons/utils/models';
import IconTextButton from '@comp/components/buttons/IconTextButton.vue';

const getIconTextButton = (props?: Partial<Pick<InstanceType<typeof IconTextButton>, '$props'>['$props']>) =>
  mount(IconTextButton, {
    props: {
      iconName: IconName.IconQuestionFill,
      text: 'Test button text',
      ...props,
    },
    global: {
      directives: {
        twMerge: {},
      },
    },
  });

describe('Компонент IconTextButton', () => {
  test('Отображаются передаваемые через пропсы текст и иконка', async () => {
    const wrapper = getIconTextButton();
    await vitest.dynamicImportSettled();

    expect(wrapper.findComponent(IconQuestionFill).exists()).toBeTruthy();
    expect(wrapper.find(':scope > *').html()).toContain('Test button text');
  });

  test('Текст и иконка меняются местами при изменении пропа iconPosition', async () => {
    const wrapper = getIconTextButton({
      iconPosition: IconPosition.Left,
    });

    expect(wrapper.find(':scope > *').classes()).toContain('flex-row');

    await wrapper.setProps({
      iconPosition: IconPosition.Right,
    });

    expect(wrapper.find(':scope > *').classes()).toContain('flex-row-reverse');
  });

  test('Размер иконки меняется в зависимости от пропа size', async () => {
    const wrapper = getIconTextButton({
      size: Size.M,
    });
    await vitest.dynamicImportSettled();

    expect(wrapper.findComponent(IconQuestionFill).vm.size).toBe(20);

    await wrapper.setProps({
      size: Size.S,
    });

    expect(wrapper.findComponent(IconQuestionFill).vm.size).toBe(20);

    await wrapper.setProps({
      size: Size.XS,
    });

    expect(wrapper.findComponent(IconQuestionFill).vm.size).toBe(16);
  });

  test('При пропсе isLoading отображается только иконка загрукзи на IconTextButton', async () => {
    const wrapper = getIconTextButton({
      isLoading: true,
    });

    expect(wrapper.findComponent(IconTextButton).exists()).toBeTruthy();

    await wrapper.setProps({
      isLoading: false,
    });
    await vitest.dynamicImportSettled();

    expect(wrapper.findComponent(IconQuestionFill).exists()).toBeTruthy();
  });

  test('При пропсе for отображается элемент label поверх всего компонента IconTextButton', async () => {
    const wrapper = getIconTextButton({
      for: 'Text input id',
    });

    expect(wrapper.find('label').exists()).toBeTruthy();

    await wrapper.setProps({
      for: undefined,
    });
    await vitest.dynamicImportSettled();

    expect(wrapper.find('label').exists()).toBeFalsy();
  });
});
