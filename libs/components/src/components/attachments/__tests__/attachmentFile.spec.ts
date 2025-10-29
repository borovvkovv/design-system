import { beforeEach, describe, expect, test, vitest } from 'vitest';
import { mount } from '@vue/test-utils';
import { Size } from '@comp/enums';
import AttachmentFile from '@comp/components/attachments/AttachmentFile.vue';
import IconWasteBin from '@comp/components/icons/IconWasteBin.vue';
import AppLink from '@comp/components/app-link/AppLink.vue';

describe('Компонент AttachmentFile', () => {
  beforeEach(() => {
    vitest.stubGlobal('URL', { createObjectURL: () => 'http://localhost/test-resource' });
  });

  test('Отображается имя, расширение файла, его объем и кнопка удаления', () => {
    const wrapper = mount(AttachmentFile, {
      props: {
        file: new File(['aaaa'], 'test.pdf'),
        isDisabled: false,
        size: Size.S,
      },
    });

    expect(wrapper.text()).toContain('PDF');
    expect(wrapper.text()).toContain('test');
    expect(wrapper.text()).not.toContain('test.pdf');
    expect(wrapper.text()).toContain('4Б');
    expect(wrapper.findComponent(AppLink).exists()).toBeTruthy();
    expect(wrapper.findComponent(AppLink).props().to).toBe('http://localhost/test-resource');
    expect(wrapper.findComponent(AppLink).props().isDownloadFile).toBeTruthy();
    expect(wrapper.findComponent(AppLink).props().downloadFileName).toBe('test.pdf');
  });

  test('Кнопка удаления не отображается, если компонент не активен', () => {
    const wrapper = mount(AttachmentFile, {
      props: {
        file: new File(['aaaa'], 'test.pdf'),
        isDisabled: true,
        size: Size.S,
      },
    });

    expect(wrapper.findComponent(IconWasteBin).exists()).toBeFalsy();
  });

  test('При нажатии на кнопку удаления вызывается эмит', async () => {
    const file = new File(['aaaa'], 'test.pdf');
    const wrapper = mount(AttachmentFile, {
      props: {
        file,
        isDisabled: false,
        size: Size.S,
      },
    });

    await wrapper.findComponent(IconWasteBin).trigger('click');

    expect(wrapper.emitted('onDeleteFile')).toHaveLength(1);
    expect(wrapper.emitted('onDeleteFile')?.[0][0]).toStrictEqual(file);
  });

  test('При размере M, отображается имя файла с расширением и не отображается кнопка удаления', async () => {
    const wrapper = mount(AttachmentFile, {
      props: {
        file: new File(['aaaa'], 'test.pdf'),
        isDisabled: false,
        size: Size.M,
      },
    });

    expect(wrapper.text()).not.toContain('PDF');
    expect(wrapper.text()).toContain('test.pdf');
    expect(wrapper.text()).toContain('4Б');
    expect(wrapper.findComponent(IconWasteBin).exists()).toBeFalsy();
  });

  test('При размере M, компонент содержит слот previewImage', () => {
    const wrapper = mount(AttachmentFile, {
      props: {
        file: new File(['aaaa'], 'test.pdf'),
        isDisabled: false,
        size: Size.M,
      },
      slots: {
        previewImage: '<div id="previewImageSlot"></div>',
      },
    });

    expect(wrapper.find('#previewImageSlot').exists()).toBeTruthy();
  });
});
