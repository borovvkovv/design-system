import type { RouteLocationRaw, RouterLinkProps } from 'vue-router';

export enum LinksStyles {
  Style1 = 'Style1',
  Style2 = 'Style2',
  Style3 = 'Style3',
  Style4 = 'Style4',
  Style5 = 'Style5',
  Style6 = 'Style6',
  Style7 = 'Style7',
  Style8 = 'Style8',
  Style9 = 'Style9',
  Style10 = 'Style10',
}

export interface ILinkProps extends /* @vue-ignore */ Omit<RouterLinkProps, 'to'> {
  isActive?: boolean;
  isActiveByRoute?: boolean;
  isDisabled?: boolean;
  linkStyle?: LinksStyles;
  to?: RouteLocationRaw;
  downloadFileName?: string;
  isDownloadFile?: boolean;
}
