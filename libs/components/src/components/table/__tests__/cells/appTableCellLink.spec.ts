import { beforeEach, describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import AppLink from '@comp/components/app-link/AppLink.vue';
import AppTableCellLink from '@comp/components/table/cells/AppTableCellLink.vue';

const onLinkClickHandler = vi.fn();

const getAppTableCellLink = (props?: Partial<InstanceType<typeof AppTableCellLink>['$props']['cell']>) =>
  mount(AppTableCellLink, {
    props: {
      cell: {
        type: 'link',
        title: 'TestTitle',
        href: 'http://testHref',
        isDisabled: false,
        click: onLinkClickHandler,
        ...props,
      },
    },
  });

describe('Компонент AppTableCellLink', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Отрисовывает элемент-ссылку', () => {
    const wrapper = getAppTableCellLink();

    expect(wrapper.findComponent(AppLink).vm.to).toStrictEqual('http://testHref');
    expect(wrapper.findComponent(AppLink).text()).toBe('TestTitle');
  });

  test('При нажатии на элемент-ссылку вызывается функция, переданная через проп', async () => {
    const wrapper = getAppTableCellLink();

    expect(onLinkClickHandler).toHaveBeenCalledTimes(0);

    await wrapper.findComponent(AppLink).trigger('click');

    expect(onLinkClickHandler).toHaveBeenCalledTimes(1);
  });

  test('Если проп isDisabled=true, то при нажатии на элемент-ссылку функция не вызывается', async () => {
    const wrapper = getAppTableCellLink({ isDisabled: true });

    expect(onLinkClickHandler).toHaveBeenCalledTimes(0);

    await wrapper.findComponent(AppLink).trigger('click');

    expect(onLinkClickHandler).toHaveBeenCalledTimes(0);
  });
});
