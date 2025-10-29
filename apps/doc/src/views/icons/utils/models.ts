import type { DeepMergeTypes } from '@/views/utils/models';
import type {
  IconBase,
  IconBellProps,
  IconDocumentExtensionProps,
  IconMarkerNumberProps,
  IconWithAnimation,
  IconWithColor,
} from '@libs/components/icons-types';
import { IconName } from '@libs/components/icons-enums';
import { Size } from '@libs/components/enums';
import { defineAsyncComponent, type Component } from 'vue';

export type AllIconsProps = DeepMergeTypes<
  [IconBase, IconWithAnimation, IconWithColor, IconBellProps, IconDocumentExtensionProps, IconMarkerNumberProps]
>;

export const allIconsPropsNames: { [P in keyof Required<AllIconsProps>]: P } = {
  animate: 'animate',
  delay: 'delay',
  extension: 'extension',
  fill: 'fill',
  fontSize: 'fontSize',
  fontWeight: 'fontWeight',
  indicated: 'indicated',
  number: 'number',
  size: 'size',
  stroke: 'stroke',
};

export type IconNameAndProps = {
  iconName: IconName;
  props?: AllIconsProps;
};

export type DesignSystemIconProperties = {
  title?: string;
  size?: number;
  icons: Array<IconNameAndProps>;
};

export type IconProps = Record<IconName, AllIconsProps | undefined>;

export const designSystemIcons: Array<DesignSystemIconProperties> = [
  {
    size: 8,
    icons: [
      { iconName: IconName.IconArrowDownTriangle, props: { size: 8 } },
      { iconName: IconName.IconArrowUpTriangle, props: { size: 8 } },
      { iconName: IconName.IconMarker },
    ],
  },
  {
    size: 10,
    icons: [{ iconName: IconName.IconRuble }],
  },
  {
    size: 16,
    icons: [
      { iconName: IconName.IconArrowDownTriangle, props: { size: 16 } },
      { iconName: IconName.IconArrowUpTriangle, props: { size: 16 } },
      { iconName: IconName.IconArrangeAsc },
      { iconName: IconName.IconArrangeDesc },
      { iconName: IconName.IconEdit },
      { iconName: IconName.IconInfo, props: { size: 16 } },
      { iconName: IconName.IconLoading, props: { size: 16, animate: true } },
      { iconName: IconName.IconLock },
      { iconName: IconName.IconLocked },
      { iconName: IconName.IconLogout },
      { iconName: IconName.IconMark },
      { iconName: IconName.IconMinus },
      { iconName: IconName.IconPlus, props: { size: 16 } },
      { iconName: IconName.IconPlusRotate },
      { iconName: IconName.IconQuestion, props: { size: 16 } },
      { iconName: IconName.IconTimer },
      { iconName: IconName.IconUpdate },
    ],
  },
  {
    size: 20,
    icons: [
      { iconName: IconName.IconArrowUp },
      { iconName: IconName.IconArrowDown, props: { size: 20 } },
      { iconName: IconName.IconArrowLeft, props: { size: 20 } },
      { iconName: IconName.IconArrowRight, props: { size: 20 } },
      { iconName: IconName.IconArrowLeftThin },
      { iconName: IconName.IconArrowRightThin },
      { iconName: IconName.IconBoard, props: { size: 20 } },
      { iconName: IconName.IconCalendar },
      { iconName: IconName.IconCalendarFill },
      { iconName: IconName.IconChart },
      { iconName: IconName.IconChartArrow },
      { iconName: IconName.IconClock },
      { iconName: IconName.IconClockFill },
      { iconName: IconName.IconColumn },
      { iconName: IconName.IconContacts },
      { iconName: IconName.IconCross, props: { size: 20 } },
      { iconName: IconName.IconDocumentFill },
      { iconName: IconName.IconDownload },
      { iconName: IconName.IconEntity },
      { iconName: IconName.IconEyeClose },
      { iconName: IconName.IconEyeOpen },
      { iconName: IconName.IconFolder },
      { iconName: IconName.IconFolderArchive, props: { size: 20 } },
      { iconName: IconName.IconInfo, props: { size: 20 } },
      { iconName: IconName.IconKey },
      { iconName: IconName.IconLoading, props: { size: 20, animate: true } },
      { iconName: IconName.IconMagnifier },
      { iconName: IconName.IconNone },
      { iconName: IconName.IconPaperClip },
      { iconName: IconName.IconParameters },
      { iconName: IconName.IconPlus, props: { size: 20 } },
      { iconName: IconName.IconPlusFillRotate },
      { iconName: IconName.IconProfile, props: { size: 20 } },
      { iconName: IconName.IconQuestion, props: { size: 20 } },
      { iconName: IconName.IconQuestionFill },
      { iconName: IconName.IconScroll },
      { iconName: IconName.IconSettings, props: { size: 20 } },
      { iconName: IconName.IconSettingsFill },
      { iconName: IconName.IconWasteBin },
    ],
  },
  {
    size: 24,
    icons: [
      { iconName: IconName.IconBell, props: { indicated: false } },
      { iconName: IconName.IconBell, props: { indicated: true } },
      { iconName: IconName.IconBurger },
      { iconName: IconName.IconCross, props: { size: 24 } },
      { iconName: IconName.IconExclamationMark, props: { size: 24 } },
      { iconName: IconName.IconFailure },
      { iconName: IconName.IconFilter },
      { iconName: IconName.IconInfo, props: { size: 24 } },
      { iconName: IconName.IconInfoColored },
      { iconName: IconName.IconLoading, props: { size: 24, animate: true } },
      { iconName: IconName.IconMagnifierCross },
      { iconName: IconName.IconProfile, props: { size: 24 } },
      { iconName: IconName.IconQuestion, props: { size: 24 } },
      { iconName: IconName.IconSuccess },
    ],
  },
  {
    size: 28,
    icons: [{ iconName: IconName.IconCrossRotate }],
  },
  {
    size: 32,
    icons: [
      { iconName: IconName.IconBoard, props: { size: 32 } },
      { iconName: IconName.IconDragAndDrop },
      { iconName: IconName.IconFolderArchive, props: { size: 32 } },
      { iconName: IconName.IconLoading, props: { size: 32, animate: true } },
      { iconName: IconName.IconMonitor },
      { iconName: IconName.IconSettings, props: { size: 32 } },
    ],
  },
  {
    size: 48,
    icons: [{ iconName: IconName.IconCrossColor }, { iconName: IconName.IconEmptyGraph }],
  },
  { size: 69, icons: [{ iconName: IconName.IconTable }] },
  {
    title: 'Markers',
    icons: [
      { iconName: IconName.IconMarkerNumber, props: { number: 0 } },
      { iconName: IconName.IconMarkerNumber, props: { number: 10 } },
      { iconName: IconName.IconMarkerNumber, props: { number: 90 } },
      { iconName: IconName.IconMarkerNumber, props: { number: 100 } },
    ],
  },
  {
    title: 'Doc icons',
    icons: [
      { iconName: IconName.IconDocumentExtension, props: { size: Size.M, extension: 'pdf' } },
      { iconName: IconName.IconDocumentExtension, props: { size: Size.M, extension: 'XlSx' } },
      { iconName: IconName.IconDocumentExtension, props: { size: Size.M, extension: 'jpeg' } },
      { iconName: IconName.IconDocumentExtension, props: { size: Size.M, extension: 'LONGEXT' } },
    ],
  },
];

export const IconComponents: { [Value in IconName]: Component } = {
  [IconName.IconArrowDown]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconArrowDown)),
  [IconName.IconArrowDownTriangle]: defineAsyncComponent(() =>
    import('@libs/components/icons').then((c) => c.IconArrowDownTriangle),
  ),
  [IconName.IconArrowLeftThin]: defineAsyncComponent(() =>
    import('@libs/components/icons').then((c) => c.IconArrowLeftThin),
  ),
  [IconName.IconArrowLeft]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconArrowLeft)),
  [IconName.IconArrowRight]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconArrowRight)),
  [IconName.IconArrowRightThin]: defineAsyncComponent(() =>
    import('@libs/components/icons').then((c) => c.IconArrowRightThin),
  ),
  [IconName.IconArrowUp]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconArrowUp)),
  [IconName.IconArrowUpTriangle]: defineAsyncComponent(() =>
    import('@libs/components/icons').then((c) => c.IconArrowUpTriangle),
  ),
  [IconName.IconLoading]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconLoading)),
  [IconName.IconPlus]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconPlus)),
  [IconName.IconCross]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconCross)),
  [IconName.IconEyeOpen]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconEyeOpen)),
  [IconName.IconEyeClose]: defineAsyncComponent(() => import(`@libs/components/icons`).then((c) => c.IconEyeClose)),
  [IconName.IconChartArrow]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconChartArrow)),
  [IconName.IconBoard]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconBoard)),
  [IconName.IconClock]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconClock)),
  [IconName.IconCalendar]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconCalendar)),
  [IconName.IconCalendarFill]: defineAsyncComponent(() =>
    import('@libs/components/icons').then((c) => c.IconCalendarFill),
  ),
  [IconName.IconPaperClip]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconPaperClip)),
  [IconName.IconMagnifier]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconMagnifier)),
  [IconName.IconMagnifierCross]: defineAsyncComponent(() =>
    import('@libs/components/icons').then((c) => c.IconMagnifierCross),
  ),
  [IconName.IconScroll]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconScroll)),
  [IconName.IconDocumentFill]: defineAsyncComponent(() =>
    import('@libs/components/icons').then((c) => c.IconDocumentFill),
  ),
  [IconName.IconExclamationMark]: defineAsyncComponent(() =>
    import('@libs/components/icons').then((c) => c.IconExclamationMark),
  ),
  [IconName.IconEmptyGraph]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconEmptyGraph)),
  [IconName.IconDownload]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconDownload)),
  [IconName.IconInfo]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconInfo)),
  [IconName.IconFolder]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconFolder)),
  [IconName.IconNone]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconNone)),
  [IconName.IconTable]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconTable)),
  [IconName.IconFolderArchive]: defineAsyncComponent(() =>
    import('@libs/components/icons').then((c) => c.IconFolderArchive),
  ),
  [IconName.IconBurger]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconBurger)),
  [IconName.IconSettings]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconSettings)),
  [IconName.IconParameters]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconParameters)),
  [IconName.IconMarker]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconMarker)),
  [IconName.IconKey]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconKey)),
  [IconName.IconSettingsFill]: defineAsyncComponent(() =>
    import('@libs/components/icons').then((c) => c.IconSettingsFill),
  ),
  [IconName.IconQuestionFill]: defineAsyncComponent(() =>
    import('@libs/components/icons').then((c) => c.IconQuestionFill),
  ),
  [IconName.IconClockFill]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconClockFill)),
  [IconName.IconContacts]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconContacts)),
  [IconName.IconMark]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconMark)),
  [IconName.IconLocked]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconLocked)),
  [IconName.IconRuble]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconRuble)),
  [IconName.IconFilter]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconFilter)),
  [IconName.IconArrangeAsc]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconArrangeAsc)),
  [IconName.IconArrangeDesc]: defineAsyncComponent(() =>
    import('@libs/components/icons').then((c) => c.IconArrangeDesc),
  ),
  [IconName.IconEdit]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconEdit)),
  [IconName.IconLock]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconLock)),
  [IconName.IconColumn]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconColumn)),
  [IconName.IconWasteBin]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconWasteBin)),
  [IconName.IconSuccess]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconSuccess)),
  [IconName.IconFailure]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconFailure)),
  [IconName.IconInfoColored]: defineAsyncComponent(() =>
    import('@libs/components/icons').then((c) => c.IconInfoColored),
  ),
  [IconName.IconUpdate]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconUpdate)),
  [IconName.IconMinus]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconMinus)),
  [IconName.IconQuestion]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconQuestion)),
  [IconName.IconPlusRotate]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconPlusRotate)),
  [IconName.IconTimer]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconTimer)),
  [IconName.IconLogout]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconLogout)),
  [IconName.IconPlusFillRotate]: defineAsyncComponent(() =>
    import('@libs/components/icons').then((c) => c.IconPlusFillRotate),
  ),
  [IconName.IconChart]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconChart)),
  [IconName.IconProfile]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconProfile)),
  [IconName.IconEntity]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconEntity)),
  [IconName.IconBell]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconBell)),
  [IconName.IconCrossRotate]: defineAsyncComponent(() =>
    import('@libs/components/icons').then((c) => c.IconCrossRotate),
  ),
  [IconName.IconMonitor]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconMonitor)),
  [IconName.IconDragAndDrop]: defineAsyncComponent(() =>
    import('@libs/components/icons').then((c) => c.IconDragAndDrop),
  ),
  [IconName.IconCrossColor]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconCrossColor)),
  [IconName.IconMarkerNumber]: defineAsyncComponent(() =>
    import('@libs/components/icons').then((c) => c.IconMarkerNumber),
  ),
  [IconName.IconDocumentExtension]: defineAsyncComponent(() =>
    import('@libs/components/icons').then((c) => c.IconDocumentExtension),
  ),
  [IconName.IconParentNode]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconParentNode)),
  [IconName.IconPoint]: defineAsyncComponent(() => import('@libs/components/icons').then((c) => c.IconPoint)),
  [IconName.IconEmptyDocumentList]: defineAsyncComponent(() =>
    import('@libs/components/icons').then((c) => c.IconEmptyDocumentList),
  ),
};
