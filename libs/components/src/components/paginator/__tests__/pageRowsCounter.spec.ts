import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import PageRowsCounter from '@comp/components/paginator/PageRowsCounter.vue';

const getPageRowsCounter = (props?: Partial<InstanceType<typeof PageRowsCounter>['$props']>) =>
  mount(PageRowsCounter, {
    props: {
      itemsPerPageList: [10, 20, 30],
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 55,
      ...props,
    },
  });

describe('Компонент PageRowsCounter', () => {
  test('Компонент отображает информацию об идексах элементов на странице и общее количество элементов', async () => {
    const wrapper = getPageRowsCounter();

    expect(wrapper.text()).toContain('1-10 из 55');
  });

  test('Если выбрать другое значение количества элементов на странице, то вызвется эмит update:itemsPerPage с новым значением', async () => {
    const wrapper = getPageRowsCounter();

    await wrapper.find('input').trigger('input');
    await wrapper.findAll('li')[1].trigger('click');

    expect(wrapper.emitted('update:itemsPerPage')).toHaveLength(1);
    expect(wrapper.emitted('update:itemsPerPage')?.[0]).toStrictEqual([20]);
  });

  test('Если выбрать другое значение количества элементов на странице, то происходит перерасчет идексов элементов на странице', async () => {
    const wrapper = getPageRowsCounter();

    expect(wrapper.text()).toContain('1-10 из 55');

    await wrapper.find('input').trigger('input');
    await wrapper.findAll('li')[1].trigger('click');

    expect(wrapper.text()).toContain('1-20 из 55');
  });

  test.each`
    currentPage | itemsPerPage | totalItems | result
    ${1}        | ${10}        | ${55}      | ${'1-10 из 55'}
    ${1}        | ${20}        | ${55}      | ${'1-20 из 55'}
    ${1}        | ${30}        | ${55}      | ${'1-30 из 55'}
    ${1}        | ${40}        | ${55}      | ${'1-40 из 55'}
    ${1}        | ${50}        | ${55}      | ${'1-50 из 55'}
    ${1}        | ${60}        | ${55}      | ${'1-55 из 55'}
    ${1}        | ${10}        | ${55}      | ${'1-10 из 55'}
    ${2}        | ${10}        | ${55}      | ${'11-20 из 55'}
    ${3}        | ${10}        | ${55}      | ${'21-30 из 55'}
    ${4}        | ${10}        | ${55}      | ${'31-40 из 55'}
    ${5}        | ${10}        | ${55}      | ${'41-50 из 55'}
    ${6}        | ${10}        | ${55}      | ${'51-55 из 55'}
  `(
    'Текущая страница - $currentPage, на странице отображаются $itemsPerPage элементов из $totalItems, то текст будет - $result',
    async ({ currentPage, itemsPerPage, totalItems, result }) => {
      const wrapper = getPageRowsCounter({ currentPage, itemsPerPage, totalItems, itemsPerPageList: [itemsPerPage] });

      expect(wrapper.text()).toBe(result);
    },
  );
});
