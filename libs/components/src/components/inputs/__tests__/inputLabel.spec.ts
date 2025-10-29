import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import IconMarker from '@comp/components/icons/IconMarker.vue';
import InputLabel from '@comp/components/inputs/InputLabel.vue';

const getInputLabel = (props?: Partial<InstanceType<typeof InputLabel>['$props']>) =>
  mount(InputLabel, {
    props: {
      label: 'Test label',
      required: true,
      ...props,
    },
  });

describe('Компонент InputLabel', async () => {
  test('Если задана подпись через проп, то она отображается', () => {
    const wrapper = getInputLabel();

    expect(wrapper.text()).toContain('Test label');
  });

  test('Если инпут обязателен к заполнению, то к подписи добавляется красная метка', async () => {
    const wrapper = getInputLabel();
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(IconMarker).exists()).toBeTruthy();

    await wrapper.setProps({ required: false });
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(IconMarker).exists()).toBeFalsy();
  });
});
