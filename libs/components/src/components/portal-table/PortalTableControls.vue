<template>
  <div class="flex gap-x-3 p-5">
    <BaseSearchInput
      :model-value="pattern"
      :placeholder="patternPlaceholder"
      :size="Size.S"
      class="grow"
      @update:model-value="onPatternUpdateHandler"
      @change:model-value="onPatternChangeHandler"
    />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { Size } from '@comp/enums';
import { useDebounce } from '@comp/utils/useDebounce';
import BaseSearchInput from '@comp/components/inputs/BaseSearchInput.vue';

const props = defineProps<{
  pattern: string;
  patternPlaceholder?: string;
}>();

const emit = defineEmits<{
  (eventName: 'update:pattern', pattern: string): void;
}>();

const SEARCH_UPDATE_DELAY_MS = 500;
const onPatternUpdateHandler = useDebounce(SEARCH_UPDATE_DELAY_MS, (newPattern: string) => {
  if (props.pattern !== newPattern) emit('update:pattern', newPattern);
});

const onPatternChangeHandler = (newPattern: string) => {
  if (props.pattern !== newPattern) emit('update:pattern', newPattern);
};
</script>
