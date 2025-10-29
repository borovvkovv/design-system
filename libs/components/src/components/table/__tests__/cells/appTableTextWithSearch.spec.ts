import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import AppTableTextWithSearch from '@comp/components/table/cells/AppTableTextWithSearch.vue';

const getAppTableTextWithSearch = (props?: Partial<InstanceType<typeof AppTableTextWithSearch>['$props']>) =>
  mount(AppTableTextWithSearch, {
    props: {
      text: 'Abc Abc',
      pattern: '',
      splitToChars: false,
      ...props,
    },
  });

describe('Компонент AppTableTextWithSearch', () => {
  test.each`
    splitToChars | pattern        | spansText                              | classOnSpans
    ${false}     | ${undefined}   | ${['Abc Abc']}                         | ${['']}
    ${false}     | ${''}          | ${['Abc Abc']}                         | ${['']}
    ${false}     | ${'A'}         | ${['A', 'bc ', 'A', 'bc']}             | ${['text-blue-2', '', 'text-blue-2', '']}
    ${false}     | ${'a'}         | ${['A', 'bc', 'A', 'bc']}              | ${['text-blue-2', '', 'text-blue-2', '']}
    ${false}     | ${'Abc'}       | ${['Abc', ' ', 'Abc']}                 | ${['text-blue-2', '', 'text-blue-2']}
    ${false}     | ${'abc'}       | ${['Abc', ' ', 'Abc']}                 | ${['text-blue-2', '', 'text-blue-2']}
    ${false}     | ${'bc'}        | ${['A', 'bc', ' A', 'bc']}             | ${['', 'text-blue-2', '', 'text-blue-2']}
    ${false}     | ${'c'}         | ${['Ab', 'c', ' Ab', 'c']}             | ${['', 'text-blue-2', '', 'text-blue-2']}
    ${false}     | ${' '}         | ${['Abc', ' ', 'Abc']}                 | ${['', 'text-blue-2', '']}
    ${false}     | ${' Abc'}      | ${['Abc', ' Abc']}                     | ${['', 'text-blue-2']}
    ${false}     | ${'Abc '}      | ${['Abc ', 'Abc']}                     | ${['text-blue-2', '']}
    ${false}     | ${'Abc Abc'}   | ${['Abc Abc']}                         | ${['text-blue-2']}
    ${false}     | ${'Abc Abc '}  | ${['Abc Abc']}                         | ${['']}
    ${false}     | ${' Abc Abc'}  | ${['Abc Abc']}                         | ${['']}
    ${false}     | ${'Different'} | ${['Abc Abc']}                         | ${['']}
    ${true}      | ${undefined}   | ${['Abc Abc']}                         | ${['']}
    ${true}      | ${''}          | ${['A', 'b', 'c', ' ', 'A', 'b', 'c']} | ${['', '', '', '', '', '', '']}
    ${true}      | ${'A'}         | ${['A', 'b', 'c', ' ', 'A', 'b', 'c']} | ${['text-blue-2', '', '', '', 'text-blue-2', '', '']}
    ${true}      | ${'a'}         | ${['A', 'b', 'c', ' ', 'A', 'b', 'c']} | ${['text-blue-2', '', '', '', 'text-blue-2', '', '']}
    ${true}      | ${'Abc'}       | ${['A', 'b', 'c', ' ', 'A', 'b', 'c']} | ${['text-blue-2', 'text-blue-2', 'text-blue-2', '', 'text-blue-2', 'text-blue-2', 'text-blue-2']}
    ${true}      | ${'abc'}       | ${['A', 'b', 'c', ' ', 'A', 'b', 'c']} | ${['text-blue-2', 'text-blue-2', 'text-blue-2', '', 'text-blue-2', 'text-blue-2', 'text-blue-2']}
    ${true}      | ${'bc'}        | ${['A', 'b', 'c', ' ', 'A', 'b', 'c']} | ${['', 'text-blue-2', 'text-blue-2', '', '', 'text-blue-2', 'text-blue-2']}
    ${true}      | ${'c'}         | ${['A', 'b', 'c', ' ', 'A', 'b', 'c']} | ${['', '', 'text-blue-2', '', '', '', 'text-blue-2']}
    ${true}      | ${' '}         | ${['A', 'b', 'c', ' ', 'A', 'b', 'c']} | ${['', '', '', 'text-blue-2', '', '', '']}
    ${true}      | ${' Abc'}      | ${['A', 'b', 'c', ' ', 'A', 'b', 'c']} | ${['', '', '', 'text-blue-2', 'text-blue-2', 'text-blue-2', 'text-blue-2']}
    ${true}      | ${'Abc '}      | ${['A', 'b', 'c', ' ', 'A', 'b', 'c']} | ${['text-blue-2', 'text-blue-2', 'text-blue-2', 'text-blue-2', '', '', '']}
    ${true}      | ${'Abc Abc'}   | ${['A', 'b', 'c', ' ', 'A', 'b', 'c']} | ${['text-blue-2', 'text-blue-2', 'text-blue-2', 'text-blue-2', 'text-blue-2', 'text-blue-2', 'text-blue-2']}
    ${true}      | ${'Abc Abc '}  | ${['A', 'b', 'c', ' ', 'A', 'b', 'c']} | ${['', '', '', '', '', '', '']}
    ${true}      | ${' Abc Abc'}  | ${['A', 'b', 'c', ' ', 'A', 'b', 'c']} | ${['', '', '', '', '', '', '']}
    ${true}      | ${'Different'} | ${['A', 'b', 'c', ' ', 'A', 'b', 'c']} | ${['', '', '', '', '', '', '']}
  `(
    'splitToChars=$splitToChars, pattern=$pattern, spansText=$spansText, classOnSpans=$classOnSpans',
    async ({ splitToChars, pattern, spansText, classOnSpans }) => {
      const wrapper = getAppTableTextWithSearch({ splitToChars, pattern });
      const spans = wrapper.findAll('span');

      expect(spans).toHaveLength(spansText.length);

      classOnSpans.forEach((classOnSpan: string, spanIndex: number) => {
        if (classOnSpan === '') expect(spans[spanIndex].classes()).not.toContainEqual('text-blue-2');
        else expect(spans[spanIndex].classes()).toContainEqual(classOnSpan);
      });
    },
  );
});
