import type { Size } from '@comp/enums';

export interface IconBase {
  size?: number;
}

export interface IconWithAnimation extends IconBase {
  animate?: boolean;
  delay?: number;
}

export interface IconWithColor extends IconBase {
  fill?: string;
  stroke?: string;
}

export interface IconBellProps extends IconBase {
  indicated?: boolean;
}

export interface IconDocumentExtensionProps {
  size: Size.M | Size.S;
  extension: string;
}

export interface IconMarkerNumberProps extends IconBase {
  number?: number;
  fontSize?: string;
  fontWeight?: number;
  fill?: string;
}

export const enum IconName {
  IconArrowDown = 'IconArrowDown',
  IconArrangeAsc = 'IconArrangeAsc',
  IconArrangeDesc = 'IconArrangeDesc',
  IconArrowDownTriangle = 'IconArrowDownTriangle',
  IconArrowLeft = 'IconArrowLeft',
  IconArrowLeftThin = 'IconArrowLeftThin',
  IconArrowRight = 'IconArrowRight',
  IconArrowRightThin = 'IconArrowRightThin',
  IconArrowUp = 'IconArrowUp',
  IconArrowUpTriangle = 'IconArrowUpTriangle',
  IconBell = 'IconBell',
  IconBoard = 'IconBoard',
  IconBurger = 'IconBurger',
  IconCalendar = 'IconCalendar',
  IconCalendarFill = 'IconCalendarFill',
  IconChart = 'IconChart',
  IconChartArrow = 'IconChartArrow',
  IconClock = 'IconClock',
  IconClockFill = 'IconClockFill',
  IconColumn = 'IconColumn',
  IconContacts = 'IconContacts',
  IconCross = 'IconCross',
  IconCrossColor = 'IconCrossColor',
  IconCrossRotate = 'IconCrossRotate',
  IconDocumentExtension = 'IconDocumentExtension',
  IconDocumentFill = 'IconDocumentFill',
  IconDownload = 'IconDownload',
  IconDragAndDrop = 'IconDragAndDrop',
  IconEdit = 'IconEdit',
  IconEmptyGraph = 'IconEmptyGraph',
  IconEntity = 'IconEntity',
  IconExclamationMark = 'IconExclamationMark',
  IconEyeClose = 'IconEyeClose',
  IconEyeOpen = 'IconEyeOpen',
  IconFailure = 'IconFailure',
  IconFilter = 'IconFilter',
  IconFolder = 'IconFolder',
  IconFolderArchive = 'IconFolderArchive',
  IconInfo = 'IconInfo',
  IconInfoColored = 'IconInfoColored',
  IconKey = 'IconKey',
  IconLoading = 'IconLoading',
  IconLock = 'IconLock',
  IconLocked = 'IconLocked',
  IconLogout = 'IconLogout',
  IconMagnifier = 'IconMagnifier',
  IconMagnifierCross = 'IconMagnifierCross',
  IconMark = 'IconMark',
  IconMarker = 'IconMarker',
  IconMarkerNumber = 'IconMarkerNumber',
  IconMinus = 'IconMinus',
  IconMonitor = 'IconMonitor',
  IconNone = 'IconNone',
  IconPaperClip = 'IconPaperClip',
  IconParameters = 'IconParameters',
  IconPlus = 'IconPlus',
  IconPlusFillRotate = 'IconPlusFillRotate',
  IconPlusRotate = 'IconPlusRotate',
  IconProfile = 'IconProfile',
  IconQuestion = 'IconQuestion',
  IconQuestionFill = 'IconQuestionFill',
  IconRuble = 'IconRuble',
  IconScroll = 'IconScroll',
  IconSettings = 'IconSettings',
  IconSettingsFill = 'IconSettingsFill',
  IconSuccess = 'IconSuccess',
  IconTable = 'IconTable',
  IconTimer = 'IconTimer',
  IconUpdate = 'IconUpdate',
  IconWasteBin = 'IconWasteBin',
  IconParentNode = 'IconParentNode',
  IconPoint = 'IconPoint',
  IconEmptyDocumentList = 'IconEmptyDocumentList',
}
