import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import DocumentFileList from '@comp/components/documents/DocumentFileList.vue';

const getDocumentFileList = (props?: Partial<InstanceType<typeof DocumentFileList>['$props']>) =>
  mount(DocumentFileList, {
    props: {
      documents: [
        {
          name: 'firstDocumentName.doc',
          url: 'testUrl1',
          size: 25,
        },
        {
          name: 'secondDocumentName',
          url: 'testUrl2',
          size: null,
        },
      ],
      ...props,
    },
  });

describe('Компонент DocumentFileList', () => {
  test('Компонент не отрисовывается, если нет файлов', () => {
    const wrapper = getDocumentFileList({
      documents: [],
    });

    expect(wrapper.text()).toBe('');
  });

  test('Отрисовываются имена файлов', () => {
    const wrapper = getDocumentFileList();

    expect(wrapper.text()).toContain('firstDocumentName.doc');
    expect(wrapper.text()).toContain('secondDocumentName');
  });

  test('Отрисовываются размеры файлов в байтах, если размер файла есть', () => {
    const wrapper = getDocumentFileList();

    expect(wrapper.text()).toContain('25');
  });

  test('Отрисовываются расширения файлов, либо пустой текст, если расширения нет', () => {
    const wrapper = getDocumentFileList();

    expect(wrapper.text()).toContain('DOC');
  });

  test('Отрисовываются ссылки на файлы', () => {
    const wrapper = getDocumentFileList();

    expect(wrapper.find('[href="testUrl1"]').exists()).toBeTruthy();
    expect(wrapper.find('[href="testUrl2"]').exists()).toBeTruthy();
  });
});
