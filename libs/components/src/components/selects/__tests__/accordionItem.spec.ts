import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { IconName } from '@comp/components/icons/utils/models';
import IconNone from '@comp/components/icons/IconNone.vue';
import IconArrangeAsc from '@comp/components/icons/IconArrangeAsc.vue';
import AccordionItem from '@comp/components/selects/AccordionItem.vue';
import type { IAccordionProps } from '@comp/components/selects/utils/models';
import IconArrowUpTriangle from '@comp/components/icons/IconArrowUpTriangle.vue';
import BaseSimpleDropDown from '@comp/components/selects/BaseSimpleDropDown.vue';
import IconArrowDownTriangle from '@comp/components/icons/IconArrowDownTriangle.vue';

const onIconClick = vi.fn();
const getAccordionItem = (props?: IAccordionProps<unknown>) =>
  mount(AccordionItem, {
    props: {
      isDisabled: false,
      activeArrowOnTitleHover: false,
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
      ...props,
    },
    slots: { title: 'Test title', dropDown: 'Test dropDown' },
    global: {
      directives: {
        twMerge: {},
      },
    },
    attachTo: document.body,
  });

describe('Компонент AccordionItem', () => {
  test('Если проп isDisabled=true, то все события курсора на компоненте отключаются', () => {
    const wrapper = getAccordionItem({ isDisabled: true });

    expect(wrapper.findComponent(BaseSimpleDropDown).find('div').classes()).toContainEqual('pointer-events-none');
  });

  test('Иконка-стрелка меняется при сворачивании/разворачивании выпадающего списка', async () => {
    vi.useFakeTimers();
    const wrapper = getAccordionItem();
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(IconArrowUpTriangle).exists()).toBeFalsy();
    expect(wrapper.findComponent(IconArrowDownTriangle).exists()).toBeTruthy();

    await wrapper.findComponent(IconArrowDownTriangle).trigger('click');
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(IconArrowUpTriangle).exists()).toBeTruthy();
    expect(wrapper.findComponent(IconArrowDownTriangle).exists()).toBeFalsy();

    await wrapper.findComponent(IconArrowUpTriangle).trigger('click');
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(IconArrowUpTriangle).exists()).toBeFalsy();
    expect(wrapper.findComponent(IconArrowDownTriangle).exists()).toBeTruthy();
  });

  test('Икнока-стрелка всегда видна', async () => {
    const wrapper = getAccordionItem();
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(IconArrowDownTriangle).classes()).not.toContainEqual('hidden');
  });

  test('Икнока действия видна в зависимости от пропа', async () => {
    const wrapper = getAccordionItem();
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(IconNone).classes()).toContainEqual('hidden');
    expect(wrapper.findComponent(IconArrangeAsc).classes()).not.toContainEqual('hidden');
  });

  test('При наведении на заголовок выпадающего списка отображаются все иконки действий', async () => {
    vi.useFakeTimers();
    const wrapper = getAccordionItem();
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(IconNone).classes()).toContainEqual('hidden');
    expect(wrapper.findComponent(IconArrangeAsc).classes()).not.toContainEqual('hidden');

    await wrapper.find('[data-test="baseSimpleDropDownTitleSlot"]').trigger('mouseenter');

    expect(wrapper.findComponent(IconNone).classes()).not.toContainEqual('hidden');
    expect(wrapper.findComponent(IconArrangeAsc).classes()).not.toContainEqual('hidden');
  });

  test('При наведении на иконку-стрелку отображается текст "Свернуть"/"Развернуть"', async () => {
    vi.useFakeTimers();
    const wrapper = getAccordionItem();
    await vi.dynamicImportSettled();

    await wrapper.findComponent(IconArrowDownTriangle).trigger('mouseenter');

    expect(wrapper.text()).toContain('Развернуть');
    expect(wrapper.text()).not.toContain('Свернуть');

    await wrapper.findComponent(IconArrowDownTriangle).trigger('click');
    await vi.dynamicImportSettled();
    await wrapper.findComponent(IconArrowUpTriangle).trigger('mouseenter');

    expect(wrapper.text()).not.toContain('Развернуть');
    expect(wrapper.text()).toContain('Свернуть');
  });
});
