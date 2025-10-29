<template>
  <AppCheckbox
    v-model="isDisabled"
    :label="buttonIsDisabledPropName"
  />
</template>

<script lang="ts">
export default {
  name: 'ButtonDisabledCheckbox',
};
</script>

<script setup lang="ts">
import { AppCheckbox } from '@libs/components/inputs';
import type { IBaseButtonProps } from '@libs/components/buttons-types';
import { computed, type ComponentInstance } from 'vue';

const buttonProps = defineModel<IBaseButtonProps>();
const props = defineProps<{
  buttonRef: ComponentInstance<any> | undefined;
}>();

const buttonIsDisabledPropName: keyof Pick<IBaseButtonProps, 'isDisabled'> = 'isDisabled';

const isDisabled = computed<boolean>({
  get() {
    return props.buttonRef?.$props[buttonIsDisabledPropName] ?? false;
  },
  set(newValue) {
    buttonProps.value = {
      ...buttonProps.value,
      isDisabled: newValue,
    };
  },
});
</script>
