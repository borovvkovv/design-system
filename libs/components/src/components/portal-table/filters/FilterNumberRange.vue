<template>
  <div class="flex items-center gap-x-2">
    <BaseInput
      v-model="minValueAsString"
      :icon-right="measureIconParams"
      :size="Size.S"
      :is-error="validator.$error"
    />
    <span class="text-size-5 text-black-1">&ndash;</span>
    <BaseInput
      v-model="maxValueAsString"
      :icon-right="measureIconParams"
      :size="Size.S"
      :is-error="validator.$error"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate, type ValidationArgs } from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';
import { stringToNumber } from '@comp/utils/number';
import { Size } from '@comp/enums';
import type { IClickableIcon } from '@comp/components/inputs/utils/models';
import BaseInput from '@comp/components/inputs/BaseInput.vue';
import { getInitialNumberRangeForm, getNumberRangeFromUrl } from '../utils/filterNumberRangeUtils';
import type {
  ColumnFilterNumberRangeForm,
  IPortalTableFilterRef,
  IPortalTableFilterProps,
  TColumnControlFilterNumberRange,
  QueryParam,
} from '../utils/models';

const props = defineProps<IPortalTableFilterProps<TColumnControlFilterNumberRange>>();

const router = useRouter();
const measureIconParams = computed<IClickableIcon | undefined>(() =>
  props.columnControl.measureIconName
    ? {
        iconName: props.columnControl.measureIconName,
        size: 10,
      }
    : undefined,
);

const form = reactive<ColumnFilterNumberRangeForm>(getNumberRangeFromUrl(router, props.columnControl));

const rules: ValidationArgs<ColumnFilterNumberRangeForm> = {
  minValue: helpers.withMessage(
    'order',
    () =>
      (form.minValue !== undefined && form.maxValue !== undefined && form.minValue <= form.maxValue) ||
      !form.minValue ||
      !form.maxValue,
  ),
  maxValue: {},
};
const validator = useVuelidate(rules, form);
const isValidationError = computed(() => validator.value.$error);

const minValueAsString = computed<string>({
  get() {
    return form.minValue?.toString() ?? '';
  },
  set(newValue): void {
    form.minValue = stringToNumber(newValue);
  },
});

const maxValueAsString = computed<string>({
  get() {
    return form.maxValue?.toString() ?? '';
  },
  set(newValue): void {
    form.maxValue = stringToNumber(newValue);
  },
});

const reset = () => {
  form.minValue = getNumberRangeFromUrl(router, props.columnControl).minValue;
  form.maxValue = getNumberRangeFromUrl(router, props.columnControl).maxValue;
};
const clear = () => Object.assign(form, getInitialNumberRangeForm());

const getQueryParam = (): QueryParam[] => [
  {
    key: props.columnControl.minValueName,
    value: form.minValue,
  },
  {
    key: props.columnControl.maxValueName,
    value: form.maxValue,
  },
];

defineExpose({
  type: props.columnControl.type,
  reset,
  validator,
  columnControlIndex: props.columnControlIndex,
  headerCellIndex: props.headerCellIndex,
  isError: isValidationError,
  getQueryParam,
  clear,
} as IPortalTableFilterRef);
</script>
