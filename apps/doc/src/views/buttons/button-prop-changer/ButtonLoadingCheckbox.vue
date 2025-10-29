<template>
  <AppCheckbox
    v-model="isLoading"
    :label="buttonisLoadingPropName"
  />
</template>

<script lang="ts">
export default {
  name: 'ButtonLoadingCheckbox',
};
</script>

<script setup lang="ts">
import { computed, type ComponentInstance } from 'vue';
import type { IBaseButtonProps } from '@libs/components/buttons-types';
import { AppCheckbox } from '@libs/components/inputs';

const buttonProps = defineModel<IBaseButtonProps>();
const props = defineProps<{
  buttonRef: ComponentInstance<any> | undefined;
}>();

const buttonisLoadingPropName: keyof Pick<IBaseButtonProps, 'isLoading'> = 'isLoading';

const isLoading = computed<boolean>({
  get() {
    return props.buttonRef?.$props[buttonisLoadingPropName] ?? false;
  },
  set(newValue) {
    buttonProps.value = {
      ...buttonProps.value,
      isLoading: newValue,
    };
  },
});
</script>
