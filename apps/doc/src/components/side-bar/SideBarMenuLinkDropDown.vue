<template>
  <div :class="['flex flex-col gap-y-1.5', 'pt-4.5 pb-3.5']">
    <div
      v-for="(tab, index) in tabs"
      :key="index"
      class="flex items-center gap-x-4 px-3"
    >
      <AppIcon
        :icon="IconName.IconNone"
        class="shrink-0 text-white"
      />
      <AppLink :to="tab.to">
        <span
          :class="[
            'text-size-5 text-left text-white',
            isCurrentTab(tab) ? 'border-b-blue-2' : 'border-b-transparent',
            'hover:border-b-blue-2 inline-block border-b-2',
          ]"
        >
          {{ tab.title }}
        </span>
      </AppLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HeaderTab } from '@/router/types';
import { AppIcon } from '@libs/components';
import { AppLink } from '@libs/components/app-link';
import { IconName } from '@libs/components/icons-enums';

defineProps<{
  tabs: HeaderTab[];
  isCurrentTab: (tab: HeaderTab) => boolean;
}>();
</script>
