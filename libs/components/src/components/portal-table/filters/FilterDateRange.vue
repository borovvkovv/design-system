<template>
  <CalendarRangeSelect
    v-model:min-value="form.minValue"
    :max-value="form.maxValue"
    :calendar-type="columnControl.calendarType"
    :is-inactive-rule="columnControl.isInactiveRule"
    :show-error="columnControl.showError ?? false"
    :inactive-error-text="columnControl.inactiveErrorText"
    :is-error="validator.$error"
    :error-list="['Необходимо заполнить даты']"
    @update:max-value="onUpdateMaxParamHandler"
  />
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate, type ValidationArgs } from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';
import { endOfDay } from '@comp/utils/date';
import CalendarRangeSelect from '@comp/components/selects/CalendarRangeSelect.vue';
import {
  getDateRangeFromUrl,
  getInitialDateRangeForm,
  getQueryParamValueForDateRange,
} from '../utils/filterDateRangeUtils';
import type {
  IPortalTableFilterRef,
  IPortalTableFilterProps,
  ColumnFilterDateRangeForm,
  TColumnControlFilterDateRange,
  QueryParam,
} from '../utils/models';

const props = defineProps<IPortalTableFilterProps<TColumnControlFilterDateRange>>();

const router = useRouter();

const form = reactive<ColumnFilterDateRangeForm>(getDateRangeFromUrl(router, props.columnControl));

const rules: ValidationArgs<ColumnFilterDateRangeForm> = {
  minValue: props.columnControl.defaultMinValueDate
    ? helpers.withMessage('require', () => form.minValue !== undefined)
    : {},
  maxValue: props.columnControl.defaultMaxValueDate
    ? helpers.withMessage('require', () => form.maxValue !== undefined)
    : {},
};
const validator = useVuelidate(rules, form);
const isValidationError = computed(() => validator.value.$error);

const reset = () => Object.assign(form, getDateRangeFromUrl(router, props.columnControl));
const clear = () => Object.assign(form, getInitialDateRangeForm(props.columnControl));
const getQueryParam = (): QueryParam[] => {
  const { minValue, maxValue } = getQueryParamValueForDateRange(form.minValue, form.maxValue);

  return [
    {
      key: props.columnControl.minValueName,
      value: minValue,
    },
    {
      key: props.columnControl.maxValueName,
      value: maxValue,
    },
  ];
};

const onUpdateMaxParamHandler = (newDate: Date | undefined): void => {
  const now = new Date();
  const endOfNewDay = newDate ? endOfDay(newDate) : undefined;
  form.maxValue = endOfNewDay && endOfNewDay > now ? now : endOfNewDay;
};

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
