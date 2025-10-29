import type { RouteRecordRaw } from 'vue-router';
import type { StrongNamedRouteRecordRaw } from '@/router/types';
import { RouteName, RoutePath } from '@/router/enum';

const routes: RouteRecordRaw & StrongNamedRouteRecordRaw = {
  path: RoutePath.Root,
  name: RouteName.Root,
  redirect: { name: RouteName.Main },
  component: () => import('@/views/DesignView.vue'),
  children: [
    {
      path: RoutePath.Main,
      name: RouteName.Main,
      component: () => import('@/views/MainPage.vue'),
    },
    {
      path: RoutePath.Icons,
      name: RouteName.Icons,
      redirect: { name: RouteName.IconsExamples },
      component: () => import('@/views/icons/BaseIconsPage.vue'),
      children: [
        {
          path: RoutePath.IconsExamples,
          name: RouteName.IconsExamples,
          component: () => import('@/views/icons/IconsPageExamples.vue'),
        },
        {
          path: RoutePath.IconsLiveDemo,
          name: RouteName.IconsLiveDemo,
          component: () => import('@/views/icons/IconsPageLiveDemo.vue'),
        },
        {
          path: RoutePath.IconsSetup,
          name: RouteName.IconsSetup,
          component: () => import('@/views/icons/IconsPageSetup.vue'),
        },
      ],
    },
    {
      path: RoutePath.TextButton,
      name: RouteName.TextButton,
      redirect: { name: RouteName.TextButtonExamples },
      component: () => import('@/views/buttons/text-button/BaseTextButtonPage.vue'),
      children: [
        {
          path: RoutePath.TextButtonExamples,
          name: RouteName.TextButtonExamples,
          component: () => import('@/views/buttons/text-button/TextButtonPageExamples.vue'),
        },
        {
          path: RoutePath.TextButtonLiveDemo,
          name: RouteName.TextButtonLiveDemo,
          component: () => import('@/views/buttons/text-button/TextButtonPageLiveDemo.vue'),
        },
        {
          path: RoutePath.TextButtonSetup,
          name: RouteName.TextButtonSetup,
          component: () => import('@/views/buttons/text-button/TextButtonPageSetup.vue'),
        },
      ],
    },
    {
      path: RoutePath.IconButton,
      name: RouteName.IconButton,
      redirect: { name: RouteName.IconButtonExamples },
      component: () => import('@/views/buttons/icon-button/BaseIconButtonPage.vue'),
      children: [
        {
          path: RoutePath.IconButtonExamples,
          name: RouteName.IconButtonExamples,
          component: () => import('@/views/buttons/icon-button/IconButtonPageExamples.vue'),
        },
        {
          path: RoutePath.IconButtonLiveDemo,
          name: RouteName.IconButtonLiveDemo,
          component: () => import('@/views/buttons/icon-button/IconButtonPageLiveDemo.vue'),
        },
        {
          path: RoutePath.IconButtonSetup,
          name: RouteName.IconButtonSetup,
          component: () => import('@/views/buttons/icon-button/IconButtonPageSetup.vue'),
        },
      ],
    },
    {
      path: RoutePath.IconTextButton,
      name: RouteName.IconTextButton,
      redirect: { name: RouteName.IconTextButtonExamples },
      component: () => import('@/views/buttons/icon-text-button/BaseIconTextButtonPage.vue'),
      children: [
        {
          path: RoutePath.IconTextButtonExamples,
          name: RouteName.IconTextButtonExamples,
          component: () => import('@/views/buttons/icon-text-button/IconTextButtonPageExamples.vue'),
        },
        {
          path: RoutePath.IconTextButtonLiveDemo,
          name: RouteName.IconTextButtonLiveDemo,
          component: () => import('@/views/buttons/icon-text-button/IconTextButtonPageLiveDemo.vue'),
        },
        {
          path: RoutePath.IconTextButtonSetup,
          name: RouteName.IconTextButtonSetup,
          component: () => import('@/views/buttons/icon-text-button/IconTextButtonPageSetup.vue'),
        },
      ],
    },
    {
      path: RoutePath.SwitcherButton,
      name: RouteName.SwitcherButton,
      redirect: { name: RouteName.SwitcherButtonExamples },
      component: () => import('@/views/buttons/switcher-button/BaseSwitcherButtonPage.vue'),
      children: [
        {
          path: RoutePath.SwitcherButtonExamples,
          name: RouteName.SwitcherButtonExamples,
          component: () => import('@/views/buttons/switcher-button/SwitcherButtonPageExamples.vue'),
        },
        {
          path: RoutePath.SwitcherButtonLiveDemo,
          name: RouteName.SwitcherButtonLiveDemo,
          component: () => import('@/views/buttons/switcher-button/SwitcherButtonPageLiveDemo.vue'),
        },
        {
          path: RoutePath.SwitcherButtonSetup,
          name: RouteName.SwitcherButtonSetup,
          component: () => import('@/views/buttons/switcher-button/SwitcherButtonPageSetup.vue'),
        },
      ],
    },
    {
      path: RoutePath.Checkbox,
      name: RouteName.Checkbox,
      redirect: { name: RouteName.CheckboxExamples },
      component: () => import('@/views/checkboxes/checkbox/BaseCheckboxPage.vue'),
      children: [
        {
          path: RoutePath.CheckboxExamples,
          name: RouteName.CheckboxExamples,
          component: () => import('@/views/checkboxes/checkbox/CheckboxPageExamples.vue'),
        },
        {
          path: RoutePath.CheckboxLiveDemo,
          name: RouteName.CheckboxLiveDemo,
          component: () => import('@/views/checkboxes/checkbox/CheckboxPageLiveDemo.vue'),
        },
        {
          path: RoutePath.CheckboxSetup,
          name: RouteName.CheckboxSetup,
          component: () => import('@/views/checkboxes/checkbox/CheckboxPageSetup.vue'),
        },
      ],
    },
    {
      path: RoutePath.RadioButton,
      name: RouteName.RadioButton,
      redirect: { name: RouteName.RadioButtonExamples },
      component: () => import('@/views/checkboxes/radio-button/BaseRadioButtonPage.vue'),
      children: [
        {
          path: RoutePath.RadioButtonExamples,
          name: RouteName.RadioButtonExamples,
          component: () => import('@/views/checkboxes/radio-button/RadioButtonPageExamples.vue'),
        },
        {
          path: RoutePath.RadioButtonLiveDemo,
          name: RouteName.RadioButtonLiveDemo,
          component: () => import('@/views/checkboxes/radio-button/RadioButtonPageLiveDemo.vue'),
        },
        {
          path: RoutePath.RadioButtonSetup,
          name: RouteName.RadioButtonSetup,
          component: () => import('@/views/checkboxes/radio-button/RadioButtonPageSetup.vue'),
        },
      ],
    },
    {
      path: RoutePath.Switcher,
      name: RouteName.Switcher,
      redirect: { name: RouteName.SwitcherExamples },
      component: () => import('@/views/checkboxes/switcher/BaseSwitcherPage.vue'),
      children: [
        {
          path: RoutePath.SwitcherExamples,
          name: RouteName.SwitcherExamples,
          component: () => import('@/views/checkboxes/switcher/SwitcherPageExamples.vue'),
        },
        {
          path: RoutePath.SwitcherLiveDemo,
          name: RouteName.SwitcherLiveDemo,
          component: () => import('@/views/checkboxes/switcher/SwitcherPageLiveDemo.vue'),
        },
        {
          path: RoutePath.SwitcherSetup,
          name: RouteName.SwitcherSetup,
          component: () => import('@/views/checkboxes/switcher/SwitcherPageSetup.vue'),
        },
      ],
    },
    {
      path: RoutePath.BaseInput,
      name: RouteName.BaseInput,
      redirect: { name: RouteName.BaseInputExamples },
      component: () => import('@/views/inputs/base-input/BaseBaseInputPage.vue'),
      children: [
        {
          path: RoutePath.BaseInputExamples,
          name: RouteName.BaseInputExamples,
          component: () => import('@/views/inputs/base-input/BaseInputPageExamples.vue'),
        },
        {
          path: RoutePath.BaseInputLiveDemo,
          name: RouteName.BaseInputLiveDemo,
          component: () => import('@/views/inputs/base-input/BaseInputPageLiveDemo.vue'),
        },
        {
          path: RoutePath.BaseInputSetup,
          name: RouteName.BaseInputSetup,
          component: () => import('@/views/inputs/base-input/BaseInputPageSetup.vue'),
        },
      ],
    },
    {
      path: RoutePath.AppTextArea,
      name: RouteName.AppTextArea,
      redirect: { name: RouteName.AppTextAreaExamples },
      component: () => import('@/views/inputs/app-text-area/BaseAppTextAreaPage.vue'),
      children: [
        {
          path: RoutePath.AppTextAreaExamples,
          name: RouteName.AppTextAreaExamples,
          component: () => import('@/views/inputs/app-text-area/AppTextAreaPageExamples.vue'),
        },
        {
          path: RoutePath.AppTextAreaLiveDemo,
          name: RouteName.AppTextAreaLiveDemo,
          component: () => import('@/views/inputs/app-text-area/AppTextAreaPageLiveDemo.vue'),
        },
        {
          path: RoutePath.AppTextAreaSetup,
          name: RouteName.AppTextAreaSetup,
          component: () => import('@/views/inputs/app-text-area/AppTextAreaPageSetup.vue'),
        },
      ],
    },
    {
      path: RoutePath.BasePasswordInput,
      name: RouteName.BasePasswordInput,
      redirect: { name: RouteName.BasePasswordInputExamples },
      component: () => import('@/views/inputs/base-password-input/BaseBasePasswordInputPage.vue'),
      children: [
        {
          path: RoutePath.BasePasswordInputExamples,
          name: RouteName.BasePasswordInputExamples,
          component: () => import('@/views/inputs/base-password-input/BasePasswordInputPageExamples.vue'),
        },
        {
          path: RoutePath.BasePasswordInputLiveDemo,
          name: RouteName.BasePasswordInputLiveDemo,
          component: () => import('@/views/inputs/base-password-input/BasePasswordInputPageLiveDemo.vue'),
        },
        {
          path: RoutePath.BasePasswordInputSetup,
          name: RouteName.BasePasswordInputSetup,
          component: () => import('@/views/inputs/base-password-input/BasePasswordInputPageSetup.vue'),
        },
      ],
    },
    {
      path: RoutePath.BaseSimpleInput,
      name: RouteName.BaseSimpleInput,
      redirect: { name: RouteName.BaseSimpleInputExamples },
      component: () => import('@/views/inputs/base-simple-input/BaseBaseSimpleInputPage.vue'),
      children: [
        {
          path: RoutePath.BaseSimpleInputExamples,
          name: RouteName.BaseSimpleInputExamples,
          component: () => import('@/views/inputs/base-simple-input/BaseSimpleInputPageExamples.vue'),
        },
        {
          path: RoutePath.BaseSimpleInputLiveDemo,
          name: RouteName.BaseSimpleInputLiveDemo,
          component: () => import('@/views/inputs/base-simple-input/BaseSimpleInputPageLiveDemo.vue'),
        },
        {
          path: RoutePath.BaseSimpleInputSetup,
          name: RouteName.BaseSimpleInputSetup,
          component: () => import('@/views/inputs/base-simple-input/BaseSimpleInputPageSetup.vue'),
        },
      ],
    },
    {
      path: RoutePath.SmartInput,
      name: RouteName.SmartInput,
      redirect: { name: RouteName.SmartInputExamples },
      component: () => import('@/views/inputs/smart-input/BaseSmartInputPage.vue'),
      children: [
        {
          path: RoutePath.SmartInputExamples,
          name: RouteName.SmartInputExamples,
          component: () => import('@/views/inputs/smart-input/SmartInputPageExamples.vue'),
        },
        {
          path: RoutePath.SmartInputLiveDemo,
          name: RouteName.SmartInputLiveDemo,
          component: () => import('@/views/inputs/smart-input/SmartInputPageLiveDemo.vue'),
        },
        {
          path: RoutePath.SmartInputSetup,
          name: RouteName.SmartInputSetup,
          component: () => import('@/views/inputs/smart-input/SmartInputPageSetup.vue'),
        },
      ],
    },
    {
      path: RoutePath.SimpleSelect,
      name: RouteName.SimpleSelect,
      redirect: { name: RouteName.SimpleSelectExamples },
      component: () => import('@/views/selects/simple-select/BaseSimpleSelectPage.vue'),
      children: [
        {
          path: RoutePath.SimpleSelectExamples,
          name: RouteName.SimpleSelectExamples,
          component: () => import('@/views/selects/simple-select/SimpleSelectPageExamples.vue'),
        },
        {
          path: RoutePath.SimpleSelectLiveDemo,
          name: RouteName.SimpleSelectLiveDemo,
          component: () => import('@/views/selects/simple-select/SimpleSelectPageLiveDemo.vue'),
        },
        {
          path: RoutePath.SimpleSelectSetup,
          name: RouteName.SimpleSelectSetup,
          component: () => import('@/views/selects/simple-select/SimpleSelectPageSetup.vue'),
        },
      ],
    },
    {
      path: RoutePath.MultipleSelect,
      name: RouteName.MultipleSelect,
      redirect: { name: RouteName.MultipleSelectExamples },
      component: () => import('@/views/selects/multiple-select/BaseMultipleSelectPage.vue'),
      children: [
        {
          path: RoutePath.MultipleSelectExamples,
          name: RouteName.MultipleSelectExamples,
          component: () => import('@/views/selects/multiple-select/MultipleSelectPageExamples.vue'),
        },
        {
          path: RoutePath.MultipleSelectLiveDemo,
          name: RouteName.MultipleSelectLiveDemo,
          component: () => import('@/views/selects/multiple-select/MultipleSelectPageLiveDemo.vue'),
        },
        {
          path: RoutePath.MultipleSelectSetup,
          name: RouteName.MultipleSelectSetup,
          component: () => import('@/views/selects/multiple-select/MultipleSelectSetup.vue'),
        },
      ],
    },
    {
      path: RoutePath.Layout,
      name: RouteName.Layout,
      redirect: { name: RouteName.LayoutExamples },
      component: () => import('@/views/layout/BaseLayoutPage.vue'),
      children: [
        {
          path: RoutePath.LayoutExamples,
          name: RouteName.LayoutExamples,
          component: () => import('@/views/layout/LayoutPageExamples.vue'),
        },
        {
          path: RoutePath.LayoutLiveDemo,
          name: RouteName.LayoutLiveDemo,
          component: () => import('@/views/layout/LayoutPageLiveDemo.vue'),
        },
        {
          path: RoutePath.LayoutSetup,
          name: RouteName.LayoutSetup,
          component: () => import('@/views/layout/LayoutPageSetup.vue'),
        },
      ],
    },
    {
      path: RoutePath.CalendarDropdown,
      name: RouteName.CalendarDropdown,
      redirect: { name: RouteName.CalendarDropdownExamples },
      component: () => import('@/views/calendars/calendar/BaseCalendarPage.vue'),
      children: [
        {
          path: RoutePath.CalendarDropdownExamples,
          name: RouteName.CalendarDropdownExamples,
          component: () => import('@/views/calendars/calendar/CalendarPageExamples.vue'),
        },
        {
          path: RoutePath.CalendarDropdownLiveDemo,
          name: RouteName.CalendarDropdownLiveDemo,
          component: () => import('@/views/calendars/calendar/CalendarPageLiveDemo.vue'),
        },
        {
          path: RoutePath.CalendarDropdownSetup,
          name: RouteName.CalendarDropdownSetup,
          component: () => import('@/views/calendars/calendar/CalendarPageSetup.vue'),
        },
      ],
    },
    {
      path: RoutePath.CalendarRangeDropdown,
      name: RouteName.CalendarRangeDropdown,
      redirect: { name: RouteName.CalendarRangeDropdownExamples },
      component: () => import('@/views/calendars/calendar-range/BaseCalendarRangePage.vue'),
      children: [
        {
          path: RoutePath.CalendarRangeDropdownExamples,
          name: RouteName.CalendarRangeDropdownExamples,
          component: () => import('@/views/calendars/calendar-range/CalendarRangePageExamples.vue'),
        },
        {
          path: RoutePath.CalendarRangeDropdownLiveDemo,
          name: RouteName.CalendarRangeDropdownLiveDemo,
          component: () => import('@/views/calendars/calendar-range/CalendarRangePageLiveDemo.vue'),
        },
        {
          path: RoutePath.CalendarRangeDropdownSetup,
          name: RouteName.CalendarRangeDropdownSetup,
          component: () => import('@/views/calendars/calendar-range/CalendarRangeSetup.vue'),
        },
      ],
    },
  ],
};

export default routes;
