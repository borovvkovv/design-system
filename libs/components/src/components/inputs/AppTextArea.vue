<template>
  <div>
    <InputLabel
      v-if="label"
      :label="label"
      :required="required"
    />
    <textarea
      :class="[
        'w-full',
        'align-top',
        'rounded border',
        'px-4 py-5',
        'text-size-5 text-black-1',
        'placeholder-grey-2',
        'disabled:bg-grey-5',
        isError ? 'border-red-3' : 'border-blueGrey-4 hover:border-blueGrey-3 focus:border-blueGrey-3',
        'scrollbar-thin scrollbar-thumb-blueGrey-5 scrollbar-thumb-rounded hover:scrollbar-thumb-grey-4 active:scrollbar-thumb-blueGrey-3',
      ]"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="isDisabled"
      :rows="rows"
      @input="(event) => updateValue(event as InputEvent)"
    />
    <InputErrorsList
      v-if="errorList"
      :error-list="errorList"
    />
  </div>
</template>

<script setup lang="ts">
import InputErrorsList from '@comp/components/inputs/InputErrorsList.vue';
import InputLabel from '@comp/components/inputs/InputLabel.vue';
import type { IAppTextAreaProps } from '@comp/components/inputs/utils/models';

withDefaults(defineProps<IAppTextAreaProps>(), {
  placeholder: '',
  isDisabled: false,
  isError: false,
  errorList: undefined,
  rows: 5,
  label: '',
});

const emit = defineEmits<{
  (eventName: 'update:modelValue', newValue: string): void;
}>();

const updateValue = (event: InputEvent) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
};
</script>
