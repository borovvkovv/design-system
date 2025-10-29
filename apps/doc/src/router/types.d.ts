import { RouteLocationNamedRaw, RouteRecordRaw } from 'vue-router';
import { RoutePath } from './enum';
import type { RouteNameType } from '@/router/enum/RouteName';
import { HeaderTab } from '@/components/base-header/utils/models';
import { IconName } from '@/components/icons/models';

type Modify<T, R> = Omit<T, keyof R> & R;

export type StrongNamedRouteRecordRaw = Modify<
  RouteRecordRaw,
  {
    path: RoutePath;
    name: RouteNameType;
  }
>;

export declare type LinkBase = {
  to: RouteLocationNamedRaw;
  title: string;
};

export declare interface HeaderTab extends LinkBase {
  icon: IconName;
}

export declare interface PageLink extends LinkBase {
  tabs?: HeaderTab[];
  icon: IconName;
}

export declare interface MenuLink extends LinkBase {
  description?: string;
  tabs: HeaderTab[];
}
