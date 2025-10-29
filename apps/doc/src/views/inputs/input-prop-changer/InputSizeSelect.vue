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
  name: 'InputSizeSelect',
};
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { Size } from '@libs/components/enums';
import type { ISelectItem } from '@libs/components/selects-types';
import { SimpleSelect } from '@libs/components/selects';
import type { IBaseInput } from '@libs/components/inputs-types';

const buttonProps = defineModel<ButtonSizeProp>();

type ButtonSizeProp = Exclude<IBaseInput['size'], undefined>;
const buttonSizePropName: keyof Pick<IBaseInput, 'size'> = 'size';
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
    return buttonProps.value
      ? {
          title: buttonProps.value?.toString() ?? '',
          value: buttonProps.value,
        }
      : undefined;
  },
  set(newValue) {
    buttonProps.value = newValue?.value;
  },
});
</script>
