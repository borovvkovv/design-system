<template>
  <BaseHeaderBreadCrumbs :routes="breadCrumbsWithTab" />
  <h1 :class="['text-black-1 mt-2', tabs ? 'pb-14' : 'pb-8']">{{ title }}</h1>
  <BaseHeaderTabs
    v-if="tabs"
    :tabs="tabs"
    :active-tab="activeTab"
  />
</template>

<script setup lang="ts">
import type { BaseHeaderProps } from '@/components/base-header/utils/models';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BaseHeaderTabs from './BaseHeaderTabs.vue';
import BaseHeaderBreadCrumbs from './BaseHeaderBreadCrumbs.vue';

const props = defineProps<BaseHeaderProps>();
const route = useRoute();
const router = useRouter();

const activeTab = computed(() => props.tabs?.find((tab) => tab.to && router.resolve(tab.to).name === route.name));

const breadCrumbsWithTab = computed(() => {
  const resultBreadCrumbs = [...props.breadCrumbs];
  const activeTabValue = activeTab.value;
  if (activeTabValue) {
    resultBreadCrumbs.push(activeTabValue);
  }

  return resultBreadCrumbs;
});
</script>
