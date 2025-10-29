import { beforeEach, describe, expect, test, vitest } from 'vitest';
import { mount } from '@vue/test-utils';
import { Size } from '@comp/enums';
import AttachmentFile from '@comp/components/attachments/AttachmentFile.vue';
import AttachmentFileList from '@comp/components/attachments/AttachmentFileList.vue';

const getAttachmentFileList = (props: Pick<InstanceType<typeof AttachmentFileList>, '$props'>['$props']) => {
  const wrapper = mount(AttachmentFileList, {
    props: {
      'onUpdate:modelValue': (e) => {
        wrapper.setProps({ modelValue: e });
      },
      ...props,
    },
    global: {
      directives: {
        twMerge: {},
      },
    },
    attachTo: document.body,
  });

  return wrapper;
};

describe('Компонент AttachmentFileList', () => {
  beforeEach(() => {
    vitest.stubGlobal('URL', { createObjectURL: () => 'http://localhost/test-resource' });
  });

  test('Список файлов не отображается, если передан пустой массив', () => {
    const wrapper = getAttachmentFileList({
      modelValue: [],
      isDisabled: false,
      size: Size.S,
    });

    expect(wrapper.findAllComponents(AttachmentFile)).toHaveLength(0);
  });

  test('Если передан массив файлов с более чем тремя элементами, то отображаются только первые три файла', () => {
    const wrapper = getAttachmentFileList({
      modelValue: [
        new File(['blob'], 'test.pdf'),
        new File(['blob'], 'test.pdf'),
        new File(['blob'], 'test.pdf'),
        new File(['blob'], 'test.pdf'),
      ],
      isDisabled: false,
      size: Size.S,
    });

    expect(wrapper.findAllComponents(AttachmentFile)).toHaveLength(3);
  });

  test('Если передан массив файлов с более чем тремя элементами и нажата кнопка "Показать все", то отображаются все файлы', async () => {
    const wrapper = getAttachmentFileList({
      modelValue: [
        new File(['blob'], 'test.pdf'),
        new File(['blob'], 'test.pdf'),
        new File(['blob'], 'test.pdf'),
        new File(['blob'], 'test.pdf'),
        new File(['blob'], 'test.pdf'),
        new File(['blob'], 'test.pdf'),
      ],
      isDisabled: false,
      size: Size.S,
    });

    expect(wrapper.findAllComponents(AttachmentFile)).toHaveLength(3);

    await wrapper.find('[data-show-all-files]').trigger('click');

    expect(wrapper.findAllComponents(AttachmentFile)).toHaveLength(6);

    await wrapper.find('[data-wrap-files]').trigger('click');

    expect(wrapper.findAllComponents(AttachmentFile)).toHaveLength(3);
  });

  test('Если передан массив файлов с менее чем четырьмя элементами, то кнопка "Показать все" не отображается', () => {
    const wrapper = getAttachmentFileList({
      modelValue: [new File(['blob'], 'test.pdf'), new File(['blob'], 'test.pdf')],
      isDisabled: false,
      size: Size.S,
    });

    expect(wrapper.find('[data-show-all-files]').exists()).toBeFalsy();
  });

  test('При удалении файла, список перерисовывается', async () => {
    const fileForDelete = new File(['blob'], 'deleteIt.pdf');
    const wrapper = getAttachmentFileList({
      modelValue: [fileForDelete, new File(['blob'], 'test.pdf')],
      isDisabled: false,
      size: Size.S,
    });

    expect(wrapper.findAllComponents(AttachmentFile)).toHaveLength(2);

    await wrapper.getComponent(AttachmentFile).vm.$emit('onDeleteFile', fileForDelete);

    expect(wrapper.emitted('update:modelValue')?.[0][0]).toStrictEqual([fileForDelete]);
    expect(wrapper.findAllComponents(AttachmentFile)).toHaveLength(1);
  });

  test('При удалении четвертого файла свернутого списка, скрывается кнопка Показать все', async () => {
    const fileForDelete = new File(['blob'], 'deleteIt.pdf');
    const wrapper = getAttachmentFileList({
      modelValue: [
        fileForDelete,
        new File(['blob'], 'test.pdf'),
        new File(['blob'], 'test.pdf'),
        new File(['blob'], 'test.pdf'),
      ],
      isDisabled: false,
      size: Size.S,
    });

    expect(wrapper.find('[data-show-all-files]').exists()).toBeTruthy();

    await wrapper.getComponent(AttachmentFile).vm.$emit('onDeleteFile', fileForDelete);

    expect(wrapper.find('[data-show-all-files]').exists()).toBeFalsy();
  });

  test('При удалении четвертого файла раскрытого списка, скрывается кнопка Свернуть', async () => {
    const fileForDelete = new File(['blob'], 'deleteIt.pdf');
    const wrapper = getAttachmentFileList({
      modelValue: [
        fileForDelete,
        new File(['blob'], 'test.pdf'),
        new File(['blob'], 'test.pdf'),
        new File(['blob'], 'test.pdf'),
      ],
      isDisabled: false,
      size: Size.S,
    });

    await wrapper.find('[data-show-all-files]').trigger('click');

    expect(wrapper.find('[data-wrap-files]').exists()).toBeTruthy();

    await wrapper.getComponent(AttachmentFile).vm.$emit('onDeleteFile', fileForDelete);

    expect(wrapper.find('[data-wrap-files]').exists()).toBeFalsy();
  });

  test('При добавлении четвертого файла, отрисовывается кнопка Показать все', async () => {
    const wrapper = getAttachmentFileList({
      modelValue: [new File(['blob'], 'test.pdf'), new File(['blob'], 'test.pdf'), new File(['blob'], 'test.pdf')],
      isDisabled: false,
      size: Size.S,
    });

    expect(wrapper.find('[data-show-all-files]').exists()).toBeFalsy();

    await wrapper.setProps({
      modelValue: [
        new File(['blob'], 'test.pdf'),
        new File(['blob'], 'test.pdf'),
        new File(['blob'], 'test.pdf'),
        new File(['blob'], 'test.pdf'),
      ],
    });

    expect(wrapper.find('[data-show-all-files]').exists()).toBeTruthy();
  });
});
