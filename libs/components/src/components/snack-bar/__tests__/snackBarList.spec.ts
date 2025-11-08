import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import SnackBar from '@comp/components/snack-bar/SnackBar.vue';
import SnackBarList from '@comp/components/snack-bar/SnackBarList.vue';
import { SnackBarStatus } from '@comp/components/snack-bar/utils/models';

vi.mock('@comp/stores/snackBar', () => ({
  useSnackBar: () => ({
    snackBarList: [
      {
        id: '1',
        status: SnackBarStatus.Alert,
        message: 'TestSnackBarListMessage1',
        timer: 800,
      },
      {
        id: '2',
        status: SnackBarStatus.Normal,
        message: 'TestSnackBarListMessage2',
        timer: 900,
      },
      {
        id: '3',
        status: SnackBarStatus.Success,
        message: 'TestSnackBarListMessage3',
        timer: 1000,
      },
    ],
  }),
}));

const getSnackBarList = () => mount(SnackBarList);

// describe('Компонент SnackBarList', () => {
// test('Компонент отрисовывает список мгновенных уведомлений из хранилища', () => {
//   const wrapper = getSnackBarList();
//   expect(wrapper.findAllComponents(SnackBar)).toHaveLength(3);
// });
// test('Каждое мгновенное уведомление закрывается в соответствии со своим пропом timer', async () => {
//   vi.useFakeTimers();
//   const wrapper = getSnackBarList();
//   expect(wrapper.findAllComponents(SnackBar)?.[0].emitted('close')).toBeUndefined();
//   expect(wrapper.findAllComponents(SnackBar)?.[1].emitted('close')).toBeUndefined();
//   expect(wrapper.findAllComponents(SnackBar)?.[2].emitted('close')).toBeUndefined();
//   await vi.advanceTimersByTimeAsync(700);
//   expect(wrapper.findAllComponents(SnackBar)?.[0].emitted('close')).toBeUndefined();
//   expect(wrapper.findAllComponents(SnackBar)?.[1].emitted('close')).toBeUndefined();
//   expect(wrapper.findAllComponents(SnackBar)?.[2].emitted('close')).toBeUndefined();
//   await vi.advanceTimersByTimeAsync(100);
//   expect(wrapper.findAllComponents(SnackBar)?.[0].emitted('close')).toHaveLength(1);
//   expect(wrapper.findAllComponents(SnackBar)?.[1].emitted('close')).toBeUndefined();
//   expect(wrapper.findAllComponents(SnackBar)?.[2].emitted('close')).toBeUndefined();
//   await vi.advanceTimersByTimeAsync(100);
//   expect(wrapper.findAllComponents(SnackBar)?.[0].emitted('close')).toHaveLength(1);
//   expect(wrapper.findAllComponents(SnackBar)?.[1].emitted('close')).toHaveLength(1);
//   expect(wrapper.findAllComponents(SnackBar)?.[2].emitted('close')).toBeUndefined();
//   await vi.advanceTimersByTimeAsync(100);
//   expect(wrapper.findAllComponents(SnackBar)?.[0].emitted('close')).toHaveLength(1);
//   expect(wrapper.findAllComponents(SnackBar)?.[1].emitted('close')).toHaveLength(1);
//   expect(wrapper.findAllComponents(SnackBar)?.[2].emitted('close')).toHaveLength(1);
// });
// });
