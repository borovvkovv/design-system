import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { IconName } from '@comp/components/icons/utils/models';
import IconNone from '@comp/components/icons/IconNone.vue';
import AccordionItemAction from '@comp/components/selects/AccordionItemAction.vue';

const onIconClick = vi.fn();
const getAccordionItemAction = () =>
  mount(AccordionItemAction, {
    props: {
      action: {
        icon: IconName.IconNone,
        title: 'Test title',
        onIconClick,
        isActive: true,
        isAlwaysVisible: true,
      },
      isItemHover: true,
    },
    global: {
      directives: {
        twMerge: {},
      },
    },
  });

describe('Компонент AccordionItemAction', () => {
  test('При наведении курсора на иконку открывается попап', async () => {
    vi.useFakeTimers();
    const wrapper = getAccordionItemAction();

    expect(wrapper.text()).toBe('');
    await vi.dynamicImportSettled();

    await wrapper.findComponent(IconNone).trigger('mouseenter', { evt: new MouseEvent('') });

    expect(wrapper.text()).toBe('Test title');
  });

  test('При выведении курсора с иконки закрывается попап', async () => {
    vi.useFakeTimers();
    const wrapper = getAccordionItemAction();

    expect(wrapper.text()).toBe('');
    await vi.dynamicImportSettled();

    await wrapper.findComponent(IconNone).trigger('mouseenter', { evt: new MouseEvent('') });
    await wrapper.findComponent(IconNone).trigger('mouseleave');

    expect(wrapper.text()).toBe('');
  });

  test('При нажатии на иконку вызывается колбэк из пропа', async () => {
    vi.useFakeTimers();
    const wrapper = getAccordionItemAction();

    expect(wrapper.text()).toBe('');
    await vi.dynamicImportSettled();

    expect(onIconClick).toHaveBeenCalledTimes(0);

    await wrapper.findComponent(IconNone).trigger('click.stop');

    expect(onIconClick).toHaveBeenCalledTimes(1);
  });

  test('Если пропы action.isActive, action.isAlwaysVisible, isItemHover - false, то иконка невидима', async () => {
    vi.useFakeTimers();
    const wrapper = mount(AccordionItemAction, {
      props: {
        action: {
          icon: IconName.IconNone,
          title: 'Test title',
          onIconClick,
          isActive: false,
          isAlwaysVisible: false,
        },
        isItemHover: false,
      },
      global: {
        directives: {
          twMerge: {},
        },
      },
    });

    expect(wrapper.text()).toBe('');
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(IconNone).classes()).toContainEqual('hidden');
  });
});
