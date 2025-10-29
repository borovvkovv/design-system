<template>
  <span class="flex items-center">
    Еще
    <IconArrowUpTriangle
      v-if="isOpened"
      class="text-blueGrey-2 ml-1"
    />
    <IconArrowDownTriangle
      v-else
      class="text-blueGrey-2 ml-1"
    />
  </span>
</template>

<script setup lang="ts">
import IconArrowUpTriangle from '@comp/components/icons/IconArrowUpTriangle.vue';
import IconArrowDownTriangle from '@comp/components/icons/IconArrowDownTriangle.vue';

defineProps<{
  isOpened: boolean;
}>();
</script>
