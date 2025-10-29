import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Paginator from '@comp/components/paginator/Paginator.vue';
import AppLink from '@comp/components/app-link/AppLink.vue';
import IconArrowLeft from '@comp/components/icons/IconArrowLeft.vue';
import IconArrowRight from '@comp/components/icons/IconArrowRight.vue';
import Page from '@comp/components/paginator/Page.vue';

const getPaginator = (props?: Partial<InstanceType<typeof Paginator>['$props']>) => {
  const wrapper = mount(Paginator, {
    props: {
      maxPages: 6,
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 75,
      'onUpdate:itemsPerPage': (newValue) => {
        wrapper.setProps({ itemsPerPage: newValue });
      },
      ...props,
    },
  });

  return wrapper;
};

describe('Компонент Paginator', () => {
  test('Если выбрать другое значение количества элементов на странице, то вызвется эмит update:itemsPerPage с новым значением', async () => {
    const wrapper = getPaginator();

    await wrapper.find('input').trigger('input');
    await wrapper.findAll('li')[1].trigger('click');

    expect(wrapper.emitted('update:itemsPerPage')).toHaveLength(1);
    expect(wrapper.emitted('update:itemsPerPage')?.[0]).toStrictEqual([60]);
  });

  test('Если нажать на индекс страницы, то вызвется эмит update:currentPage с данным индексом', async () => {
    const wrapper = getPaginator();
    const thirdPage = wrapper.findAllComponents(Page)[2];

    await thirdPage.trigger('click');

    expect(wrapper.emitted('update:currentPage')).toHaveLength(1);
    expect(wrapper.emitted('update:currentPage')?.[0]).toStrictEqual([3]);
  });

  test('Если нажать на стрелки, то вызвется эмит update:currentPage с новым значением', async () => {
    const wrapper = getPaginator();
    await vi.dynamicImportSettled();

    const leftArrow = wrapper.findComponent(IconArrowLeft);
    const rightArrow = wrapper.findComponent(IconArrowRight);

    await rightArrow.trigger('click');

    expect(wrapper.emitted('update:currentPage')).toHaveLength(1);
    expect(wrapper.emitted('update:currentPage')?.[0]).toStrictEqual([2]);

    await leftArrow.trigger('click');

    expect(wrapper.emitted('update:currentPage')).toHaveLength(2);
    expect(wrapper.emitted('update:currentPage')?.[1]).toStrictEqual([0]);
  });

  test('При изменении количества элементов на странице, текущая страница сбрысывается на первую', async () => {
    vi.useFakeTimers();
    const wrapper = getPaginator();
    await vi.dynamicImportSettled();

    const rightArrow = wrapper.findComponent(IconArrowRight);

    await rightArrow.trigger('click');

    expect(wrapper.emitted('update:currentPage')).toHaveLength(1);
    expect(wrapper.emitted('update:currentPage')?.[0]).toStrictEqual([2]);

    await wrapper.find('input').trigger('input');
    await wrapper.findAll('li')[1].trigger('click');

    expect(wrapper.emitted('update:currentPage')).toHaveLength(2);
    expect(wrapper.emitted('update:currentPage')?.[1]).toStrictEqual([1]);
  });

  test.each`
    currentPage | maxPages | LADisabled   | RADisabled   | LAVisible | RAVisible
    ${1}        | ${1}     | ${undefined} | ${undefined} | ${false}  | ${false}
    ${1}        | ${6}     | ${true}      | ${false}     | ${true}   | ${true}
    ${2}        | ${6}     | ${false}     | ${false}     | ${true}   | ${true}
    ${5}        | ${6}     | ${false}     | ${false}     | ${true}   | ${true}
    ${6}        | ${6}     | ${false}     | ${true}      | ${true}   | ${true}
  `(
    'Текущая страница $currentPage из $maxPages "<-" видна - $LAVisible, неактивна - $LADisabled. "->" видна - $RAVisible, неактивна $RADisabled',
    async ({ currentPage, maxPages, LADisabled, RADisabled, LAVisible, RAVisible }) => {
      const wrapper = getPaginator({ currentPage, maxPages });
      await vi.dynamicImportSettled();

      const leftArrow = wrapper.findComponent(IconArrowLeft);
      const rightArrow = wrapper.findComponent(IconArrowRight);
      const leftArrowLink = wrapper.findAllComponents(AppLink)[0];
      const rightArrowLink = wrapper.findAllComponents(AppLink)[1];

      expect(leftArrow.exists()).toBe(LAVisible);
      expect(rightArrow.exists()).toBe(RAVisible);

      if (LADisabled !== undefined) expect(leftArrowLink.vm.isDisabled).toBe(LADisabled);

      if (LADisabled !== undefined) expect(rightArrowLink.vm.isDisabled).toBe(RADisabled);
    },
  );

  test.each`
    currentPage | maxPages | result
    ${1}        | ${1}     | ${'1'}
    ${1}        | ${2}     | ${'12'}
    ${1}        | ${3}     | ${'123'}
    ${1}        | ${4}     | ${'1234'}
    ${1}        | ${5}     | ${'12345'}
    ${1}        | ${6}     | ${'1234 ... 6'}
    ${1}        | ${7}     | ${'1234 ... 7'}
  `(
    'Текущая страница $currentPage из $maxPages отображение индексов страниц: $result',
    async ({ currentPage, maxPages, result }) => {
      const wrapper = getPaginator({ currentPage, maxPages });
      await vi.dynamicImportSettled();

      expect(wrapper.text()).toContain(result);
    },
  );
});
