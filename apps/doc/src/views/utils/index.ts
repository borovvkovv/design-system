// import { useQuery } from '@tanstack/vue-query';
// import { format } from '@/utils/date';
// import { stringToNumber } from '@/utils/number';
// import { portalTableData, type PortalTableModel } from '@/views/utils/models';
import MarkdownIt from 'markdown-it';
import type Token from 'markdown-it/lib/token.mjs';
// import type {
//   QueryParam,
//   TPortalCell,
//   TPortalData,
//   TPortalHeaderRow,
//   TPortalRow,
// } from '@libs/components/portal-table/utils/models';
// import { IconName } from '@libs/components/icons/models';
// import { LinksStyles } from '@libs/components/app-link/utils/models';
// import type { ISelectItem } from '@libs/components/selects/models';

/**
 * Получить отфильтрованные тестовые данные для портальной таблицы
 * @param queryParams Фильтр
 * @returns Массив PortalTableModel
 */
// export const getPortalTableData = (queryParams: QueryParam[] | undefined): Array<PortalTableModel> =>
//   portalTableData.filter((item) => {
//     if (!queryParams) return true;

//     return queryParams.every((queryParam) => {
//       const queryParamKey = queryParam.key;
//       const queryParamValue = queryParam.value;

//       if (queryParamKey === 'debtSum') {
//         if (queryParamValue instanceof Array) {
//           const min = stringToNumber(queryParamValue[0]?.toString() ?? '');
//           const max = stringToNumber(queryParamValue[1]?.toString() ?? '');

//           return (!min || (item.debtSum && item.debtSum >= min)) && (!max || (item.debtSum && item.debtSum <= max));
//         }
//       }

//       if (queryParamKey === 'isUserLkpp') {
//         if (queryParamValue) {
//           return item.isUserLkpp === Boolean(queryParamValue === 'Да');
//         }
//       }
//       if (queryParamKey in item) {
//         const itemValue = item[queryParamKey as keyof PortalTableModel];

//         if (queryParamValue instanceof Array) {
//           return queryParamValue.includes(itemValue?.toString());
//         } else return queryParamValue === itemValue?.toString();
//       }

//       return true;
//     });
//   });

/**
 * Формирование данных для таблицы портала.
 *
 * @param data Данные для отображения в таблице к которым применяются фильтры, сортировка и т.д.
 * @param originalData Все данные таблицы для формирования для каждого столбца списка всех возможных значений, применяется в фильтрах.
 * @returns TPortalData Данные для отобрадения итаблицы портала.
 */
// export const portalTableBuilder = (data: PortalTableModel[]): TPortalData<PortalTableModel> => {
//   const rows = data?.map((contragent) => {
//     const row: TPortalRow<PortalTableModel> = {
//       cells: [],
//       modifier: {
//         other: contragent.isDisabled ? undefined : 'hover:bg-grey-4/20',
//       },
//       actionsSection: {
//         actions: [
//           {
//             icon: IconName.IconEdit,
//             title: 'Редактировать',
//             onIconClick: () => {},
//           },
//           {
//             icon: contragent.lockoutEnabled ? IconName.IconLock : IconName.IconLocked,
//             title: contragent.lockoutEnabled ? 'Разблокировать' : 'Заблокировать',
//             onIconClick: () => {},
//           },
//         ],
//         modifier: {
//           border: ['border-l', 'border-l-blueGrey-5'],
//           padding: ['px-3', 'py-3'],
//           other: ['bg-grey-4/20'],
//         },
//       },
//       isDisabled: contragent.isDisabled,
//     };

//     row.cells.push(
//       {
//         type: 'link',
//         title: contragent.name,
//         pattern: '',
//         href: '',
//         linkStyle: LinksStyles.Style10,
//         isDisabled: contragent.isDisabled,
//         maxLines: 3,
//         modifier: {
//           textAlign: 'text-left',
//           textColor: contragent.isDisabled ? 'text-grey-3' : undefined,
//         },
//       },
//       ...[contragent.taxIN, contragent.curatorName].map(
//         (item): TPortalCell => ({
//           type: 'text',
//           text: item.toString(),
//           modifier: {
//             textAlign: 'text-left',
//             textColor: contragent.isDisabled ? 'text-grey-3' : undefined,
//           },
//         }),
//       ),
//       {
//         type: 'text',
//         text: contragent.debtSum ? `${contragent.debtSum} ₽` : '',
//         modifier: {
//           textColor: 'text-red-3',
//         },
//       },
//       {
//         type: 'icon',
//         icon: contragent.isUserLkpp ? IconName.IconMark : IconName.IconNone,
//         size: 16,
//         modifier: {
//           textColor: 'text-blue-2',
//           other: 'mx-auto',
//         },
//       },
//       {
//         type: 'texts',
//         spans: [
//           {
//             type: 'text',
//             text: contragent.lastLogin ? format(contragent.lastLogin, 'dd.MM.yyyy') : '',
//             modifier: {
//               textColor: 'text-black-1',
//             },
//           },
//           {
//             type: 'text',
//             text: ' ',
//           },
//           {
//             type: 'text',
//             text: contragent.lastLogin ? format(contragent.lastLogin, 'HH:mm') : '',
//             modifier: {
//               textColor: 'text-grey-2',
//             },
//           },
//         ],
//         modifier: {
//           textColor: 'text-blue-2',
//         },
//       },
//       {
//         type: 'icon',
//         icon: contragent.lockoutEnabled ? IconName.IconLocked : IconName.IconNone,
//         size: 16,
//         modifier: {
//           textColor: 'text-blueGrey-2',
//           other: 'mx-auto',
//         },
//       },
//     );

//     row.cells.forEach(
//       (cell, i, cells) =>
//         (cell.modifier = {
//           ...cell.modifier,
//           padding: ['py-3', i === cells.length - 1 ? 'px-3' : 'px-4'],
//           text: 'text-size-6',
//           border: ['border-b', 'border-b-blueGrey-5'],
//         }),
//     );

//     return row;
//   });

//   const header: TPortalHeaderRow<PortalTableModel> = {
//     cells: [
//       {
//         type: 'text',
//         text: 'Наименование',
//         modifier: {
//           textAlign: 'text-left',
//           width: 'min-w-28',
//         },
//         controls: [
//           {
//             type: 'filterSelect',
//             column: 'name',
//             getColumnData: () =>
//               useQuery({
//                 queryKey: ['TEST_NAME'],
//                 queryFn: () =>
//                   Promise.resolve([
//                     {
//                       name: 'Авдалян Э.А.',
//                       code: 1,
//                     },
//                     {
//                       name: 'АНОО "Ольгинская гимназия"',
//                       code: 2,
//                     },
//                     {
//                       name: 'Муниципальное образовательное учреждение дополнительного образования детей специализированная детско-юношеская спортивная школа олимпийского резерва по боксу',
//                       code: 3,
//                     },
//                   ]),
//                 select: (consumers): ISelectItem[] =>
//                   consumers.map((consumer) => ({
//                     title: consumer.name,
//                     value: consumer.code.toString(),
//                   })),
//               }),
//             placeholder: 'Все',
//           },
//           {
//             type: 'sort',
//             column: 'name',
//             sortCode: 0,
//             onChangeSortOrderHandler: () => {},
//           },
//         ],
//       },
//       {
//         type: 'text',
//         text: 'ИНН',
//         modifier: {
//           textAlign: 'text-left',
//           width: 'min-w-32',
//         },
//         controls: [
//           {
//             type: 'filterSelectSwitch',
//             column: 'taxIN',
//             getColumnData: () => [
//               {
//                 title: '6017011788',
//                 value: '6017011788',
//               },
//               {
//                 title: '602716854890',
//                 value: '602716854890',
//               },
//             ],
//             placeholder: 'Выберите ИНН',
//           },
//           {
//             type: 'sort',
//             column: 'taxIN',
//             sortCode: 0,
//             onChangeSortOrderHandler: () => {},
//           },
//         ],
//       },
//       {
//         type: 'text',
//         text: 'Куратор',
//         modifier: {
//           textAlign: 'text-left',
//           width: 'min-w-40',
//         },
//         controls: [
//           {
//             type: 'sort',
//             column: 'curatorName',
//             sortCode: 0,
//             onChangeSortOrderHandler: () => {},
//           },
//         ],
//       },
//       {
//         type: 'text',
//         text: 'Задолженность',
//         modifier: {
//           textAlign: 'text-left',
//           width: 'min-w-32',
//         },
//         controls: [
//           {
//             type: 'filterNumberRange',
//             minValueName: 'min',
//             maxValueName: 'max',
//             measureIconName: IconName.IconRuble,
//           },
//           {
//             type: 'sort',
//             column: 'debtSum',
//             sortCode: 0,
//             onChangeSortOrderHandler: () => {},
//           },
//         ],
//       },
//       {
//         type: 'text',
//         text: 'Телеметрия',
//         modifier: {
//           textAlign: 'text-left',
//           width: 'min-w-26',
//         },
//         controls: [
//           {
//             type: 'sort',
//             column: 'isUserLkpp',
//             sortCode: 0,
//             onChangeSortOrderHandler: () => {},
//           },
//           {
//             type: 'filterSelect',
//             column: 'isUserLkpp',
//             placeholder: 'Все',
//             getColumnData: () => [
//               {
//                 title: 'Да',
//                 value: 'Да',
//               },
//               {
//                 title: 'Нет',
//                 value: 'Нет',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         type: 'text',
//         text: 'Последний вход',
//         modifier: {
//           width: 'min-w-39',
//         },
//       },
//       {
//         type: 'icon',
//         icon: IconName.IconNone,
//         stubText: 'Блокировка',
//         modifier: {
//           textAlign: 'text-center',
//           width: 'min-w-10',
//         },
//       },
//     ],
//   };

//   header.cells.forEach(
//     (cell, i, array) =>
//       (cell.modifier = {
//         ...cell.modifier,
//         text: 'text-size-6',
//         textColor: 'text-grey-1',
//         padding: ['pl-4', 'py-3', 'pr-3'],
//         border: [
//           'border',
//           'border-blueGrey-5',
//           i === 0 ? 'border-l-0' : 'border-l',
//           i === array.length - 1 ? 'border-r-0' : 'border-r',
//         ],
//         other: [
//           'font-medium',
//           i === 0 ? 'w-auto' : 'w-fit',
//           'whitespace-nowrap',
//           'bg-grey-4/20',
//           'max-w-0',
//           'hover:bg-grey-5',
//         ],
//       }),
//   );

//   return {
//     header,
//     rows,
//   };
// };

export const parseMarkdownText = (text = ``): string => {
  const tokens: Token[] = new MarkdownIt().parse(text, {});
  const result = tokens.filter(({ tag, type }) => tag === `code` && type === `fence`).map(({ content }) => content)[0];

  return result?.length ? result : text;
};
