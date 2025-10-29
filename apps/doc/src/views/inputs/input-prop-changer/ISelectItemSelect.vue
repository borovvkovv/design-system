<template>
  <SimpleSelect
    v-model="modelValue"
    :options
    :size="Size.XS"
    :label
  />
</template>

<script lang="ts">
export default {
  name: 'ISelectItemSelect',
};
</script>

<script setup lang="ts">
import { Size } from '@libs/components/enums';
import type { ISelectItem } from '@libs/components/selects-types';
import { SimpleSelect } from '@libs/components/selects';

const modelValue = defineModel<ISelectItem>();

defineProps<{
  options: Array<ISelectItem>;
  label: string;
}>();
</script>
