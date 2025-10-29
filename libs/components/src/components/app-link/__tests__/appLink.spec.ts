import { describe, expect, test } from 'vitest';
import { RouterLink } from 'vue-router';
import { mount } from '@vue/test-utils';
import AppLink from '@comp/components/app-link/AppLink.vue';
import { LinksStyles } from '@comp/components/app-link/utils/models';

const getAppLink = (props?: Pick<InstanceType<typeof AppLink>, '$props'>['$props'], isShallowMount?: boolean) =>
  mount(AppLink, {
    props: {
      ...props,
    },
    slots: {
      default: '<div>Test text</div>',
    },
    shallow: isShallowMount,
  });

describe('Компонент AppLink', () => {
  test('Компонент отрисовывает кнопку, если проп "to" не задан', () => {
    const wrapper = getAppLink();

    expect(wrapper.find('button').exists()).toBeTruthy();
    expect(wrapper.find('button').text()).toBe('Test text');
    expect(wrapper.find('button').element.type).toBe('button');
  });

  test('Компонент отрисовывает ссылку, если проп "to" является ссылкой на внешний ресурс', () => {
    const wrapper = getAppLink({
      to: 'http://test',
    });

    expect(wrapper.find('a').exists()).toBeTruthy();
    expect(wrapper.find('a').text()).toBe('Test text');
    expect(wrapper.find('a').element.target).toBe('_blank');
    expect(wrapper.find('a').element.href).toBe('http://test/');
  });

  test(`Компонент отрисовывает ссылку на загрузку ресурса, если пропс "to" является ссылкой на ресурс, и,
  либо задан проп "downloadFileName" - имя загружаемого ресурса,
  либо задан проп "isDownloadFile" - если нет возможности указать имя загружаемого ресурса`, async () => {
    const wrapper = getAppLink({
      to: 'http://test',
      downloadFileName: 'testFileName.pdf',
    });

    expect(wrapper.find('a').exists()).toBeTruthy();
    expect(wrapper.find('a').element.target).toBe('_blank');
    expect(wrapper.find('a').element.download).toBe('testFileName.pdf');
    expect(wrapper.find('a').element.href).toBe('http://test/');

    await wrapper.setProps({
      downloadFileName: undefined,
      isDownloadFile: true,
    });

    expect(wrapper.find('a').exists()).toBeTruthy();
    expect(wrapper.find('a').element.target).toBe('_blank');
    expect(wrapper.find('a').element.download).toBe('');
    expect(wrapper.find('a').element.href).toBe('http://test/');
  });

  test('Компонент отрисовывает RouterLink, если проп "to" является ссылкой на внутреннюю страницу', () => {
    const wrapper = getAppLink(
      {
        to: { name: 'test' },
      },
      true,
    );

    expect(wrapper.findComponent(RouterLink).exists()).toBeTruthy();
    expect(wrapper.findComponent(RouterLink).props().to).toStrictEqual({ name: 'test' });
  });

  test('Если ссылка ведет на текущую страницу, то компонент отрисовывается с соответствующим классом стилей', async () => {
    const wrapper = getAppLink({
      isActive: true,
      linkStyle: LinksStyles.Style3,
    });

    expect(wrapper.find('button').classes()).toContain('link_Style3__active');

    await wrapper.setProps({
      isActive: false,
    });

    expect(wrapper.find('button').classes()).not.toContain('link_Style3__active');
  });

  test('Если ссылка не активная, то компонент отрисовывается с соответствующим классом стилей', async () => {
    const wrapper = getAppLink({
      isDisabled: true,
      linkStyle: LinksStyles.Style3,
    });

    expect(wrapper.find('button').classes()).toContain('link_Style3__disabled');

    await wrapper.setProps({
      isDisabled: false,
    });

    expect(wrapper.find('button').classes()).not.toContain('link_Style3__disabled');
  });
});
