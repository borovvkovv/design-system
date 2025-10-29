import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import { Format } from '@comp/enums/format';
import DocumentList from '@comp/components/documents/DocumentList.vue';
import FilesSkeleton from '@comp/components/skeletons/FilesSkeleton.vue';

const getDocumentList = (props?: Partial<InstanceType<typeof DocumentList>['$props']>) =>
  mount(DocumentList, {
    props: {
      documentList: [
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
      height: 40,
      isLoading: false,
      loadingConfig: undefined,
      format: Format.Normal,
      ...props,
    },
    global: {
      directives: {
        twMerge: {},
      },
    },
  });

describe('Компонент DocumentList', () => {
  test('Компонент не отрисовывается при загрузке файлов', () => {
    const wrapper = getDocumentList({ isLoading: true });

    expect(wrapper.findComponent(FilesSkeleton).exists()).toBeTruthy();
  });

  test('Если файлы не загрузились, то отрисовывается заглушка', () => {
    const wrapper = getDocumentList({
      documentList: [],
    });

    expect(wrapper.text()).toContain('Нет документов за выбранный период.');
    expect(wrapper.text()).toContain('Выберите другой период для просмотра или другой вид документа.');
  });

  test('Отрисовываются файлы после их загрузки', () => {
    const wrapper = getDocumentList();

    expect(wrapper.text()).toContain('firstDocumentName.doc');
    expect(wrapper.text()).toContain('secondDocumentName');
  });
});
