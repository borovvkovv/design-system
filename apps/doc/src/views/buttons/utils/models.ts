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
