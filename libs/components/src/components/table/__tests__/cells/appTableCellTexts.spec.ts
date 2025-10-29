import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import AppLink from '@comp/components/app-link/AppLink.vue';
import AppTableCellTexts from '@comp/components/table/cells/AppTableCellTexts.vue';

const onLink1ClickHandler = vi.fn();
const onLink2ClickHandler = vi.fn();

const getAppTableCellTexts = () =>
  mount(AppTableCellTexts, {
    props: {
      cell: {
        type: 'texts',
        spans: [
          { type: 'text', text: 'TestText1' },
          { type: 'text', text: 'TestText2' },
          { type: 'link', href: 'http://testHref1', click: onLink1ClickHandler, title: 'TestTitle1' },
          { type: 'link', href: 'http://testHref2', click: onLink2ClickHandler, title: 'TestTitle2' },
        ],
      },
    },
  });

describe('Компонент AppTableCellTexts', () => {
  test('Отрисовывает элементы с простым текстом', () => {
    const wrapper = getAppTableCellTexts();

    expect(wrapper.text()).toContain('TestText1');
    expect(wrapper.text()).toContain('TestText2');
  });

  test('Отрисовывает элементы-ссылки', () => {
    const wrapper = getAppTableCellTexts();

    expect(wrapper.findAllComponents(AppLink)[0].vm.to).toStrictEqual('http://testHref1');
    expect(wrapper.findAllComponents(AppLink)[1].vm.to).toStrictEqual('http://testHref2');
    expect(wrapper.findAllComponents(AppLink)[0].text()).toBe('TestTitle1');
    expect(wrapper.findAllComponents(AppLink)[1].text()).toBe('TestTitle2');
  });

  test('При нажатии на элементы-ссылки вызывается функция, переданная через проп', async () => {
    const wrapper = getAppTableCellTexts();

    expect(onLink1ClickHandler).toHaveBeenCalledTimes(0);
    expect(onLink2ClickHandler).toHaveBeenCalledTimes(0);

    await wrapper.findAllComponents(AppLink)[0].trigger('click');

    expect(onLink1ClickHandler).toHaveBeenCalledTimes(1);
    expect(onLink2ClickHandler).toHaveBeenCalledTimes(0);

    await wrapper.findAllComponents(AppLink)[1].trigger('click');

    expect(onLink1ClickHandler).toHaveBeenCalledTimes(1);
    expect(onLink2ClickHandler).toHaveBeenCalledTimes(1);
  });
});
