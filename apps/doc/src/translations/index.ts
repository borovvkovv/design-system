import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'ru',
  fallbackLocale: 'ru',
  messages: {
    ru: {
      mainPage:
        'Демонстрация компонент, разработанных для Личного кабинета промышленного потребителя природного газа Группы компаний ООО “Газпром Межрегионгаз”',
      router: {
        page: {
          main: 'Главная',
          layout: 'Разметка',
          icons: 'Иконки',
          textButton: 'Кнопка с текстом',
          iconButton: 'Кнопка с иконкой',
          iconTextButton: 'Кнопка с иконкой и текстом',
          switcherButton: 'Кнопка-переключатель',
          checkbox: 'Чек-бокс',
          radioButton: 'Радиокнопка',
          switcher: 'Переключатель',
          appTextArea: 'Многострочное поле ввода',
          baseInput: 'Базовое поле ввода',
          basePasswordInput: 'Поле ввода пароля',
          baseSimpleInput: 'Простое поле ввода',
          smartInput: 'Поле ввода с выбором',
          simpleSelect: 'Еденичный выбор',
          multipleSelect: 'Множественный выбор',
          calendarsSelect: 'Еденичный выбор',
          calendarsRange: 'Выбор диапазона',
        },
        combinedMenuLink: {
          buttons: 'Кнопки',
          checkboxes: 'Чек-боксы',
          inputs: 'Поля ввода',
          calendars: 'Календари',
          selects: 'Выпадающие списки',
        },
        pageTab: {
          examples: 'Примеры',
          liveDemo: 'Демо',
          setup: 'Установка',
        },
      },
      sideBar: { collapseButton: 'Свернуть' },
      'vue-design-system': {
        layout: {
          'layout-page-setup': {
            layoutContainerGridExplain:
              'LayoutContainerGrid - контейнер для строки сетки с заданными отступами и максимальной шириной.',
            colStyleClassExplain: 'Ширина колонки сетки устанавливается через классы стилей: col-1...col-12.',
          },
        },
        icons: {
          'icons-page-setup': {
            iconComponentExplain: 'IconArrowLeft - svg-компонент.',
            appIconExplain: 'AppIcon - компонент, который отрисовывает иконку через проп "icon"',
          },
        },
      },
    },
    en: {
      mainPage:
        'This is the demonstration of the components from natural gas industrial customer personal account of Gazprom Mezhregiongas',
      router: {
        page: {
          main: 'Home',
          layout: 'Layout',
          icons: 'Icons',
          textButton: 'Button with text',
          iconButton: 'Button with icon',
          iconTextButton: 'Button with icon and text',
          switcherButton: 'Switcher button',
          checkbox: 'Checkbox',
          radioButton: 'Radiobutton',
          switcher: 'Switcher',
          baseInput: 'Base input',
          basePasswordInput: 'Passowrd input',
          baseSimpleInput: 'Simple input',
          smartInput: 'Smart input',
          simpleSelect: 'Single select',
          multipleSelect: 'Multiple select',
          calendarsSelect: 'Single date',
          calendarsRange: 'Date range',
        },
        combinedMenuLink: {
          buttons: 'Buttons',
          checkboxes: 'Checkboxes',
          inputs: 'Inputs',
          calendars: 'Calendars',
          selects: 'Selects',
        },
        pageTab: {
          examples: 'Examples',
          liveDemo: 'Live demo',
          setup: 'Setup',
        },
      },
      sideBar: { collapseButton: 'Collapse' },
      'vue-design-system': {
        layout: {
          'layout-page-setup': {
            layoutContainerGridExplain:
              'LayoutContainerGrid - container for row layout grid. Margins and max-width is defined in the row.',
            colStyleClassExplain: "Column's width is set with style classes: col-1...col-12.",
          },
        },
        icons: {
          'icons-page-setup': {
            iconComponentExplain: 'IconArrowLeft - svg-component.',
            appIconExplain: 'AppIcon - component which renders the icon with "icon" prop',
          },
        },
      },
    },
  },
});

export default i18n;
