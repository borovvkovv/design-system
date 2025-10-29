export interface IMenuItemParams {
  width: number;
  element: Element;
}

export interface BaseFlexibleMenuRef {
  changeCollapsedMenuVisibility: (isVisible: boolean) => void;
  isCollapsedMenuVisible: boolean;
  changeMenuContainerVisibility: (isVisible: boolean) => void;
  menuContainer: Element | undefined;
  getVisibleMenuItems: () => Element[];
  getVisibleMenuWidth: () => number;
  getCollapsedMenuWidth: () => number;
  stopResize: () => void;
  startResize: () => void;
}
