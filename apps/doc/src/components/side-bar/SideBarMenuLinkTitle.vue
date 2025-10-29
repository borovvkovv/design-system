<template>
  <div>
    <AppLink
      :to="getLink(link)"
      :class="[
        'group relative rounded',
        'px-3 py-2',
        'flex w-full items-center gap-x-4',
        'border border-transparent',
        isCurrentLink ? 'bg-blue-2' : 'hover:border-black-1/10 hover:bg-grey-5/10',
      ]"
      @mouseenter="(evt: MouseEvent) => sideBarMenuLinkTitlePopup?.showPopup(evt)"
      @mouseleave="() => sideBarMenuLinkTitlePopup?.closePopup()"
    >
      <div class="min-h-5.5 grow">
        <h5
          v-if="!isCollapsed"
          ref="linkTitle"
          class="ml-9 text-left text-white"
        >
          {{ link.title }}
        </h5>
      </div>
      <AppIcon
        v-if="isLinkContainsTabs && !isCollapsed"
        :icon="isDropDownShown ? IconName.IconArrowUpTriangle : IconName.IconArrowDownTriangle"
        :size="16"
        :class="['shrink-0 group-hover:text-white', isDropDownShown ? 'text-blue-5' : 'text-blueGrey-1']"
      />
    </AppLink>
    <SideBarMenuLinkTitlePopup
      v-if="isCollapsed"
      ref="sideBarMenuLinkTitlePopup"
      :text="link.title"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { PageLink } from '@/router/types';
import type { RouteLocationNamedRaw } from 'vue-router';
import { AppIcon } from '@libs/components';
import { AppLink } from '@libs/components/app-link';
import { IconName } from '@libs/components/icons-enums';
import SideBarMenuLinkTitlePopup from '@/components/side-bar/SideBarMenuLinkTitlePopup.vue';

const props = defineProps<{
  link: PageLink;
  isCurrentLink: boolean;
  isDropDownShown: boolean;
  isCollapsed?: boolean;
}>();

const linkTitle = ref<HTMLElement | undefined>();
const isLinkContainsTabs = computed(() => props.link.tabs?.length);
const sideBarMenuLinkTitlePopup = ref();

const getLink = (link: PageLink): RouteLocationNamedRaw | undefined => {
  if (isLinkContainsTabs.value) {
    if (props.isCollapsed) {
      return link.tabs?.[0].to;
    }

    return undefined;
  }
  return link.to;
};
</script>
