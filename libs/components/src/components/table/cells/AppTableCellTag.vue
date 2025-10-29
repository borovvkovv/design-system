<template>
  <BaseTag v-bind="cell.tag" />
</template>

<script setup lang="ts">
import type { TCellTag } from '@comp/components/table/utils/models';
import BaseTag from '@comp/components/tags/BaseTag.vue';

defineProps<{
  cell: TCellTag;
}>();
</script>
