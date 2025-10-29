<template>
  <IconCross20
    v-if="size <= 20"
    :size="size"
  />
  <IconCross24
    v-else
    :size="size"
  />
</template>

<script setup lang="ts">
import IconCross20 from '@comp/components/icons/IconCross20.vue';
import IconCross24 from '@comp/components/icons/IconCross24.vue';
import type { IconBase } from './utils/models';

withDefaults(defineProps<IconBase>(), { size: 20 });
</script>
