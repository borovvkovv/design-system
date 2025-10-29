<template>
  <div class="flex flex-wrap items-end">
    <AppLink
      v-for="(tab, index) in tabs"
      v-slot="slotProps"
      v-bind="tab"
      :key="index"
      :link-style="LinksStyles.Style3"
      class="mr-10 shrink-0"
      is-active-by-route
      :is-active="activeTab?.to.name === tab.to.name"
    >
      <div
        :class="[
          'hover:border-b-blueGrey-4 flex items-center border-b-2 py-4',
          activeTab?.to.name === tab.to.name || slotProps.isActive ? 'border-b-blue-2' : 'border-b-grey-5',
        ]"
      >
        <div class="mr-2">
          <AppIcon :icon="tab.icon" />
        </div>
        <span>{{ tab.title }}</span>
      </div>
    </AppLink>
  </div>
</template>

<script setup lang="ts">
import type { HeaderTab } from '@/router/types';
import { AppLink } from '@libs/components/app-link';
import { LinksStyles } from '@libs/components/app-link-enums';
import { AppIcon } from '@libs/components';

defineProps<{
  tabs: HeaderTab[];
  activeTab?: HeaderTab;
}>();
</script>
