import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { IconName } from '@comp/components/icons/utils/models';
import IconNone from '@comp/components/icons/IconNone.vue';
import IconArrangeAsc from '@comp/components/icons/IconArrangeAsc.vue';
import type { IAccordionWithInputProps } from '@comp/components/selects/utils/models';
import IconArrowDownTriangle from '@comp/components/icons/IconArrowDownTriangle.vue';
import AccordionItemWithInput from '@comp/components/selects/AccordionItemWithInput.vue';

const onIconClick = vi.fn();
const getAccordionItemWithInput = (props?: Partial<IAccordionWithInputProps<unknown>>) =>
  mount(AccordionItemWithInput, {
    props: {
      isDisabled: false,
      activeArrowOnTitleHover: false,
      modelValue: '',
      isInputError: false,
      title: '',
      pattern: '',
      textBeforeInput: '',
      actions: [
        {
          icon: IconName.IconNone,
          title: 'Test title action 1',
          onIconClick,
          isActive: false,
          isAlwaysVisible: false,
        },
        {
          icon: IconName.IconArrangeAsc,
          title: 'Test title action 2',
          onIconClick,
          isActive: false,
          isAlwaysVisible: true,
        },
      ],
      orderValue: '',
      ...props,
    },
    slots: { afterText: 'Test afterText', dropDown: 'Test dropDown' },
    global: {
      directives: {
        twMerge: {},
      },
    },
    attachTo: document.body,
  });

describe('Компонент AccordionItemWithInput', () => {
  test('При наведении курсора на заголовок выпадающего списка стрелка подсвечивается синим', async () => {
    const wrapper = getAccordionItemWithInput();
    await vi.dynamicImportSettled();

    await wrapper.find('[data-test="baseSimpleDropDownTitleSlot"]').trigger('mouseenter');

    expect(wrapper.findComponent(IconArrowDownTriangle).classes()).toContainEqual('text-blue-2');
    expect(wrapper.findComponent(IconNone).classes()).toContainEqual('text-blueGrey-2');
    expect(wrapper.findComponent(IconArrangeAsc).classes()).toContainEqual('text-blueGrey-2');
  });

  test('При нажатии на инпут, выпадающий список не разворачивается', async () => {
    vi.useFakeTimers();
    const wrapper = getAccordionItemWithInput();
    await vi.dynamicImportSettled();

    expect(wrapper.find<HTMLElement>('[data-test="dropDown"]').element.style.height).toBe('');

    await wrapper.find('input').trigger('click');
    await wrapper.find('[data-test="dropDown"]').trigger('transitionend');

    expect(wrapper.find<HTMLElement>('[data-test="dropDown"]').element.style.height).toBe('');
  });

  test('После введения в инпут значения и удалении его из фокуса вызывается эмит с введенным значением', async () => {
    vi.useFakeTimers();
    const wrapper = getAccordionItemWithInput();
    await vi.dynamicImportSettled();

    expect(wrapper.emitted('set-order:item')).toBeUndefined();

    await wrapper.find('input').setValue('TestValue');
    await wrapper.find('input').trigger('blur');

    expect(wrapper.emitted('set-order:item')).toHaveLength(1);
    expect(wrapper.emitted('set-order:item')?.[0]).toStrictEqual(['TestValue']);
  });

  test('Если ввести в инпут итоговое значение, которое было изначально перед фокусированием инпута, а затем удалить инпут из фокуса, то эмит не вызывается', async () => {
    vi.useFakeTimers();
    const wrapper = getAccordionItemWithInput({ orderValue: 'TestValue' });
    await vi.dynamicImportSettled();

    expect(wrapper.emitted('set-order:item')).toBeUndefined();

    await wrapper.find('input').setValue('SomethingDifferent');
    await wrapper.find('input').setValue('TestValue');
    await wrapper.find('input').trigger('blur');

    expect(wrapper.emitted('set-order:item')).toBeUndefined();
  });
});
