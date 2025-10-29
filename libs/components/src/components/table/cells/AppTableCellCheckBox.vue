<template>
  <AppCheckbox v-model="model" />
</template>

<script setup lang="ts">
import type { TCellCheckBox } from '@comp/components/table/utils/models';
import AppCheckbox from '@comp/components/inputs/AppCheckbox.vue';
import { computed } from 'vue';

const props = defineProps<{
  modelValue: TCellCheckBox;
}>();

const emit = defineEmits<{
  (eventName: 'update:modelValue', newValue: TCellCheckBox): void;
}>();

const model = computed<boolean | null>({
  get() {
    return props.modelValue.isChecked;
  },
  set(isChecked): void {
    emit('update:modelValue', {
      ...props.modelValue,
      isChecked,
    });
  },
});
</script>
