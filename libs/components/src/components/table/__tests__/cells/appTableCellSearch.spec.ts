import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import AppTableCellSearch from '@comp/components/table/cells/AppTableCellSearch.vue';

const getAppTableCellSearch = (props?: Partial<InstanceType<typeof AppTableCellSearch>['$props']['cell']>) =>
  mount(AppTableCellSearch, {
    props: {
      cell: {
        type: 'search',
        text: 'Abc Abc',
        pattern: '',
        ...props,
      },
    },
  });

describe('Компонент AppTableCellSearch', () => {
  test.each`
    pattern        | spansText                  | classOnSpans
    ${''}          | ${['Abc Abc']}             | ${['']}
    ${'A'}         | ${['A', 'bc ', 'A', 'bc']} | ${['bg-green-4', '', 'bg-green-4', '']}
    ${'a'}         | ${['A', 'bc ', 'A', 'bc']} | ${['bg-green-4', '', 'bg-green-4', '']}
    ${'Abc'}       | ${['Abc', ' ', 'Abc']}     | ${['bg-green-4', '', 'bg-green-4']}
    ${'abc'}       | ${['Abc', ' ', 'Abc']}     | ${['bg-green-4', '', 'bg-green-4']}
    ${'bc'}        | ${['A', 'bc', ' A', 'bc']} | ${['', 'bg-green-4', '', 'bg-green-4']}
    ${'c'}         | ${['Ab', 'c', ' Ab', 'c']} | ${['', 'bg-green-4', '', 'bg-green-4']}
    ${' '}         | ${['Abc', ' ', 'Abc']}     | ${['', 'bg-green-4', '']}
    ${' Abc'}      | ${['Abc', ' Abc']}         | ${['', 'bg-green-4']}
    ${'Abc '}      | ${['Abc ', 'Abc']}         | ${['bg-green-4', '']}
    ${'Abc Abc'}   | ${['Abc Abc']}             | ${['bg-green-4']}
    ${'Abc Abc '}  | ${['Abc Abc']}             | ${['']}
    ${' Abc Abc'}  | ${['Abc Abc']}             | ${['']}
    ${'Different'} | ${['Abc Abc']}             | ${['']}
  `(
    'pattern=$pattern, spansText=$spansText, classOnSpans=$classOnSpans',
    async ({ pattern, spansText, classOnSpans }) => {
      const wrapper = getAppTableCellSearch({ pattern });
      const spans = wrapper.findAll('span');

      expect(spans).toHaveLength(spansText.length);

      spans.forEach((span, spanIndex) => {
        expect(span.element.textContent).toBe(spansText[spanIndex]);
      });

      classOnSpans.forEach((classOnSpan: string, spanIndex: number) => {
        if (classOnSpan === '') expect(spans[spanIndex].classes()).not.toContainEqual('bg-green-4');
        else expect(spans[spanIndex].classes()).toContainEqual(classOnSpan);
      });
    },
  );
});
