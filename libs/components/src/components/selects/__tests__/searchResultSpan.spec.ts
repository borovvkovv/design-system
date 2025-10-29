import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import { TextColorType } from '@comp/components/selects/utils/models';
import SearchResultSpan from '@comp/components/selects/SearchResultSpan.vue';

const getSearchResultSpan = (props?: Partial<InstanceType<typeof SearchResultSpan>['$props']>) =>
  mount(SearchResultSpan, {
    props: {
      text: 'Abc Abc',
      pattern: '',
      colorType: TextColorType.Text,
      greyTextOnHover: false,
      ...props,
    },
  });

describe('Компонент SearchResultSpan', () => {
  test.each`
    colorType                   | pattern        | spansText                  | classOnSpans
    ${TextColorType.Text}       | ${''}          | ${['Abc Abc']}             | ${['']}
    ${TextColorType.Text}       | ${'A'}         | ${['A', 'bc ', 'A', 'bc']} | ${['text-blue-2', '', 'text-blue-2', '']}
    ${TextColorType.Text}       | ${'a'}         | ${['A', 'bc', 'A', 'bc']}  | ${['text-blue-2', '', 'text-blue-2', '']}
    ${TextColorType.Text}       | ${'Abc'}       | ${['Abc', ' ', 'Abc']}     | ${['text-blue-2', '', 'text-blue-2']}
    ${TextColorType.Text}       | ${'abc'}       | ${['Abc', ' ', 'Abc']}     | ${['text-blue-2', '', 'text-blue-2']}
    ${TextColorType.Text}       | ${'bc'}        | ${['A', 'bc', ' A', 'bc']} | ${['', 'text-blue-2', '', 'text-blue-2']}
    ${TextColorType.Text}       | ${'c'}         | ${['Ab', 'c', ' Ab', 'c']} | ${['', 'text-blue-2', '', 'text-blue-2']}
    ${TextColorType.Text}       | ${' '}         | ${['Abc', ' ', 'Abc']}     | ${['', 'text-blue-2', '']}
    ${TextColorType.Text}       | ${' Abc'}      | ${['Abc', ' Abc']}         | ${['', 'text-blue-2']}
    ${TextColorType.Text}       | ${'Abc '}      | ${['Abc ', 'Abc']}         | ${['text-blue-2', '']}
    ${TextColorType.Text}       | ${'Abc Abc'}   | ${['Abc Abc']}             | ${['text-blue-2']}
    ${TextColorType.Text}       | ${'Abc Abc '}  | ${['Abc Abc']}             | ${['']}
    ${TextColorType.Text}       | ${' Abc Abc'}  | ${['Abc Abc']}             | ${['']}
    ${TextColorType.Text}       | ${'Different'} | ${['Abc Abc']}             | ${['']}
    ${TextColorType.BackGround} | ${''}          | ${['Abc Abc']}             | ${['']}
    ${TextColorType.BackGround} | ${'A'}         | ${['A', 'bc ', 'A', 'bc']} | ${['bg-green-4', '', 'bg-green-4', '']}
    ${TextColorType.BackGround} | ${'a'}         | ${['A', 'bc', 'A', 'bc']}  | ${['bg-green-4', '', 'bg-green-4', '']}
    ${TextColorType.BackGround} | ${'Abc'}       | ${['Abc', ' ', 'Abc']}     | ${['bg-green-4', '', 'bg-green-4']}
    ${TextColorType.BackGround} | ${'abc'}       | ${['Abc', ' ', 'Abc']}     | ${['bg-green-4', '', 'bg-green-4']}
    ${TextColorType.BackGround} | ${'bc'}        | ${['A', 'bc', ' A', 'bc']} | ${['', 'bg-green-4', '', 'bg-green-4']}
    ${TextColorType.BackGround} | ${'c'}         | ${['Ab', 'c', ' Ab', 'c']} | ${['', 'bg-green-4', '', 'bg-green-4']}
    ${TextColorType.BackGround} | ${' '}         | ${['Abc', ' ', 'Abc']}     | ${['', 'bg-green-4', '']}
    ${TextColorType.BackGround} | ${' Abc'}      | ${['Abc', ' Abc']}         | ${['', 'bg-green-4']}
    ${TextColorType.BackGround} | ${'Abc '}      | ${['Abc ', 'Abc']}         | ${['bg-green-4', '']}
    ${TextColorType.BackGround} | ${'Abc Abc'}   | ${['Abc Abc']}             | ${['bg-green-4']}
    ${TextColorType.BackGround} | ${'Abc Abc '}  | ${['Abc Abc']}             | ${['']}
    ${TextColorType.BackGround} | ${' Abc Abc'}  | ${['Abc Abc']}             | ${['']}
    ${TextColorType.BackGround} | ${'Different'} | ${['Abc Abc']}             | ${['']}
  `('', async ({ colorType, pattern, spansText, classOnSpans }) => {
    const wrapper = getSearchResultSpan({ colorType, pattern });
    const spans = wrapper.findAll('span');
    const coloredTextClass = colorType === TextColorType.Text ? 'text-blue-2' : 'bg-green-4';

    expect(spans).toHaveLength(spansText.length);

    classOnSpans.forEach((classOnSpan: string, spanIndex: number) => {
      if (classOnSpan === '') expect(spans[spanIndex].classes()).not.toContainEqual(coloredTextClass);
      else expect(spans[spanIndex].classes()).toContainEqual(classOnSpan);
    });
  });
});
