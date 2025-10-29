import { beforeEach, describe, expect, test, vitest } from 'vitest';
import { mount } from '@vue/test-utils';
import AttachmentBase from '@comp/components/attachments/AttachmentBase.vue';
import IconTextButton from '@comp/components/buttons/IconTextButton.vue';
import AttachmentFileList from '@comp/components/attachments/AttachmentFileList.vue';
import IconDragAndDrop from '@comp/components/icons/IconDragAndDrop.vue';

const getAttachmentBase = (props: Pick<InstanceType<typeof AttachmentBase>, '$props'>['$props']) =>
  mount(AttachmentBase, {
    props,
    global: {
      directives: {
        twMerge: {},
      },
    },
    attachTo: document.body,
  });

describe('Компонент AttachmentBase', () => {
  beforeEach(() => {
    vitest.stubGlobal('URL', { createObjectURL: () => 'http://localhost/test-resource' });
  });

  test('Компонент не отрисовывается, если компонент не активен и массив файлов пуст', () => {
    const wrapper = mount(AttachmentBase, {
      props: {
        modelValue: [],
        isDisabled: true,
      },
    });

    expect(wrapper.isVisible()).toBeFalsy();
  });

  test('Компонент отрисовывает список файлов, но не отрисовывает кнопку для загрузки файлов, если компонент не активен и массив файлов не пуст', () => {
    const wrapper = getAttachmentBase({
      modelValue: [new File(['blob'], 'test.pdf', { type: 'pdf' })],
      isDisabled: true,
    });

    expect(wrapper.isVisible()).toBeTruthy();
    expect(wrapper.findComponent(IconTextButton).exists()).toBeFalsy();
    expect(wrapper.findComponent(AttachmentFileList).exists()).toBeTruthy();
  });

  test('Кнопка для загрузки файла не отображается, если длина массива файлов >= 6', async () => {
    const wrapper = getAttachmentBase({
      modelValue: [
        new File(['blob'], 'test.pdf', { type: 'pdf' }),
        new File(['blob'], 'test.pdf', { type: 'pdf' }),
        new File(['blob'], 'test.pdf', { type: 'pdf' }),
        new File(['blob'], 'test.pdf', { type: 'pdf' }),
        new File(['blob'], 'test.pdf', { type: 'pdf' }),
        new File(['blob'], 'test.pdf', { type: 'pdf' }),
      ],
      isDisabled: false,
    });

    expect(wrapper.findComponent(IconTextButton).exists()).toBeFalsy();

    await wrapper.setProps({
      modelValue: [new File(['blob'], 'test.pdf', { type: 'pdf' })],
    });

    expect(wrapper.findComponent(IconTextButton).exists()).toBeTruthy();
  });

  test('При наведении курсором мыши на компонент, отображается текст "Перетащите файлы сюда"', async () => {
    const wrapper = getAttachmentBase({
      modelValue: [],
      isDisabled: false,
    });

    expect(wrapper.find('[name="hoverText"]').text()).toBe('');

    await wrapper.trigger('mouseenter');

    expect(wrapper.find('[name="hoverText"]').text()).toBe('Перетащите файлы сюда');

    await wrapper.trigger('mouseleave');

    expect(wrapper.find('[name="hoverText"]').text()).toBe('');
  });

  test('При загрузке некорректного файла, подсвечиваются ошибки"', async () => {
    const wrapper = getAttachmentBase({
      modelValue: [],
      isDisabled: false,
    });

    const fileInputElement = wrapper.find('#file-input').element as HTMLInputElement;
    Object.defineProperty(fileInputElement, 'files', {
      value: [new File(['blob'], 'test.err')],
      writable: false,
    });

    const incorrectExtension = wrapper.findAll('[name="errors"] span')[0];
    const tooBigFile = wrapper.findAll('[name="errors"] span')[1];

    expect(incorrectExtension.classes()).toContain('text-grey-2');
    expect(tooBigFile.classes()).toContain('text-grey-2');

    await wrapper.find('#file-input').trigger('change');

    expect(incorrectExtension.classes()).toContain('text-red-3');
    expect(tooBigFile.classes()).toContain('text-grey-2');
  });

  test('При наведении курсором мыши на компонент через интерфейс drag and drop, отображается иконка и текст "Перетащите файлы сюда"', async () => {
    const wrapper = getAttachmentBase({
      modelValue: [],
      isDisabled: false,
    });

    expect(wrapper.findComponent(IconDragAndDrop).isVisible()).toBeFalsy();

    await wrapper.trigger('dragenter');

    expect(wrapper.findComponent(IconDragAndDrop).isVisible()).toBeTruthy();

    await wrapper.find('[data-section-drag]').trigger('dragover');

    expect(wrapper.findComponent(IconDragAndDrop).isVisible()).toBeTruthy();

    await wrapper.find('[data-section-drag]').trigger('dragleave');

    expect(wrapper.findComponent(IconDragAndDrop).isVisible()).toBeFalsy();
  });

  test('При загрузке некорректного файла через интерфейс drag and drop, подсвечиваются ошибки"', async () => {
    const wrapper = getAttachmentBase({
      modelValue: [],
      isDisabled: false,
    });

    await wrapper
      .find('[data-section-drag]')
      .trigger('drop', { dataTransfer: { files: [new File(['blob'], 'test.err')] } });

    const incorrectExtension = wrapper.findAll('[name="errors"] span')[0];
    const tooBigFile = wrapper.findAll('[name="errors"] span')[1];

    expect(incorrectExtension.classes()).toContain('text-red-3');
    expect(tooBigFile.classes()).toContain('text-grey-2');

    await wrapper
      .find('[data-section-drag]')
      .trigger('drop', { dataTransfer: { files: [new File(['blob'], 'test.pdf')] } });

    expect(incorrectExtension.classes()).toContain('text-grey-2');
    expect(tooBigFile.classes()).toContain('text-grey-2');
  });
});
