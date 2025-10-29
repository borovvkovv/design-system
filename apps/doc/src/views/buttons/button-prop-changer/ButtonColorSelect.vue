<template>
  <SimpleSelect
    :model-value="color"
    :options="buttonColorOptions"
    :size="Size.XS"
    :label="buttonColorPropName"
    @update:model-value="
      (newValue) => {
        color = newValue;
      }
    "
  />
</template>

<script lang="ts">
export default {
  name: 'ButtonColorSelect',
};
</script>

<script setup lang="ts">
import { computed, type ComponentInstance } from 'vue';
import { Size } from '@libs/components/enums';
import { AppColor } from '@libs/components/enums';
import type { IBaseButtonProps } from '@libs/components/buttons-types';
import { SimpleSelect } from '@libs/components/selects';
import type { ISelectItem } from '@libs/components/selects-types';

const buttonProps = defineModel<IBaseButtonProps>();
const props = defineProps<{
  buttonRef: ComponentInstance<any> | undefined;
}>();

type ButtonColorProp = Exclude<IBaseButtonProps['color'], undefined>;
const buttonColorPropName: keyof Pick<IBaseButtonProps, 'color'> = 'color';
const buttonColors: { [P in ButtonColorProp]: P } = {
  [AppColor.DarkBlue]: AppColor.DarkBlue,
  [AppColor.Blue]: AppColor.Blue,
  [AppColor.Grey]: AppColor.Grey,
  [AppColor.Red]: AppColor.Red,
};
const buttonColorOptions: ISelectItem<ButtonColorProp>[] = Object.values(buttonColors).map((color) => ({
  title: color.toString(),
  value: color,
}));

const color = computed<ISelectItem<ButtonColorProp> | undefined>({
  get() {
    return props.buttonRef
      ? {
          title: props.buttonRef.$props[buttonColorPropName]?.toString() ?? '',
          value: props.buttonRef.$props[buttonColorPropName] as ButtonColorProp,
        }
      : undefined;
  },
  set(newValue) {
    buttonProps.value = {
      ...buttonProps.value,
      color: newValue?.value,
    };
  },
});
</script>
