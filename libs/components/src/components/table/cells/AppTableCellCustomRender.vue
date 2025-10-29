<template><root /></template>

<script setup lang="ts">
import type { TCellCustomRender } from '@comp/components/table/utils/models';
import { computed } from 'vue';

const props = defineProps<{
  cell: TCellCustomRender;
}>();

const root = computed(() => props.cell.nodeRender);
</script>

<style scoped lang="scss"></style>
