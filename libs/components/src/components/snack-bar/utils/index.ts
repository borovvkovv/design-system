import { IconName } from '@comp/components/icons/utils/models';
import { type SnackBarParameters } from './models';
import { SnackBarStatus } from '@comp/components/snack-bar/utils/models';

/**
 * Получить параметры мгновенного уведомления по его статусу
 * @param status Статус
 * @param styles Записи стилей цветов
 * @returns Параметры мгновенного уведомления
 */
export const getParametersByStatus = (status: SnackBarStatus, styles: Record<string, string>): SnackBarParameters => {
  switch (status) {
    case SnackBarStatus.Success:
      return {
        borderColor: styles.green1,
        backgroundColor: styles.green4,
        icon: IconName.IconSuccess,
      };
    case SnackBarStatus.Alert:
      return {
        borderColor: styles.red3,
        backgroundColor: styles.red6,
        icon: IconName.IconFailure,
      };
    case SnackBarStatus.Normal:
    default:
      return {
        borderColor: styles.blueGrey3,
        backgroundColor: styles.blue7,
        icon: IconName.IconInfoColored,
      };
  }
};
