export const changeCollapse = (
  element: HTMLElement | undefined,
  styleClass: string,
  isInitiallyCollapsed: boolean,
  isCollapsed: boolean,
  styles: Record<string, string>,
  changeCollapse?: (isCollapse: boolean) => void,
) => {
  const forwardStyleClass = isInitiallyCollapsed ? `${styleClass}_back` : styleClass;
  const backwardStyleClass = isInitiallyCollapsed ? styleClass : `${styleClass}_back`;

  if (!element) return;

  if (!element.classList.toggle(styles[forwardStyleClass])) {
    if (changeCollapse && isCollapsed && !isInitiallyCollapsed) {
      changeCollapse(false);
    }

    element.classList.add(styles[backwardStyleClass]);
  } else {
    if (changeCollapse && isCollapsed && isInitiallyCollapsed) {
      changeCollapse(false);
    }

    element.classList.remove(styles[backwardStyleClass]);
  }
};
