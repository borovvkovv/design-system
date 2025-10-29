import { describe, expect, test, vi } from 'vitest';
import { VueWrapper, mount } from '@vue/test-utils';
import AppTableCellText from '@comp/components/table/cells/AppTableCellText.vue';
import { mockBoundingClientRect } from '@comp/components/__tests__/utils';
import BaseFlexibleMenu from '@comp/components/flexible-menu/BaseFlexibleMenu.vue';
import { mockResizeObserver } from '@comp/components/__tests__/utils/mockedResizeObserver';

const setFlexibleMenuParams = ({
  wrapper,
  menuItems,
}: {
  wrapper: VueWrapper<any>;
  menuItems: string[];
}): {
  menuContainer: HTMLElement;
} => {
  const menuContainer = wrapper.getComponent(BaseFlexibleMenu).vm.$refs['menuContainer'] as HTMLElement;
  const rightBoundary = wrapper.getComponent(BaseFlexibleMenu).vm.$refs['rightBoundaryRef'] as HTMLElement;
  vi.spyOn(menuContainer, 'getBoundingClientRect').mockImplementation(() => mockBoundingClientRect({ width: 20 }));
  vi.spyOn(rightBoundary, 'getBoundingClientRect').mockImplementation(() => mockBoundingClientRect({ width: 0 }));

  menuItems.forEach((charOrString, charIndex) => {
    const charOrStringWidth = charOrString.split('').length * 2;
    const visibleItemElement = wrapper.getComponent(BaseFlexibleMenu).vm.getVisibleMenuItems()[
      charIndex
    ] as HTMLElement;
    vi.spyOn(visibleItemElement, 'getBoundingClientRect').mockImplementation(() =>
      mockBoundingClientRect({ width: charOrStringWidth }),
    );
    visibleItemElement.style.marginLeft = '0';
    visibleItemElement.style.marginRight = '0';
  });

  return {
    menuContainer,
  };
};

const cellText = 'Текст длинной в 50 символов по два пикселя каждый.';
const cellTextList = 'Текст длинной в 50 символов по два пикселя каждый.'.split('');
const cellTextWithOverflowWithSearch = 'Текст длинной в 50 с';
const cellTextWithOverflowWithSearchList = 'Текст длинной в 50 с'.split('');

const getAppTableCellText = (props?: Partial<InstanceType<typeof AppTableCellText>['$props']>) =>
  mount(AppTableCellText, {
    props: {
      cell: {
        type: 'text',
        text: cellText,
        pattern: '',
        maxLines: 2,
      },
      ...props,
    },
    global: {
      directives: {
        twMerge: {},
      },
    },
  });

describe('Компонент AppTableCellText', () => {
  test.each`
    pattern           | spansText                                                                 | classOnSpans
    ${undefined}      | ${[cellText]}                                                             | ${['']}
    ${''}             | ${[cellText]}                                                             | ${['']}
    ${'Е'}            | ${['Т', 'е', 'кст длинной в 50 символов по два пикс', 'е', 'ля каждый.']} | ${['', 'text-blue-2', '', 'text-blue-2', '']}
    ${'е'}            | ${['Т', 'е', 'кст длинной в 50 символов по два пикс', 'е', 'ля каждый.']} | ${['', 'text-blue-2', '', 'text-blue-2', '']}
    ${'кст '}         | ${['Те', 'кст ', 'длинной в 50 символов по два пикселя каждый.']}         | ${['', 'text-blue-2', '']}
    ${'пикселя'}      | ${['Текст длинной в 50 символов по два ', 'пикселя', ' каждый.']}         | ${['', 'text-blue-2', '']}
    ${cellText}       | ${[cellText]}                                                             | ${['text-blue-2']}
    ${`${cellText} `} | ${['Текст длинной в 50 символов по два пикселя каждый.']}                 | ${['']}
    ${` ${cellText}`} | ${['Текст длинной в 50 символов по два пикселя каждый.']}                 | ${['']}
    ${'abc'}          | ${['Текст длинной в 50 символов по два пикселя каждый.']}                 | ${['']}
  `(
    'No overflow, pattern=$pattern, spansText=$spansText, classOnSpans=$classOnSpans',
    async ({ pattern, spansText, classOnSpans }) => {
      const wrapper = getAppTableCellText({ cell: { type: 'text', text: cellText, maxLines: undefined, pattern } });

      const spans = wrapper.findAll('span');

      expect(spans).toHaveLength(spansText.length);

      spans.forEach((span, spanIndex) => {
        expect(span.element.textContent).toBe(spansText[spanIndex]);
      });

      classOnSpans.forEach((classOnSpan: string, spanIndex: number) => {
        if (classOnSpan === '') expect(spans[spanIndex].classes()).not.toContainEqual('text-blue-2');
        else expect(spans[spanIndex].classes()).toContainEqual(classOnSpan);
      });
    },
  );

  test.each`
    pattern                           | spansFullText   | spansOverflowText                     | classOnSpans
    ${undefined}                      | ${[cellText]}   | ${['']}                               | ${['']}
    ${''}                             | ${cellTextList} | ${cellTextWithOverflowWithSearchList} | ${['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']}
    ${'Е'}                            | ${cellTextList} | ${cellTextWithOverflowWithSearchList} | ${['', 'text-blue-2', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']}
    ${'е'}                            | ${cellTextList} | ${cellTextWithOverflowWithSearchList} | ${['', 'text-blue-2', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']}
    ${'кст '}                         | ${cellTextList} | ${cellTextWithOverflowWithSearchList} | ${['', '', 'text-blue-2', 'text-blue-2', 'text-blue-2', 'text-blue-2', '', '', '', '', '', '', '', '', '', '', '', '', '', '']}
    ${'пикселя'}                      | ${cellTextList} | ${cellTextWithOverflowWithSearchList} | ${['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']}
    ${cellTextWithOverflowWithSearch} | ${cellTextList} | ${cellTextWithOverflowWithSearchList} | ${['text-blue-2', 'text-blue-2', 'text-blue-2', 'text-blue-2', 'text-blue-2', 'text-blue-2', 'text-blue-2', 'text-blue-2', 'text-blue-2', 'text-blue-2', 'text-blue-2', 'text-blue-2', 'text-blue-2', 'text-blue-2', 'text-blue-2', 'text-blue-2', 'text-blue-2', 'text-blue-2', 'text-blue-2', 'text-blue-2']}
    ${`${cellText} `}                 | ${cellTextList} | ${cellTextWithOverflowWithSearchList} | ${['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']}
    ${` ${cellText}`}                 | ${cellTextList} | ${cellTextWithOverflowWithSearchList} | ${['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']}
    ${'abc'}                          | ${cellTextList} | ${cellTextWithOverflowWithSearchList} | ${['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']}
  `(
    'With overflow, pattern=$pattern, spansOverflowText=$spansOverflowText, classOnSpans=$classOnSpans',
    async ({ pattern, spansFullText, spansOverflowText, classOnSpans }) => {
      vi.useFakeTimers();
      const resizeObserver = mockResizeObserver();
      const wrapper = getAppTableCellText({ cell: { type: 'text', text: cellText, maxLines: 2, pattern } });

      const { menuContainer } = setFlexibleMenuParams({ wrapper, menuItems: spansFullText });
      resizeObserver.resize(menuContainer);
      vi.advanceTimersByTime(100);
      await vi.runAllTimersAsync();
      vi.runAllTicks();

      const spans = wrapper.findAll('span');

      expect(spans).toHaveLength(spansOverflowText.length);

      spans.forEach((span, spanIndex) => {
        expect(span.element.textContent).toBe(spansOverflowText[spanIndex]);
      });

      classOnSpans.forEach((classOnSpan: string, spanIndex: number) => {
        if (classOnSpan === '') expect(spans[spanIndex].classes()).not.toContainEqual('text-blue-2');
        else expect(spans[spanIndex].classes()).toContainEqual(classOnSpan);
      });
    },
  );
});
