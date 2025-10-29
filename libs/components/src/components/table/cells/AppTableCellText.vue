<template>
  <AppTableText
    :text="cell.text"
    :pattern="cell.pattern"
    :max-lines="cell.maxLines"
  />
</template>

<script setup lang="ts">
import type { TCellText } from '@comp/components/table/utils/models';
import AppTableText from './AppTableText.vue';

defineProps<{
  cell: TCellText;
}>();
</script>
