<template>
  <BaseSimpleInput
    v-model="model"
    :type="InputType.Text"
    :icon-left="IconName.IconMagnifier"
    :placeholder="placeholder"
    :size="size"
    :label="label"
    :is-disabled="disabled"
    :min-width="minWidth"
    @change:model-value="(value) => emit('change:modelValue', value)"
  />
</template>

<script setup lang="ts">
import BaseSimpleInput from '@comp/components/inputs/BaseSimpleInput.vue';
import { InputType, type IBaseSearchInputProps } from './utils/models';
import { Size } from '@comp/enums';
import { computed } from 'vue';
import { IconName } from '@comp/components/icons/utils/models';

const props = withDefaults(defineProps<IBaseSearchInputProps>(), {
  placeholder: 'Поиск',
  size: Size.S,
  label: undefined,
  disabled: false,
  minWidth: undefined,
});

const emit = defineEmits<{
  (eventName: 'update:modelValue', newValue: string): void;
  (eventName: 'change:modelValue', newValue: string): void;
}>();

const model = computed({
  get(): string {
    return props.modelValue;
  },
  set(newValue: string): void {
    emit('update:modelValue', newValue);
  },
});
</script>
