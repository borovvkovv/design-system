<template>
  <SearchResultSpan
    :text="cell.text"
    :pattern="cell.pattern"
    :color-type="TextColorType.BackGround"
  />
</template>

<script setup lang="ts">
import type { TCellSearchSpan } from '@comp/components/table/utils/models';
import { TextColorType } from '@comp/components/selects/utils/models';
import SearchResultSpan from '@comp/components/selects/SearchResultSpan.vue';

defineProps<{
  cell: TCellSearchSpan;
}>();
</script>
