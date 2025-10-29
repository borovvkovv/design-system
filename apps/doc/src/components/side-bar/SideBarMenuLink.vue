<template>
  <div class="relative">
    <BaseSimpleDropDown
      v-if="isLinkContainsTabs && !isCollapsed"
      ref="baseSimpleDropDown"
    >
      <template #title="{ isDropDownShown }">
        <SideBarMenuLinkTitle
          :link="link"
          :is-drop-down-shown="isDropDownShown"
          :is-current-link="isCurrentLink"
          :is-collapsed="isCollapsed"
        />
      </template>
      <template #dropDown>
        <SideBarMenuLinkDropDown
          :tabs="link.tabs ?? []"
          :is-current-tab="isCurrentTab"
        />
      </template>
    </BaseSimpleDropDown>
    <SideBarMenuLinkTitle
      v-else
      :link="link"
      :is-drop-down-shown="false"
      :is-current-link="isCurrentLink"
      :is-collapsed="isCollapsed"
    />
    <AppIcon
      :icon="link.icon ?? IconName.IconNone"
      :class="['pointer-events-none absolute top-2.5 text-white', isCollapsed ? 'left-1/2 -translate-x-1/2' : 'left-3']"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import router from '@/router';
import type { RouteLocationMatched } from 'vue-router';
import type { HeaderTab, PageLink } from '@/router/types';
import SideBarMenuLinkDropDown from '@/components/side-bar/SideBarMenuLinkDropDown.vue';
import SideBarMenuLinkTitle from '@/components/side-bar/SideBarMenuLinkTitle.vue';
import { BaseSimpleDropDown } from '@libs/components/selects';
import { IconName } from '@libs/components/icons-enums';
import { AppIcon } from '@libs/components';
import { pagesLinks } from '@/router/links';

const props = defineProps<{
  link: PageLink;
  isCollapsed: boolean;
}>();

const coreLink = computed(() =>
  pagesLinks.value.find(
    (portalLink) =>
      portalLink.to.name === props.link.to.name ||
      portalLink.tabs?.filter((tab) => tab.to.name === props.link.to.name).length,
  ),
);
const isLinkContainsTabs = computed(() => props.link.tabs?.length);
const matchedRouteLocation = computed<RouteLocationMatched[]>(() => router.currentRoute.value.matched);
const currentRouteName = computed(() => matchedRouteLocation.value[1]?.name);
const isCurrentLink = computed(
  () =>
    currentRouteName.value === coreLink.value?.to.name ||
    coreLink.value?.tabs?.find((tab) => tab.to.name === currentRouteName.value) !== undefined,
);
const isCurrentTab = (tab: HeaderTab) => isCurrentLink.value && currentRouteName.value === tab.to.name;
const baseSimpleDropDown = ref();

const collapse = () => {
  baseSimpleDropDown.value?.setDropDownVisibility(false);
};

defineExpose({
  collapse,
});
</script>
