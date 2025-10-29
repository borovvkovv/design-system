<template>
  <AppIcon
    :icon="cell.icon"
    :size="cell.size"
    :class="[cell.modifier?.other]"
  />
</template>

<script setup lang="ts">
import AppIcon from '@comp/components/AppIcon.vue';
import type { TCellIcon } from '@comp/components/table/utils/models';

defineProps<{
  cell: TCellIcon;
}>();
</script>
