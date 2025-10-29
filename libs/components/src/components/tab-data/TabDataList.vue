<template>
  <AppLink
    v-for="option in options"
    :key="option.value"
    :link-style="LinksStyles.Style3"
    :is-active="option.value === modelValue.value"
    class="mr-8"
    @click="() => onSelect(option)"
  >
    {{ option.title }}
  </AppLink>
</template>

<script setup lang="ts">
import type { ISelectItem } from '@comp/components/selects/utils/models';
import AppLink from '@comp/components/app-link/AppLink.vue';
import { LinksStyles } from '@comp/components/app-link/utils/models';

defineProps<{
  modelValue: ISelectItem;
  options: ISelectItem[];
}>();

const emit = defineEmits<{
  (eventName: 'update:modelValue', newValue: ISelectItem): void;
}>();

const onSelect = (item: ISelectItem) => {
  emit('update:modelValue', item);
};
</script>
