import { describe, expect, test, vitest } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseButton from '@comp/components/buttons/BaseButton.vue';
import TextButton from '@comp/components/buttons/TextButton.vue';
import IconLoading from '@comp/components/icons/IconLoading.vue';

const getTextButton = (props?: Partial<Pick<InstanceType<typeof TextButton>, '$props'>['$props']>) =>
  mount(TextButton, {
    props: {
      text: 'Test text',
      ...props,
    },
    global: {
      directives: {
        twMerge: {},
      },
    },
  });

describe('Компонент TextButton', () => {
  test('Компонент TextButton отрисовывает текст', async () => {
    const wrapper = getTextButton();
    await vitest.dynamicImportSettled();

    expect(wrapper.findComponent(BaseButton).text()).toBe('Test text');
  });

  test('Отображается иконка загрузки при пропе isLoading', async () => {
    const wrapper = getTextButton({
      isLoading: true,
    });
    await vitest.dynamicImportSettled();

    expect(wrapper.findComponent(IconLoading).exists()).toBeTruthy();

    await wrapper.setProps({
      isLoading: false,
    });

    expect(wrapper.findComponent(IconLoading).exists()).toBeFalsy();
  });
});
