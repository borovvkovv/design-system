import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import Page from '@comp/components/paginator/Page.vue';

const getPage = () =>
  mount(Page, {
    props: {
      pageNumber: 5,
      currentPage: 1,
    },
    attachTo: document.body,
  });

describe('Компонент Page', () => {
  test('Компонент отображает номер страницы', async () => {
    const wrapper = getPage();

    expect(wrapper.text()).toContain('5');
  });

  test('При нажатии на компонент вызывается эмит click:page с текущей страницы', async () => {
    const wrapper = getPage();

    expect(wrapper.emitted('click:page')).toBeUndefined();

    await wrapper.trigger('click');

    expect(wrapper.emitted('click:page')).toHaveLength(1);
    expect(wrapper.emitted('click:page')?.[0]).toStrictEqual([5]);
  });
});
