<template>
  <AppTableCellWithOverflow
    v-if="isCellWithOverflow"
    :items="chars"
    :popup-text="text"
    :max-lines="maxLines"
  >
    <template #default="{ visibleItems }">
      <AppTableTextWithSearch
        :text="visibleItems.join('')"
        :pattern="pattern"
        split-to-chars
      />
    </template>
  </AppTableCellWithOverflow>
  <AppTableTextWithSearch
    v-else
    :text="text"
    :pattern="pattern"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AppTableCellWithOverflow from './AppTableCellWithOverflow.vue';
import AppTableTextWithSearch from './AppTableTextWithSearch.vue';

const props = defineProps<{
  text: string;
  pattern?: string;
  maxLines?: number;
}>();

const isCellWithOverflow = computed(() => props.maxLines !== undefined);
const chars = computed(() => props.text.split(''));
</script>
