<template>
  <SimpleSelect
    :model-value="type"
    :options="buttonTypeOptions"
    :size="Size.XS"
    :label="buttonTypePropName"
    @update:model-value="
      (newValue) => {
        type = newValue;
      }
    "
  />
</template>

<script lang="ts">
export default {
  name: 'ButtonTypeSelect',
};
</script>

<script setup lang="ts">
import { computed, type ComponentInstance } from 'vue';
import { Size } from '@libs/components/enums';
import { SimpleSelect } from '@libs/components/selects';
import type { ISelectItem } from '@libs/components/selects-types';
import type { IBaseButtonProps } from '@libs/components/buttons-types';

const buttonProps = defineModel<IBaseButtonProps>();
const props = defineProps<{
  buttonRef: ComponentInstance<any> | undefined;
}>();

type ButtonTypeProp = Exclude<IBaseButtonProps['type'], undefined>;
const buttonTypePropName: keyof Pick<IBaseButtonProps, 'type'> = 'type';
const buttonTypes: { [P in ButtonTypeProp]: P } = {
  button: 'button',
  reset: 'reset',
  submit: 'submit',
};
const buttonTypeOptions: ISelectItem<ButtonTypeProp>[] = Object.values(buttonTypes).map((color) => ({
  title: color.toString(),
  value: color,
}));

const type = computed<ISelectItem<ButtonTypeProp> | undefined>({
  get() {
    return props.buttonRef
      ? {
          title: props.buttonRef.$props[buttonTypePropName]?.toString() ?? '',
          value: props.buttonRef.$props[buttonTypePropName] as ButtonTypeProp,
        }
      : undefined;
  },
  set(newValue) {
    buttonProps.value = {
      ...buttonProps.value,
      type: newValue?.value,
    };
  },
});
</script>
