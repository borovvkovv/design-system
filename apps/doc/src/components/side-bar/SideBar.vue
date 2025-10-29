<template>
  <div
    ref="sideBarWrapper"
    :class="['h-full overflow-clip', isInitiallyCollapsed ? 'w-15' : 'w-65']"
  >
    <aside
      :class="[
        'h-full',
        'flex flex-col',
        'scrollbar-y-thin scrollbar scrollbar-track-grey-5 scrollbar-thumb-blueGrey-5 scrollbar-thumb-rounded scrollbar-w-1 scrollbar-h-2 hover:scrollbar-thumb-grey-4 active:scrollbar-thumb-blueGrey-3 overflow-y-auto overflow-x-clip',
        isCollapsed ? 'w-15' : 'w-65',
      ]"
    >
      <div class="sticky top-0 z-20">
        <SideBarLogo
          ref="sideBarLogo"
          :is-initially-collapsed="isInitiallyCollapsed"
          :is-collapsed="isCollapsed"
          class="w-65"
        />
      </div>
      <div
        ref="sideBarMenuContainer"
        :class="['bg-darkBlue-2 grow', 'flex flex-col', 'px-2', isInitiallyCollapsed ? 'pt-13' : 'pt-8']"
      >
        <AppLink :to="'/main'" />
        <SideBarMenu
          ref="sideBarMenu"
          :is-collapsed="isCollapsed"
          :links="links"
        />
        <div class="bg-darkBlue-2 sticky bottom-0 mt-auto w-full">
          <SideBarLanguageSwitcher
            :is-side-bar-collapsed="isCollapsed"
            class="w-full"
          />
          <SideBarCollapseButton
            ref="sideBarCollapseButton"
            :is-collapsed="isCollapsed"
            :is-initially-collapsed="isInitiallyCollapsed"
            @click:collapse="onCollapseClickHandler"
          />
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, useCssModule } from 'vue';
import SideBarMenu from '@/components/side-bar/SideBarMenu.vue';
import SideBarCollapseButton from '@/components/side-bar/SideBarCollapseButton.vue';
import SideBarLanguageSwitcher from '@/components/side-bar/SideBarLanguageSwitcher.vue';
import SideBarLogo from '@/components/side-bar/SideBarLogo.vue';
import { SIDE_BAR_ANIMATION_DURATION_MS } from '@/components/side-bar/utils/models';
import { changeCollapse } from './utils';
import type { PageLink } from '@/router/types';
import { AppLink } from '@libs/components/app-link';

const props = withDefaults(
  defineProps<{
    isInitiallyCollapsed?: boolean;
    links: PageLink[];
  }>(),
  {
    isInitiallyCollapsed: true,
  },
);

const isCollapsed = ref<boolean>(props.isInitiallyCollapsed);
const styles = useCssModule();
const sideBarWrapper = ref<HTMLElement | undefined>();
const sideBarMenuContainer = ref<HTMLElement | undefined>();
const sideBarMenu = ref();
const sideBarCollapseButton = ref();
const sideBarLogo = ref();

const onCollapseClickHandler = () => {
  sideBarMenu.value?.collapse();
  sideBarCollapseButton.value?.collapse();
  sideBarLogo.value?.collapse();

  changeCollapse(
    sideBarMenuContainer.value,
    'collapse_menu_container',
    props.isInitiallyCollapsed,
    isCollapsed.value,
    styles,
  );

  changeCollapse(
    sideBarWrapper.value,
    'collapse',
    props.isInitiallyCollapsed,
    isCollapsed.value,
    styles,
    (isCollapsedLocal) => (isCollapsed.value = isCollapsedLocal),
  );
};

onMounted(() => {
  sideBarWrapper.value?.addEventListener('transitionend', (e) => {
    if (e.target === sideBarWrapper.value) {
      isCollapsed.value = sideBarWrapper.value?.classList.contains(styles.collapse) ?? false;
    }
  });
});
</script>

<style module lang="scss">
.collapse {
  transition: all v-bind('`${SIDE_BAR_ANIMATION_DURATION_MS}ms`');
  @apply w-15;
}

.collapse_back {
  transition: all v-bind('`${SIDE_BAR_ANIMATION_DURATION_MS}ms`');
  @apply w-65;
}

.collapse_menu_container {
  transition: all v-bind('`${SIDE_BAR_ANIMATION_DURATION_MS}ms`');
  @apply pt-13;
}

.collapse_menu_container_back {
  transition: all v-bind('`${SIDE_BAR_ANIMATION_DURATION_MS}ms`');
  @apply pt-8;
}
</style>
