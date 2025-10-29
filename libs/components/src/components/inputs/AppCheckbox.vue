<template>
  <input
    :id="notEmptyFieldId"
    :checked="modelValue ?? false"
    :disabled="isDisabled"
    :tabIndex="tabindex"
    type="checkbox"
    class="hidden"
    @input="onClick"
  />
  <label
    :for="notEmptyFieldId"
    :class="['inline-flex items-center align-top', labelColor]"
    v-bind="attrs"
  >
    <span
      :class="[
        'flex min-h-6 min-w-6 items-center justify-center rounded',
        !isDisabled && 'cursor-pointer',
        label && 'mr-2',
        borderColor,
        isTickVisible && backgroundTickColor,
      ]"
    >
      <span :class="['flex min-h-5 min-w-5 items-center justify-center', isTickVisible ? tickColor : 'opacity-0']">
        <AppIcon
          :icon="modelValue === null ? IconName.IconMinus : IconName.IconMark"
          :size="16"
          :class="inverseColor && 'text-white'"
        />
      </span>
    </span>
    {{ label }}
  </label>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { createGuid } from '@comp/utils/guid';
import AppIcon from '../AppIcon.vue';
import { IconName } from '../icons/utils/models';
import type { IAppCheckboxProps } from './utils/models';

const props = withDefaults(defineProps<IAppCheckboxProps>(), {
  label: '',
  isDisabled: false,
  isError: false,
  fieldId: '',
  tabindex: 0,
  inverseColor: false,
});

const emit = defineEmits<{
  (eventName: 'update:modelValue', newValue: boolean): void;
}>();

const onClick = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).checked);
};
const notEmptyFieldId = computed(() => (props.fieldId ? props.fieldId : createGuid()));
const attrs = useAttrs();

const isTickVisible = computed(() => props.modelValue || props.modelValue === null);
const labelColor = computed(() => (props.isDisabled ? 'text-grey-2' : 'text-black-1'));
const borderColor = computed(() =>
  props.isDisabled
    ? 'border border-blueGrey-4'
    : props.isError
      ? 'border border-red-3 hover:border-red-2'
      : 'border border-blueGrey-4 hover:border-blueGrey-3',
);

const tickColor = computed(() =>
  props.inverseColor
    ? 'text-white'
    : props.isDisabled
      ? 'text-blueGrey-3'
      : props.isError
        ? 'text-red-3 hover:text-red-2'
        : 'text-blue-2 hover:text-darkBlue-4',
);

const backgroundTickColor = computed(() =>
  !props.inverseColor
    ? ''
    : props.isDisabled
      ? 'bg-blueGrey-3'
      : props.isError
        ? 'bg-red-3 hover:bg-red-2'
        : 'bg-blue-2 hover:bg-darkBlue-4',
);
</script>
