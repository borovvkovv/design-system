<template>
  <BaseInput
    v-bind="modelInput"
    v-model="localModelInputValue"
    @blur="() => updateModel(localModelInputValue)"
  />
</template>

<script setup lang="ts">
import type { TCellInput } from '@comp/components/table/utils/models';
import BaseInput from '@comp/components/inputs/BaseInput.vue';
import { computed, ref, watch } from 'vue';

const props = defineProps<{
  modelValue: TCellInput;
}>();

const emit = defineEmits<{
  (eventName: 'update:modelValue', newValue: TCellInput): void;
}>();

const modelInput = computed(() => (props.modelValue.type === 'input' ? props.modelValue.input : undefined));
const localModelInputValue = ref(modelInput.value?.modelValue ?? '');

const updateModel = (newValue: string | undefined): void => {
  emit('update:modelValue', {
    ...props.modelValue,
    type: 'input',
    input: {
      ...modelInput.value,
      modelValue: newValue ?? '',
    },
  });
};
watch(
  () => modelInput.value,
  () => (localModelInputValue.value = modelInput.value?.modelValue ?? ''),
);
</script>
