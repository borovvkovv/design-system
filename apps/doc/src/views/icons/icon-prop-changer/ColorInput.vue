<template>
  <div>
    <InputLabel :label="label" />
    <div :class="[style.input, style.inputDefault, style.input_xs]">
      <input
        ref="el"
        :value="modelValue"
        class="w-full grow"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIMask } from 'vue-imask';
import { useCssModule, watch } from 'vue';
import { InputLabel } from '@libs/components/inputs';

defineProps<{
  label: string;
  modelValue: string | undefined;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', newValue: string | undefined): void;
}>();

const style = useCssModule();
const maskOptions = {
  mask: '{#}&&&&&&',
  lazy: true,
  definitions: {
    '&': /[0-9,A-F,a-f]/,
  },
};
const { el, masked } = useIMask(maskOptions);

watch(masked, () => {
  emit('update:modelValue', masked.value);
});
</script>

<style module lang="scss">
@use '@/assets/styles/colors.module.scss' as *;

.input {
  display: flex;
  align-items: center;
  color: $black1;
  font-size: 14px;
  line-height: 22px;
  border-width: 1px;
  border-radius: 6px;
  border-style: solid;
  padding: 12px 16px;
  margin: 0;
  width: 100%;
  box-sizing: border-box;

  &_xs {
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 16px;
    padding-right: 8px;
  }

  &.enabled {
    cursor: text;
    background-color: $white;
  }

  &Default {
    border-color: $blueGrey4;

    &.enabled:hover,
    &.enabled:focus,
    &.enabled:active {
      border-color: $blueGrey3;
    }
  }
}
</style>
