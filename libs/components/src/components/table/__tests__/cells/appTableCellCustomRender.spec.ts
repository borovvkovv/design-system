import { h } from 'vue';
import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import AppTableCellCustomRender from '@comp/components/table/cells/AppTableCellCustomRender.vue';

const getAppTableCellCustomRender = () =>
  mount(AppTableCellCustomRender, {
    props: {
      cell: {
        type: 'render',
        nodeRender: h('div', { id: 'testId' }),
      },
    },
  });

describe('Компонент AppTableCellCustomRender', () => {
  test('Отрисовывает компонент, переданный через проп', async () => {
    const wrapper = getAppTableCellCustomRender();

    expect(wrapper.find('#testId').exists()).toBeTruthy();
  });
});
