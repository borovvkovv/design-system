import type { CalendarType } from '@libs/components/calendars-enums';
import type { IconName } from '@libs/components/icons-enums';
import type { IClickableIcon, IconShowMode } from '@libs/components/inputs-types';
import type { InputType } from '@libs/components/inputs-enums';
import type { ISelectItem } from '@libs/components/selects-types';
import type { Size } from '@libs/components/enums';

export type PortalTableModel = {
  name: string;
  taxIN: number;
  curatorName: string;
  debtSum?: number;
  isUserLkpp: boolean;
  lastLogin?: Date;
  lockoutEnabled: boolean;
  isDisabled?: boolean;
};

export const accordionModelData = [
  {
    groupName: 'Accountant',
    groupDescription: 'Бухгалтер',
    roles: [
      {
        description: 'Контакты',
        name: 'Контакты',
        group: 'Контакты',
      },
      {
        description: 'Бухгалтерские документы',
        name: 'Бухгалтерские документы',
        group: 'Документы',
      },
    ],
  },
  {
    groupName: 'Administrator',
    groupDescription: 'Администратор',
    roles: [
      {
        description: 'Изменение настроек сайта',
        name: 'Изменение настроек сайта',
        group: 'Прочее',
      },
      {
        description: 'Потребление по подключениям',
        name: 'Потребление по подключениям',
        group: 'Потребление',
      },
      {
        description: 'Список подключений',
        name: 'Список подключений',
        group: 'Потребление',
      },
    ],
  },
];

export const portalTableData: Array<PortalTableModel> = [
  {
    name: 'Авдалян Э.А.',
    taxIN: 602716854890,
    curatorName: 'Красильников Ю.М.',
    debtSum: 18818.21,
    isUserLkpp: true,
    lastLogin: new Date('04.02.2024 10:25'),
    lockoutEnabled: false,
  },
  {
    name: 'Аветисян С.Д.',
    taxIN: 602717424525,
    curatorName: 'Родионов М.В.',
    debtSum: 20816.2,
    isUserLkpp: true,
    lastLogin: new Date('02.02.2024 12:43'),
    lockoutEnabled: true,
  },
  {
    name: 'Аветян А.А.',
    taxIN: 6027001401401,
    curatorName: 'Третьяков В.В.',
    debtSum: 18818.21,
    isUserLkpp: true,
    lastLogin: new Date('02.02.2024 16:36'),
    lockoutEnabled: false,
  },
  {
    name: 'Администрация городского поселения “Полонская волость” ',
    taxIN: 6017011788,
    curatorName: 'Шарафутдинов Т.С.',
    debtSum: 150543.6,
    isUserLkpp: false,
    lockoutEnabled: false,
  },
  {
    name: 'Религиозная организация ДПОО “Центр подготовки церковных специалистов Псковской Епархии Русской Православной Церкви”',
    taxIN: 602716854890,
    curatorName: 'Комиссаров С.Т.',
    isUserLkpp: true,
    lockoutEnabled: false,
    isDisabled: true,
  },
  {
    name: 'АНОО "Ольгинская гимназия"',
    taxIN: 6027189347,
    curatorName: 'Александров К.А.',
    debtSum: 3425.43,
    isUserLkpp: false,
    lockoutEnabled: false,
  },
  {
    name: 'Муниципальное образовательное учреждение дополнительного образования детей специализированная детско-юношеская спортивная школа олимпийского резерва по боксу',
    taxIN: 6027999013,
    curatorName: 'Волошина М.А.',
    isUserLkpp: false,
    lastLogin: new Date('28.01.2024 14:38'),
    lockoutEnabled: false,
  },
  {
    name: 'Муниципальное образовательное учреждение дополнительного образования детей специализированная детско-юношеская спортивная школа олимпийского резерва по боксу',
    taxIN: 6027999013,
    curatorName: 'Волошина М.А.',
    isUserLkpp: false,
    lastLogin: new Date('28.01.2024 14:38'),
    lockoutEnabled: false,
  },
  {
    name: 'Муниципальное образовательное учреждение дополнительного образования детей специализированная детско-юношеская спортивная школа олимпийского резерва по боксу',
    taxIN: 6027999013,
    curatorName: 'Волошина М.А.',
    isUserLkpp: false,
    lastLogin: new Date('28.01.2024 14:38'),
    lockoutEnabled: false,
  },
  {
    name: 'Муниципальное образовательное учреждение дополнительного образования детей специализированная детско-юношеская спортивная школа олимпийского резерва по боксу',
    taxIN: 6027999013,
    curatorName: 'Волошина М.А.',
    isUserLkpp: false,
    lastLogin: new Date('28.01.2024 14:38'),
    lockoutEnabled: false,
  },
  {
    name: 'Муниципальное образовательное учреждение дополнительного образования детей специализированная детско-юношеская спортивная школа олимпийского резерва по боксу',
    taxIN: 6027999013,
    curatorName: 'Волошина М.А.',
    isUserLkpp: false,
    lastLogin: new Date('28.01.2024 14:38'),
    lockoutEnabled: false,
  },
  {
    name: 'Муниципальное образовательное учреждение дополнительного образования детей специализированная детско-юношеская спортивная школа олимпийского резерва по боксу',
    taxIN: 6027999013,
    curatorName: 'Волошина М.А.',
    isUserLkpp: false,
    lastLogin: new Date('28.01.2024 14:38'),
    lockoutEnabled: false,
  },
];

export type PortalTableNameColumn = {
  name: string;
  code: number;
};

export type PortalTableInnColumn = {
  name: string;
};

export type RawLoaderContent = Promise<{ default: string }>;

export enum Languages {
  English = 'en',
  Russian = 'ru',
}

type GetObjDifferentKeys<T, U> = Omit<T, keyof U> & Omit<U, keyof T>;

type GetObjSameKeys<T, U> = Omit<T | U, keyof GetObjDifferentKeys<T, U>>;

type DeepMergeTwoTypes<T, U> = Partial<GetObjDifferentKeys<T, U>> & { [K in keyof GetObjSameKeys<T, U>]: T[K] | U[K] };

export type DeepMergeTypes<Types extends any[]> = Types extends [infer First, ...infer Rest]
  ? Rest['length'] extends 0
    ? First
    : First extends object
      ? DeepMergeTwoTypes<First, DeepMergeTypes<Rest>>
      : never
  : never;

export type ComponentPropStates<T> = {
  title: string;
  states: Array<ComponentPropState<T>>;
};

export type ComponentPropState<T> = {
  stateName: string;
  stateValue: T;
};

export type ExtractTypeName<T> = T extends IconName
  ? 'IconName'
  : T extends IconShowMode
    ? 'IconShowMode'
    : T extends InputType
      ? 'InputType'
      : T extends CalendarType
        ? 'CalendarType'
        : T extends Size
          ? 'Size'
          : T extends IClickableIcon
            ? 'IClickableIcon'
            : T extends Array<string>
              ? 'StringArray'
              : T extends Array<ISelectItem>
                ? 'ISelectItemArray'
                : T extends ISelectItem
                  ? 'ISelectItem'
                  : T extends (date: Date) => boolean
                    ? 'Predicate'
                    : T extends Date
                      ? 'Date'
                      : T extends string
                        ? 'string'
                        : T extends number
                          ? 'number'
                          : T extends boolean
                            ? 'boolean'
                            : 'unknown';

export type KeysWithValueType<T, V> = {
  [K in keyof T]: ExtractTypeName<NonNullable<T[K]>> extends ExtractTypeName<NonNullable<V>> ? K : never;
}[keyof T];

export type KeyAndType<T> = {
  [K in keyof T]: ExtractTypeName<NonNullable<T[K]>>;
};

export type ValueTypeWithKeysWithValueType<T> = {
  [K in keyof KeyAndType<T> as KeyAndType<T>[K]]: KeysWithValueType<T, T[K]>;
};
