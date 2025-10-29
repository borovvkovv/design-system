import type { BaseHeaderProps } from '@/components/base-header/utils/models';
import type { RouteNameType } from '@/router/enum/RouteName';
import { menuLinks } from '../links';
import { computed, type ComputedRef } from 'vue';

export const useDesignSystemRoutes = (linkRouteName: RouteNameType): ComputedRef<BaseHeaderProps | undefined> => {
  const availableRouteLink = computed(() => menuLinks.value.find((link) => link.to.name === linkRouteName));
  const header = computed(() =>
    availableRouteLink.value
      ? {
          title: availableRouteLink.value.title,
          breadCrumbs:
            menuLinks.value[0] === availableRouteLink.value
              ? [menuLinks.value[0]]
              : [menuLinks.value[0], availableRouteLink.value],
          tabs: availableRouteLink.value.tabs,
        }
      : undefined,
  );

  return header;
};
