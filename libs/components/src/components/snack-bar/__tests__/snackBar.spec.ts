import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { SnackBarStatus } from '../utils/models';
import SnackBar from '../SnackBar.vue';
import IconSuccess from '@comp/components/icons/IconSuccess.vue';
import IconInfoColored from '@comp/components/icons/IconInfoColored.vue';
import IconFailure from '@comp/components/icons/IconFailure.vue';
import IconCross24 from '@comp/components/icons/IconCross24.vue';

const getSnackBar = () =>
  mount(SnackBar, {
    props: {
      id: '',
      status: SnackBarStatus.Success,
      message: 'TestMessage',
      timer: 1000,
    },
  });

describe('Компонент SnackBar', () => {
  test('Мгновенное уведомление отрисовывает переданный через проп message текст', () => {
    const wrapper = getSnackBar();

    expect(wrapper.text()).toContain('TestMessage');
  });

  test('Вызывается эмит close через указанное в пропе timer количество мс', async () => {
    vi.useFakeTimers();
    const wrapper = getSnackBar();

    expect(wrapper.emitted('close')).toBeUndefined();

    await vi.advanceTimersByTimeAsync(900);

    expect(wrapper.emitted('close')).toBeUndefined();

    await vi.advanceTimersByTimeAsync(100);

    expect(wrapper.emitted('close')).toHaveLength(1);
  });

  test('Иконка для мгновенного уведомления отрисовывается в соответствии с типом уведомления', async () => {
    const wrapper = getSnackBar();
    await vi.dynamicImportSettled();

    expect(wrapper.findComponent(IconSuccess).exists).toBeTruthy();

    await wrapper.setProps({ status: SnackBarStatus.Alert });

    expect(wrapper.findComponent(IconFailure).exists).toBeTruthy();

    await wrapper.setProps({ status: SnackBarStatus.Normal });

    expect(wrapper.findComponent(IconInfoColored).exists).toBeTruthy();
  });

  test('При нажатии на иконку-крест уведомление закрывается сразу', async () => {
    const wrapper = getSnackBar();
    await vi.dynamicImportSettled();

    expect(wrapper.emitted('close')).toBeUndefined();

    await wrapper.findComponent(IconCross24).trigger('click');

    expect(wrapper.emitted('close')).toHaveLength(1);
  });
});
