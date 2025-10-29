import { afterEach, describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import IconLoading from '@comp/components/icons/IconLoading.vue';
import AppTableCellButtons from '@comp/components/table/cells/AppTableCellButtons.vue';

const callBack1 = vi.fn();
const callBack2 = vi.fn();

const getAppTableCellButtons = () =>
  mount(AppTableCellButtons, {
    props: {
      cellButtons: [
        {
          isDisabled: false,
          type: 'button',
          text: 'TestButton1',
          isLoading: false,
          click: callBack1,
        },
        {
          isDisabled: true,
          type: 'button',
          text: 'TestButton2',
          isLoading: true,
          click: callBack2,
        },
      ],
    },
    global: {
      directives: {
        twMerge: {},
      },
    },
  });

describe('Компонент AppTableCellButtons', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Компонент отрисовывает текст кнопок, если они не в состоянии загрузки', () => {
    const wrapper = getAppTableCellButtons();

    expect(wrapper.text()).toContain('TestButton1');
    expect(wrapper.text()).not.toContain('TestButton2');
  });

  test('Кнопка заблокирована, если ей передан соответствующий проп', () => {
    const wrapper = getAppTableCellButtons();

    expect(wrapper.findAll('button')[0].element.disabled).toBeFalsy();
    expect(wrapper.findAll('button')[1].element.disabled).toBeTruthy();
  });

  test('Если кнопка в состоянии загрузки, то отображается иконка загрузки', async () => {
    const wrapper = getAppTableCellButtons();
    await vi.dynamicImportSettled();

    expect(wrapper.findAll('button')[0].findComponent(IconLoading).exists()).toBeFalsy();
    expect(wrapper.findAll('button')[1].findComponent(IconLoading).exists()).toBeTruthy();
  });

  test('При нажатии на кнопку, вызыватся колбэк, переданный через проп', async () => {
    const wrapper = getAppTableCellButtons();

    await wrapper.findAll('button')[0].trigger('click');

    expect(callBack1).toHaveBeenCalledOnce();
  });

  test('Если кнопка заблокирована, то при нажатии на кнопку колбэк не вызывается', async () => {
    const wrapper = getAppTableCellButtons();

    await wrapper.findAll('button')[0].trigger('click');
    await wrapper.findAll('button')[1].trigger('click');

    expect(callBack1).toHaveBeenCalledOnce();
    expect(callBack2).not.toHaveBeenCalledOnce();
  });
});
