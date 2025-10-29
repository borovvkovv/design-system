<template>
  <div class="mb-2">
    <label class="text-size-5 text-grey-1 inline">
      {{ label }}
    </label>
    <AppIcon
      v-if="required"
      :icon="IconName.IconMarker"
      :size="10"
      class="text-red-3 ml-2 inline align-middle"
    />
  </div>
</template>

<script setup lang="ts">
import AppIcon from '@comp/components/AppIcon.vue';
import { IconName } from '@comp/components/icons/utils/models';

defineProps<{
  label: string;
  required?: boolean;
}>();
</script>
