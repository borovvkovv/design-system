<template>
  <TextButton
    v-for="(button, i) in cellButtons"
    :key="i"
    :text="button.text"
    :color="button.color"
    :size="button.size"
    :is-disabled="button.isDisabled"
    :is-loading="button.isLoading"
    :type="button.type"
    @button-click="button.click"
  />
</template>

<script setup lang="ts">
import type { TCellButton } from '@comp/components/table/utils/models';
import TextButton from '@comp/components/buttons/TextButton.vue';

defineProps<{
  cellButtons: TCellButton[];
}>();
</script>
