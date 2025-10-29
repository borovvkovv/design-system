import { RouteName } from '@/router/enum';
import type { PageLink, MenuLink } from '@/router/types';
import i18n from '@/translations';
import { IconName } from '@libs/components/icons-enums';
import { computed, type ComputedRef } from 'vue';

export const pagesLinks: ComputedRef<PageLink[]> = computed(() => [
  {
    to: { name: RouteName.Layout },
    title: i18n.global.t('router.page.layout'),
    icon: IconName.IconDocumentFill,
  },
  {
    to: { name: RouteName.Icons },
    title: i18n.global.t('router.page.icons'),
    icon: IconName.IconInfo,
  },
  {
    to: { name: RouteName.TextButton },
    title: i18n.global.t('router.combinedMenuLink.buttons'),
    icon: IconName.IconDownload,
    tabs: [
      {
        to: { name: RouteName.TextButton },
        title: i18n.global.t('router.page.textButton'),
      },
      {
        to: { name: RouteName.IconButton },
        title: i18n.global.t('router.page.iconButton'),
      },
      {
        to: { name: RouteName.IconTextButton },
        title: i18n.global.t('router.page.iconTextButton'),
      },
      {
        to: { name: RouteName.SwitcherButton },
        title: i18n.global.t('router.page.switcherButton'),
      },
    ],
  },
  {
    to: { name: RouteName.Checkbox },
    title: i18n.global.t('router.combinedMenuLink.checkboxes'),
    icon: IconName.IconMark,
    tabs: [
      {
        to: { name: RouteName.Checkbox },
        title: i18n.global.t('router.page.checkbox'),
      },
      {
        to: { name: RouteName.RadioButton },
        title: i18n.global.t('router.page.radioButton'),
      },
      {
        to: { name: RouteName.Switcher },
        title: i18n.global.t('router.page.switcher'),
      },
    ],
  },
  {
    to: { name: RouteName.AppTextArea },
    title: i18n.global.t('router.combinedMenuLink.inputs'),
    icon: IconName.IconBoard,
    tabs: [
      {
        to: { name: RouteName.AppTextArea },
        title: i18n.global.t('router.page.appTextArea'),
      },
      {
        to: { name: RouteName.BaseInput },
        title: i18n.global.t('router.page.baseInput'),
      },
      {
        to: { name: RouteName.BasePasswordInput },
        title: i18n.global.t('router.page.basePasswordInput'),
      },
      {
        to: { name: RouteName.BaseSimpleInput },
        title: i18n.global.t('router.page.baseSimpleInput'),
      },
      {
        to: { name: RouteName.SmartInput },
        title: i18n.global.t('router.page.smartInput'),
      },
    ],
  },
  {
    to: { name: RouteName.SimpleSelect },
    title: i18n.global.t('router.combinedMenuLink.selects'),
    icon: IconName.IconScroll,
    tabs: [
      { to: { name: RouteName.SimpleSelect }, title: i18n.global.t('router.page.simpleSelect') },
      {
        to: { name: RouteName.MultipleSelect },
        title: i18n.global.t('router.page.multipleSelect'),
      },
    ],
  },
  {
    to: { name: RouteName.CalendarDropdown },
    title: i18n.global.t('router.combinedMenuLink.calendars'),
    icon: IconName.IconCalendar,
    tabs: [
      {
        to: { name: RouteName.CalendarDropdown },
        title: i18n.global.t('router.page.calendarsSelect'),
      },
      {
        to: { name: RouteName.CalendarRangeDropdown },
        title: i18n.global.t('router.page.calendarsRange'),
      },
    ],
  },
]);

export const menuLinks: ComputedRef<MenuLink[]> = computed(() => [
  {
    to: { name: RouteName.Main },
    title: i18n.global.t('router.page.main'),
    description: '',
    tabs: [],
  },
  {
    to: { name: RouteName.Layout },
    title: i18n.global.t('router.page.layout'),
    description: '',
    tabs: [
      {
        to: { name: RouteName.LayoutExamples },
        title: i18n.global.t('router.pageTab.examples'),
        icon: IconName.IconDocumentFill,
      },
      {
        to: { name: RouteName.LayoutLiveDemo },
        title: i18n.global.t('router.pageTab.liveDemo'),
        icon: IconName.IconBoard,
      },
      {
        to: { name: RouteName.LayoutSetup },
        title: i18n.global.t('router.pageTab.setup'),
        icon: IconName.IconSettings,
      },
    ],
  },
  {
    to: { name: RouteName.Icons },
    title: i18n.global.t('router.page.icons'),
    description: '',
    tabs: [
      {
        to: { name: RouteName.IconsExamples },
        title: i18n.global.t('router.pageTab.examples'),
        icon: IconName.IconDocumentFill,
      },
      {
        to: { name: RouteName.IconsLiveDemo },
        title: i18n.global.t('router.pageTab.liveDemo'),
        icon: IconName.IconBoard,
      },
      {
        to: { name: RouteName.IconsSetup },
        title: i18n.global.t('router.pageTab.setup'),
        icon: IconName.IconSettings,
      },
    ],
  },
  {
    to: { name: RouteName.TextButton },
    title: i18n.global.t('router.page.textButton'),
    description: '',
    tabs: [
      {
        to: { name: RouteName.TextButtonExamples },
        title: i18n.global.t('router.pageTab.examples'),
        icon: IconName.IconDocumentFill,
      },
      {
        to: { name: RouteName.TextButtonLiveDemo },
        title: i18n.global.t('router.pageTab.liveDemo'),
        icon: IconName.IconBoard,
      },
      {
        to: { name: RouteName.TextButtonSetup },
        title: i18n.global.t('router.pageTab.setup'),
        icon: IconName.IconSettings,
      },
    ],
  },
  {
    to: { name: RouteName.IconButton },
    title: i18n.global.t('router.page.iconButton'),
    description: '',
    tabs: [
      {
        to: { name: RouteName.IconButtonExamples },
        title: i18n.global.t('router.pageTab.examples'),
        icon: IconName.IconDocumentFill,
      },
      {
        to: { name: RouteName.IconButtonLiveDemo },
        title: i18n.global.t('router.pageTab.liveDemo'),
        icon: IconName.IconBoard,
      },
      {
        to: { name: RouteName.IconButtonSetup },
        title: i18n.global.t('router.pageTab.setup'),
        icon: IconName.IconSettings,
      },
    ],
  },
  {
    to: { name: RouteName.IconTextButton },
    title: i18n.global.t('router.page.iconTextButton'),
    description: '',
    tabs: [
      {
        to: { name: RouteName.IconTextButtonExamples },
        title: i18n.global.t('router.pageTab.examples'),
        icon: IconName.IconDocumentFill,
      },
      {
        to: { name: RouteName.IconTextButtonLiveDemo },
        title: i18n.global.t('router.pageTab.liveDemo'),
        icon: IconName.IconBoard,
      },
      {
        to: { name: RouteName.IconTextButtonSetup },
        title: i18n.global.t('router.pageTab.setup'),
        icon: IconName.IconSettings,
      },
    ],
  },
  {
    to: { name: RouteName.SwitcherButton },
    title: i18n.global.t('router.page.switcherButton'),
    description: '',
    tabs: [
      {
        to: { name: RouteName.SwitcherButtonExamples },
        title: i18n.global.t('router.pageTab.examples'),
        icon: IconName.IconDocumentFill,
      },
      {
        to: { name: RouteName.SwitcherButtonLiveDemo },
        title: i18n.global.t('router.pageTab.liveDemo'),
        icon: IconName.IconBoard,
      },
      {
        to: { name: RouteName.SwitcherButtonSetup },
        title: i18n.global.t('router.pageTab.setup'),
        icon: IconName.IconSettings,
      },
    ],
  },
  {
    to: { name: RouteName.Checkbox },
    title: i18n.global.t('router.page.checkbox'),
    description: '',
    tabs: [
      {
        to: { name: RouteName.CheckboxExamples },
        title: i18n.global.t('router.pageTab.examples'),
        icon: IconName.IconDocumentFill,
      },
      {
        to: { name: RouteName.CheckboxLiveDemo },
        title: i18n.global.t('router.pageTab.liveDemo'),
        icon: IconName.IconBoard,
      },
      {
        to: { name: RouteName.CheckboxSetup },
        title: i18n.global.t('router.pageTab.setup'),
        icon: IconName.IconSettings,
      },
    ],
  },
  {
    to: { name: RouteName.RadioButton },
    title: i18n.global.t('router.page.radioButton'),
    description: '',
    tabs: [
      {
        to: { name: RouteName.RadioButtonExamples },
        title: i18n.global.t('router.pageTab.examples'),
        icon: IconName.IconDocumentFill,
      },
      {
        to: { name: RouteName.RadioButtonLiveDemo },
        title: i18n.global.t('router.pageTab.liveDemo'),
        icon: IconName.IconBoard,
      },
      {
        to: { name: RouteName.RadioButtonSetup },
        title: i18n.global.t('router.pageTab.setup'),
        icon: IconName.IconSettings,
      },
    ],
  },
  {
    to: { name: RouteName.Switcher },
    title: i18n.global.t('router.page.switcher'),
    description: '',
    tabs: [
      {
        to: { name: RouteName.SwitcherExamples },
        title: i18n.global.t('router.pageTab.examples'),
        icon: IconName.IconDocumentFill,
      },
      {
        to: { name: RouteName.SwitcherLiveDemo },
        title: i18n.global.t('router.pageTab.liveDemo'),
        icon: IconName.IconBoard,
      },
      {
        to: { name: RouteName.SwitcherSetup },
        title: i18n.global.t('router.pageTab.setup'),
        icon: IconName.IconSettings,
      },
    ],
  },
  {
    to: { name: RouteName.AppTextArea },
    title: i18n.global.t('router.page.appTextArea'),
    description: '',
    tabs: [
      {
        to: { name: RouteName.AppTextAreaExamples },
        title: i18n.global.t('router.pageTab.examples'),
        icon: IconName.IconDocumentFill,
      },
      {
        to: { name: RouteName.AppTextAreaLiveDemo },
        title: i18n.global.t('router.pageTab.liveDemo'),
        icon: IconName.IconBoard,
      },
      {
        to: { name: RouteName.AppTextAreaSetup },
        title: i18n.global.t('router.pageTab.setup'),
        icon: IconName.IconSettings,
      },
    ],
  },
  {
    to: { name: RouteName.BaseInput },
    title: i18n.global.t('router.page.baseInput'),
    description: '',
    tabs: [
      {
        to: { name: RouteName.BaseInputExamples },
        title: i18n.global.t('router.pageTab.examples'),
        icon: IconName.IconDocumentFill,
      },
      {
        to: { name: RouteName.BaseInputLiveDemo },
        title: i18n.global.t('router.pageTab.liveDemo'),
        icon: IconName.IconBoard,
      },
      {
        to: { name: RouteName.BaseInputSetup },
        title: i18n.global.t('router.pageTab.setup'),
        icon: IconName.IconSettings,
      },
    ],
  },
  {
    to: { name: RouteName.BasePasswordInput },
    title: i18n.global.t('router.page.basePasswordInput'),
    description: '',
    tabs: [
      {
        to: { name: RouteName.BasePasswordInputExamples },
        title: i18n.global.t('router.pageTab.examples'),
        icon: IconName.IconDocumentFill,
      },
      {
        to: { name: RouteName.BasePasswordInputLiveDemo },
        title: i18n.global.t('router.pageTab.liveDemo'),
        icon: IconName.IconBoard,
      },
      {
        to: { name: RouteName.BasePasswordInputSetup },
        title: i18n.global.t('router.pageTab.setup'),
        icon: IconName.IconSettings,
      },
    ],
  },
  {
    to: { name: RouteName.BaseSimpleInput },
    title: i18n.global.t('router.page.baseSimpleInput'),
    description: '',
    tabs: [
      {
        to: { name: RouteName.BaseSimpleInputExamples },
        title: i18n.global.t('router.pageTab.examples'),
        icon: IconName.IconDocumentFill,
      },
      {
        to: { name: RouteName.BaseSimpleInputLiveDemo },
        title: i18n.global.t('router.pageTab.liveDemo'),
        icon: IconName.IconBoard,
      },
      {
        to: { name: RouteName.BaseSimpleInputSetup },
        title: i18n.global.t('router.pageTab.setup'),
        icon: IconName.IconSettings,
      },
    ],
  },
  {
    to: { name: RouteName.SmartInput },
    title: i18n.global.t('router.page.smartInput'),
    description: '',
    tabs: [
      {
        to: { name: RouteName.SmartInputExamples },
        title: i18n.global.t('router.pageTab.examples'),
        icon: IconName.IconDocumentFill,
      },
      {
        to: { name: RouteName.SmartInputLiveDemo },
        title: i18n.global.t('router.pageTab.liveDemo'),
        icon: IconName.IconBoard,
      },
      {
        to: { name: RouteName.SmartInputSetup },
        title: i18n.global.t('router.pageTab.setup'),
        icon: IconName.IconSettings,
      },
    ],
  },
  {
    to: { name: RouteName.SimpleSelect },
    title: i18n.global.t('router.page.simpleSelect'),
    description: '',
    tabs: [
      {
        to: { name: RouteName.SimpleSelectExamples },
        title: i18n.global.t('router.pageTab.examples'),
        icon: IconName.IconDocumentFill,
      },
      {
        to: { name: RouteName.SimpleSelectLiveDemo },
        title: i18n.global.t('router.pageTab.liveDemo'),
        icon: IconName.IconBoard,
      },
      {
        to: { name: RouteName.SimpleSelectSetup },
        title: i18n.global.t('router.pageTab.setup'),
        icon: IconName.IconSettings,
      },
    ],
  },
  {
    to: { name: RouteName.MultipleSelect },
    title: i18n.global.t('router.page.multipleSelect'),
    description: '',
    tabs: [
      {
        to: { name: RouteName.MultipleSelectExamples },
        title: i18n.global.t('router.pageTab.examples'),
        icon: IconName.IconDocumentFill,
      },
      {
        to: { name: RouteName.MultipleSelectLiveDemo },
        title: i18n.global.t('router.pageTab.liveDemo'),
        icon: IconName.IconBoard,
      },
      {
        to: { name: RouteName.MultipleSelectSetup },
        title: i18n.global.t('router.pageTab.setup'),
        icon: IconName.IconSettings,
      },
    ],
  },
  {
    to: { name: RouteName.CalendarDropdown },
    title: i18n.global.t('router.page.calendarsSelect'),
    description: '',
    tabs: [
      {
        to: { name: RouteName.CalendarDropdownExamples },
        title: i18n.global.t('router.pageTab.examples'),
        icon: IconName.IconDocumentFill,
      },
      {
        to: { name: RouteName.CalendarDropdownLiveDemo },
        title: i18n.global.t('router.pageTab.liveDemo'),
        icon: IconName.IconBoard,
      },
      {
        to: { name: RouteName.CalendarDropdownSetup },
        title: i18n.global.t('router.pageTab.setup'),
        icon: IconName.IconSettings,
      },
    ],
  },
  {
    to: { name: RouteName.CalendarRangeDropdown },
    title: i18n.global.t('router.page.calendarsRange'),
    description: '',
    tabs: [
      {
        to: { name: RouteName.CalendarRangeDropdownExamples },
        title: i18n.global.t('router.pageTab.examples'),
        icon: IconName.IconDocumentFill,
      },
      {
        to: { name: RouteName.CalendarRangeDropdownLiveDemo },
        title: i18n.global.t('router.pageTab.liveDemo'),
        icon: IconName.IconBoard,
      },
      {
        to: { name: RouteName.CalendarRangeDropdownSetup },
        title: i18n.global.t('router.pageTab.setup'),
        icon: IconName.IconSettings,
      },
    ],
  },
]);
