<template>
  <SideBarMenuLink
    v-for="(link, index) in links"
    ref="sideBarMenuLinks"
    :key="index"
    :link="link"
    :is-collapsed="isCollapsed"
    :class="index > 0 ? 'mt-1.5' : undefined"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { PageLink } from '@/router/types';
import SideBarMenuLink from '@/components/side-bar/SideBarMenuLink.vue';

defineProps<{
  isCollapsed: boolean;
  links: PageLink[];
}>();

const sideBarMenuLinks = ref();

const collapse = () => {
  sideBarMenuLinks.value?.forEach((link: any) => link.collapse());
};

defineExpose({
  collapse,
});
</script>
