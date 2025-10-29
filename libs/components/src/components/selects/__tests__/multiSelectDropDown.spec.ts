import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import MultiSelectDropDown from '@comp/components/selects/MultiSelectDropDown.vue';

const options = [
  { title: 'Title1', value: 'Value1' },
  { title: 'Title2', value: 'Value2' },
  { title: 'Title3', value: 'Value3' },
];

const getMultiSelectDropDown = (props?: Partial<InstanceType<typeof MultiSelectDropDown>['$props']>) =>
  mount(MultiSelectDropDown, {
    props: {
      selectedOptions: [options[0]],
      selectedOptionsLocal: [options[0]],
      options,
      query: '',
      ...props,
    },
    attachTo: document.body,
  });

describe('Компонент MultiSelectDropDown', () => {
  test(`Если выбранных элементов нет, то список для выбранных элементов не отображается, и заголовки тоже не отображаются`, async () => {
    const wrapper = getMultiSelectDropDown({ selectedOptions: [], selectedOptionsLocal: [] });

    expect(wrapper.findAll('ul')).toHaveLength(1);
    expect(wrapper.find('ul').text()).not.toContain('Выбранные');
    expect(wrapper.find('ul').text()).not.toContain('Остальные');
  });

  test(`Если все элементы выбраны, то список для не выбранных элементов не отображается, но заголовки отображаются`, async () => {
    const wrapper = getMultiSelectDropDown({ selectedOptions: options, selectedOptionsLocal: options });

    const selectedOptions = wrapper.findAll('ul')[0];
    const notSelectedOptions = wrapper.findAll('ul')[1];

    expect(selectedOptions.text()).toContain('Выбранные');
    expect(selectedOptions.text()).toContain('Остальные');
    expect(notSelectedOptions.text()).toBe('');
  });

  test(`При нажатии на элемент списка, вызывается эмит click:option с данным элементом`, async () => {
    const wrapper = getMultiSelectDropDown();

    const selectedOptions = wrapper.findAll('ul')[0].findAll('li');
    const notSelectedOptions = wrapper.findAll('ul')[1].findAll('li');

    await selectedOptions[1].trigger('click');

    expect(wrapper.emitted('click:option')).toHaveLength(1);
    expect(wrapper.emitted('click:option')?.[0]).toStrictEqual([options[0]]);

    await notSelectedOptions[0].trigger('click');

    expect(wrapper.emitted('click:option')).toHaveLength(2);
    expect(wrapper.emitted('click:option')?.[1]).toStrictEqual([options[1]]);

    await notSelectedOptions[1].trigger('click');

    expect(wrapper.emitted('click:option')).toHaveLength(3);
    expect(wrapper.emitted('click:option')?.[2]).toStrictEqual([options[2]]);
  });

  test.each`
    selectedOptions             | outSelectedOptions                | outNotSelectedOptions
    ${[]}                       | ${[]}                             | ${['Title1', 'Title2', 'Title3']}
    ${[options[0]]}             | ${['Title1']}                     | ${['Title2', 'Title3']}
    ${[options[0], options[1]]} | ${['Title1', 'Title2']}           | ${['Title3']}
    ${options}                  | ${['Title1', 'Title2', 'Title3']} | ${[]}
  `(
    'При выбранных элементах $selectedOptions в списке выбранных элементов: $outSelectedOptions, не выбранных элементов: $outNotSelectedOptions',
    async ({ selectedOptions, outSelectedOptions, outNotSelectedOptions }) => {
      const wrapper = getMultiSelectDropDown({ selectedOptions, selectedOptionsLocal: selectedOptions });

      const selectedOptionsElement = wrapper.findAll('ul')[0];
      const notSelectedOptionsElement = selectedOptions.length ? wrapper.findAll('ul')[1] : wrapper.findAll('ul')[0];

      if (outSelectedOptions.length === 0) {
        expect(wrapper.findAll('ul')).toHaveLength(1);
      }

      outSelectedOptions.forEach((outSelectedOption: string) => {
        expect(selectedOptionsElement.text()).toContain(outSelectedOption);
      });

      if (outNotSelectedOptions.length === 0) {
        expect(notSelectedOptionsElement.text()).not.toContain('Title1');
        expect(notSelectedOptionsElement.text()).not.toContain('Title2');
        expect(notSelectedOptionsElement.text()).not.toContain('Title3');
      }

      outNotSelectedOptions.forEach((outNotSelectedOption: string) => {
        expect(notSelectedOptionsElement.text()).toContain(outNotSelectedOption);
      });
    },
  );

  test.each`
    query         | selectedOptions             | outSelectedOptions | outNotSelectedOptions
    ${'title2'}   | ${[options[0]]}             | ${[]}              | ${['Title2']}
    ${'title2'}   | ${[options[0], options[1]]} | ${['Title2']}      | ${[]}
    ${'title2'}   | ${options}                  | ${['Title2']}      | ${[]}
    ${'diffeent'} | ${options}                  | ${[]}              | ${[]}
  `(
    'При выбранных элементах $selectedOptions и запросе $query в списке выбранных элементов: $outSelectedOptions, не выбранных элементов: $outNotSelectedOptions',
    async ({ query, selectedOptions, outSelectedOptions, outNotSelectedOptions }) => {
      const wrapper = getMultiSelectDropDown({ query, selectedOptions, selectedOptionsLocal: selectedOptions });

      const selectedOptionsElement = wrapper.findAll('ul')[0];
      const notSelectedOptionsElement = wrapper.findAll('ul')[1];

      if (outSelectedOptions.length === 0) {
        expect(selectedOptionsElement.text()).not.toContain('Title1');
        expect(selectedOptionsElement.text()).not.toContain('Title2');
        expect(selectedOptionsElement.text()).not.toContain('Title3');
      }

      outSelectedOptions.forEach((outSelectedOption: string) => {
        expect(selectedOptionsElement.text()).toContain(outSelectedOption);
      });

      if (outNotSelectedOptions.length === 0) {
        expect(notSelectedOptionsElement.text()).not.toContain('Title1');
        expect(notSelectedOptionsElement.text()).not.toContain('Title2');
        expect(notSelectedOptionsElement.text()).not.toContain('Title3');
      }
      outNotSelectedOptions.forEach((outNotSelectedOption: string) => {
        expect(notSelectedOptionsElement.text()).toContain(outNotSelectedOption);
      });
    },
  );
});
