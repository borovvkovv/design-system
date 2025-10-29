import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseForm from '@comp/components/forms/BaseForm.vue';

const getBaseForm = () =>
  mount(BaseForm, {
    props: {
      validator: {
        $validate: () => new Promise((resolve) => resolve(true)),
        $touch: () => {},
      },
    },
    slots: {
      default: '<div />',
    },
    attachTo: document.body,
  });

describe('Компонент BaseForm', () => {
  test('Перед отправкой формы происходит валидация. Если валидация успешна, вызывается эмит submit', async () => {
    const wrapper = getBaseForm();

    expect(wrapper.emitted('submit')).toBeUndefined();

    await wrapper.trigger('submit');

    expect(wrapper.emitted('submit')).toHaveLength(1);

    await wrapper.setProps({
      validator: {
        $validate: () => new Promise((resolve) => resolve(false)),
        $touch: vi.fn(),
      },
    });

    await wrapper.trigger('submit');

    expect(wrapper.emitted('submit')).toHaveLength(1);
  });

  test('Перед каждой отправкой формы обновляется состояние элементов формы', async () => {
    const wrapper = getBaseForm();

    vi.spyOn(wrapper.vm.$props.validator, '$touch').mockImplementation(vi.fn());

    await wrapper.trigger('submit');

    expect(wrapper.vm.$props.validator.$touch).toHaveBeenCalledTimes(1);

    await wrapper.setProps({
      validator: {
        $validate: () => new Promise((resolve) => resolve(false)),
        $touch: vi.fn(),
      },
    });

    vi.spyOn(wrapper.vm.$props.validator, '$touch').mockImplementation(vi.fn());

    await wrapper.trigger('submit');

    expect(wrapper.vm.$props.validator.$touch).toHaveBeenCalledTimes(1);
  });

  test('Отправка формы происходит при вызове exposed-метода submit', async () => {
    const wrapper = getBaseForm();

    expect(wrapper.emitted('submit')).toBeUndefined();

    await wrapper.vm.submit();

    expect(wrapper.emitted('submit')).toHaveLength(1);
  });
});
