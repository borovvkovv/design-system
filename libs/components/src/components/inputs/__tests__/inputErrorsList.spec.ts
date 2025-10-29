import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import InputErrorsList from '@comp/components/inputs/InputErrorsList.vue';

const getInputErrorsList = (props?: Partial<InstanceType<typeof InputErrorsList>['$props']>) =>
  mount(InputErrorsList, {
    props: {
      errorList: ['Test error1', 'Test error2', 'Test error3'],
      ...props,
    },
  });

describe('Компонент InputErrorsList', async () => {
  test('Если задан список ошибок, то он отображается', async () => {
    const wrapper = getInputErrorsList();

    expect(wrapper.text()).toContain('Test error1');
    expect(wrapper.text()).toContain('Test error2');
    expect(wrapper.text()).toContain('Test error3');

    await wrapper.setProps({ errorList: [] });

    expect(wrapper.text()).toBe('');
  });
});
