import type { HeaderTab } from '@/router/types';
import type { RouteLocationRaw } from 'vue-router';

export declare type BaseHeaderProps = {
  title: string;
  breadCrumbs: LinkBase[];
  tabs?: HeaderTab[];
};

export declare type MainModalsMethods = {
  openModal: () => void;
  closeModal: () => void;
  modalContainer?: HTMLElement;
};

export declare type LinkBase = {
  to: RouteLocationRaw;
  title: string;
};
