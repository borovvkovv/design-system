import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { Size } from '@comp/enums';
import { IconName } from '@comp/components/icons/utils/models';
import { InputType } from '@comp/components/inputs/utils/models';
import BaseInput from '@comp/components/inputs/BaseInput.vue';
import IconMarker from '@comp/components/icons/IconMarker.vue';
import IconArrowLeft from '@comp/components/icons/IconArrowLeft.vue';
import BaseInputIcon from '@comp/components/inputs/BaseInputIcon.vue';
import IconArrowRight from '@comp/components/icons/IconArrowRight.vue';

const getBaseInput = (props?: Partial<InstanceType<typeof BaseInput>['$props']>) => {
  const wrapper = mount(BaseInput, {
    props: {
      modelValue: '',
      size: Size.S,
      label: 'Test label',
      disabled: false,
      minWidth: 10,
      isNotPreventDefaultEnter: false,
      required: false,
      placeholder: '',
      isError: false,
      errorList: [],
      isCorrect: true,
      type: InputType.Text,
      iconLeft: IconName.IconArrowLeft,
      iconRight: { iconName: IconName.IconArrowRight },
      iconRightShowMode: 'OnFocus',
      inputClass: [''],
      'onUpdate:modelValue': (newValue) => {
        wrapper.setProps({ modelValue: newValue });
      },
      min: 100,
      max: 200,
      ...props,
    },
    attachTo: document.body,
  });

  return wrapper;
};

describe('Компонент BaseInput', () => {
  test('При фокусе на инпут вызывается эмит focus', async () => {
    const wrapper = getBaseInput();

    expect(wrapper.emitted('focus')).toBeUndefined();

    await wrapper.find('input').trigger('focus');

    expect(wrapper.emitted('focus')).toHaveLength(1);
  });

  test('При удалении из фокуса инпута вызывается эмит blur', async () => {
    const wrapper = getBaseInput();

    expect(wrapper.emitted('blur')).toBeUndefined();

    await wrapper.find('input').trigger('blur');

    expect(wrapper.emitted('blur')).toHaveLength(1);
  });

  test('Если задана правая иконка с колбэком, то при клике на правую иконку вызывается данный колбэк', async () => {
    const wrapper = getBaseInput({
      iconRightShowMode: 'AllTime',
      iconRight: { iconName: IconName.IconArrowRight, onIconClick: vi.fn() },
    });
    await vi.dynamicImportSettled();

    expect(wrapper.props().iconRight?.onIconClick).toHaveBeenCalledTimes(0);

    await wrapper.findAllComponents(BaseInputIcon)[1]?.trigger('click');

    expect(wrapper.props().iconRight?.onIconClick).toHaveBeenCalledTimes(1);
  });

  test('Если задана правая иконка и проп iconRightShowMode=OnFocus, то правая иконка отображается только при фокусе на инпут', async () => {
    const wrapper = getBaseInput();
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(IconArrowRight).isVisible()).toBeFalsy();

    await wrapper.find('input').trigger('focus');

    expect(wrapper.findComponent(IconArrowRight).isVisible()).toBeTruthy();
  });

  test('Если задана правая иконка и проп iconRightShowMode=OnFocus, то правая иконка исчезает при удалении из фокуса инпута', async () => {
    const wrapper = getBaseInput();
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(IconArrowRight).isVisible()).toBeFalsy();

    await wrapper.find('input').trigger('focus');

    expect(wrapper.findComponent(IconArrowRight).isVisible()).toBeTruthy();

    await wrapper.find('input').trigger('blur');

    expect(wrapper.findComponent(IconArrowRight).isVisible()).toBeFalsy();
  });

  test('Если задана правая иконка и проп iconRightShowMode=AllTime, то правая иконка отображается всегда', async () => {
    const wrapper = getBaseInput({ iconRightShowMode: 'AllTime' });
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(IconArrowRight).isVisible()).toBeTruthy();

    await wrapper.find('input').trigger('focus');

    expect(wrapper.findComponent(IconArrowRight).isVisible()).toBeTruthy();

    await wrapper.find('input').trigger('blur');

    expect(wrapper.findComponent(IconArrowRight).isVisible()).toBeTruthy();
  });

  test('Если задана левая иконка, то она отображается всегда', async () => {
    const wrapper = getBaseInput({ iconRightShowMode: 'AllTime' });
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(IconArrowLeft).isVisible()).toBeTruthy();

    await wrapper.find('input').trigger('focus');

    expect(wrapper.findComponent(IconArrowLeft).isVisible()).toBeTruthy();

    await wrapper.find('input').trigger('blur');

    expect(wrapper.findComponent(IconArrowLeft).isVisible()).toBeTruthy();
  });

  test('Если инпут заблокирован, то правая иконка тоже заблокирована', async () => {
    const wrapper = getBaseInput({ disabled: true });

    expect(wrapper.find('input').element.disabled).toBeTruthy();
    expect(wrapper.findAllComponents(BaseInputIcon)[1].vm.disabled).toBeTruthy();
  });

  test('Если задан список ошибок, то он отображается', async () => {
    const wrapper = getBaseInput({ errorList: ['Test error1', 'Test error2', 'Test error3'] });

    expect(wrapper.text()).toContain('Test error1');
    expect(wrapper.text()).toContain('Test error2');
    expect(wrapper.text()).toContain('Test error3');
  });

  test('Если задана подпись через проп, то она отображается', async () => {
    const wrapper = getBaseInput();

    expect(wrapper.text()).toContain('Test label');
  });

  test('Если инпут обязателен к заполнению, то к подписи добавляется красная метка', async () => {
    const wrapper = getBaseInput({ required: true });
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(IconMarker).exists()).toBeTruthy();
  });

  test('После введения текста в инпут выполняется эмит change:modelValue с текстом из инпута', async () => {
    const wrapper = getBaseInput();

    expect(wrapper.emitted('change:modelValue')).toBeUndefined();

    wrapper.find('input').element.value = 'test';
    await wrapper.find('input').trigger('change');

    expect(wrapper.emitted('change:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('change:modelValue')?.[0]).toStrictEqual(['test']);
  });

  test('Если на сфокусированном инпуте нажать Enter, то, при пропе isNotPreventDefaultEnter=false выполняется удаление инпута из фокуса', async () => {
    const wrapper = getBaseInput();
    const input = wrapper.find('input');
    vi.spyOn(input.element, 'blur').mockImplementation(() => vi.fn());

    expect(input.element.blur).toHaveBeenCalledTimes(0);

    await input.trigger('keydown.enter');

    expect(input.element.blur).toHaveBeenCalledTimes(1);

    await wrapper.setProps({ isNotPreventDefaultEnter: true });

    expect(input.element.blur).toHaveBeenCalledTimes(1);

    await input.trigger('keydown.enter');

    expect(input.element.blur).toHaveBeenCalledTimes(1);
  });

  test('При нажатии ЛКМ на любой элемент на инпуте (кроме иконок с колбэком), будет установлен фокус на сам инпут', async () => {
    const wrapper = getBaseInput();
    const input = wrapper.find('input');
    const inputContainer = wrapper.find('[data-test="inputContainer"]');
    vi.spyOn(input.element, 'focus').mockImplementation(() => vi.fn());

    expect(input.element.focus).toHaveBeenCalledTimes(0);

    await inputContainer.trigger('click');

    expect(input.element.focus).toHaveBeenCalledTimes(1);
  });

  test('Если вызова expose-метода focus выполняется фокус на инпут', () => {
    const wrapper = getBaseInput();
    const input = wrapper.find('input');
    vi.spyOn(input.element, 'focus').mockImplementation(() => vi.fn());

    wrapper.vm.focus();

    expect(input.element.focus).toHaveBeenCalledTimes(1);
  });

  test('Expose-свойство inputRef возвращает элемент-инпут', () => {
    const wrapper = getBaseInput();
    const input = wrapper.find('input');

    expect(wrapper.vm.inputRef).toStrictEqual(input.element);
  });

  test('Если задан числовой инпут, то при вводе знака минус после ввода числа, знак минуса пропускается', async () => {
    const wrapper = getBaseInput({ type: InputType.Number });
    const input = wrapper.find('input');

    input.element.value = '123';
    await input.trigger('input', { data: '123' });

    input.element.value = '123-';
    await input.trigger('input', { data: '-' });

    expect(input.element.value).toBe('123');
  });

  test('Если задан числовой инпут и при вводе числа меньше установленного в атрибуте min, то в значение инпута будет значение min', async () => {
    const wrapper = getBaseInput({ type: InputType.Number });
    const input = wrapper.find('input');

    input.element.value = '50';
    await input.trigger('input', { data: '50' });

    expect(input.element.value).toBe('100');
  });

  test('Если задан числовой инпут и при вводе числа больше установленного в атрибуте max, то значение инпута будет значение max', async () => {
    const wrapper = getBaseInput({ type: InputType.Number });
    const input = wrapper.find('input');

    input.element.value = '250';
    await input.trigger('input', { data: '250' });

    expect(input.element.value).toBe('200');
  });

  test('Если задан числовой инпут и вводится допустимое число, то значение инпута будет данным числом', async () => {
    const wrapper = getBaseInput({ type: InputType.Number });
    const input = wrapper.find('input');

    input.element.value = '150';
    await input.trigger('input', { data: '150' });

    expect(input.element.value).toBe('150');
  });
});
