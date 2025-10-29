<template>
  <SimpleSelect
    :model-value="sizeMode"
    :options="stringSizeOptions"
    :size="Size.XS"
    :label="buttonSizePropName"
    @update:model-value="
      (newValue) => {
        sizeMode = newValue;
      }
    "
  />
</template>

<script lang="ts">
export default {
  name: 'ButtonSizeSelect',
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

type ButtonSizeProp = Exclude<IBaseButtonProps['size'], undefined>;
const buttonSizePropName: keyof Pick<IBaseButtonProps, 'size'> = 'size';
const buttonSizes: { [P in ButtonSizeProp]: P } = {
  [Size.M]: Size.M,
  [Size.S]: Size.S,
  [Size.XS]: Size.XS,
};
const stringSizeOptions: ISelectItem<ButtonSizeProp>[] = Object.values(buttonSizes).map((size) => ({
  title: size.toString(),
  value: size,
}));

const sizeMode = computed<ISelectItem<ButtonSizeProp> | undefined>({
  get() {
    return props.buttonRef
      ? {
          title: props.buttonRef.$props[buttonSizePropName]?.toString() ?? '',
          value: props.buttonRef.$props[buttonSizePropName] as ButtonSizeProp,
        }
      : undefined;
  },
  set(newValue) {
    console.log(buttonProps.value);
    buttonProps.value = {
      ...buttonProps.value,
      size: newValue?.value,
    };
    console.log(buttonProps.value);
  },
});
</script>
