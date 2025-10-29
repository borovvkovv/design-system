<template>
  <div class="flex flex-col gap-y-4">
    <AppRadiobutton
      v-if="columnControl.filterNotAppliedText"
      v-model="form.radio"
      :group-name="groupName"
      value="NotApply"
      :label="columnControl.filterNotAppliedText"
    />
    <AppRadiobutton
      v-if="columnControl.selectedZeroText"
      v-model="form.radio"
      :group-name="groupName"
      value="SelectZero"
      :label="columnControl.selectedZeroText"
    />
    <AppRadiobutton
      v-if="columnControl.selectedAllText"
      v-model="form.radio"
      :group-name="groupName"
      value="NotApply"
      :label="`${columnControl.selectedAllText} (${options.length})`"
    />
    <AppRadiobutton
      v-model="form.radio"
      :group-name="groupName"
      value="FromSelect"
      label="Выбрать из списка"
    />
    <MultiSelect
      v-if="form.radio === 'FromSelect'"
      :selected-options="form.selectedOptions ?? []"
      :options
      :placeholder="columnControl.placeholder"
      :is-loading="isLoadingOptions"
      :is-error="validator.$error"
      :is-error-loading="isLoadingOptionsError"
      :size="Size.S"
      @vue:mounted="validator.$reset()"
      @update:selected-options="(newSelectedOptions) => (form.selectedOptions = newSelectedOptions)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Size } from '@comp/enums';
import { useVuelidate, type ValidationArgs } from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';
import { createGuid } from '@comp/utils/guid';
import AppRadiobutton from '@comp/components/inputs/AppRadiobutton.vue';
import MultiSelect from '@comp/components/selects/MultiSelect.vue';
import {
  type IPortalTableFilterProps,
  type TColumnControlFilterSwitchMultiSelect,
  type ColumnFilterSwitchMultiSelectForm,
  type IPortalTableFilterRef,
  type QueryParam,
} from '../utils/models';
import { useFilterOptions } from '../utils';
import {
  getColumnControlOptionsForMultiSelect,
  getColumnFilterSwitchMultiSelectRequireRule,
  getInitialMultiSelectSwitchForm,
  getMultiSelectSwitchState,
  getQueryParamValueForMultiSelectSwitch,
} from '../utils/filterMultiSelectUtils';

const props = defineProps<IPortalTableFilterProps<TColumnControlFilterSwitchMultiSelect>>();

const router = useRouter();
const { isLoadingOptions, isLoadingOptionsError, options } = useFilterOptions(props.columnControl);

const groupName = ref<string>(createGuid());

const form = reactive<ColumnFilterSwitchMultiSelectForm>({
  radio: getMultiSelectSwitchState(getColumnControlOptionsForMultiSelect(router, props.columnControl, options)),
  selectedOptions: getColumnControlOptionsForMultiSelect(router, props.columnControl, options),
});

const rules: ValidationArgs<ColumnFilterSwitchMultiSelectForm> = {
  selectedOptions: helpers.withMessage('require', () => getColumnFilterSwitchMultiSelectRequireRule(form)),
  radio: {},
};
const validator = useVuelidate(rules, form);
const isValidationError = computed(() => validator.value.$error);

const reset = () => {
  form.selectedOptions = getColumnControlOptionsForMultiSelect(router, props.columnControl, options);
  form.radio = getMultiSelectSwitchState(form.selectedOptions);
};
const clear = () => Object.assign(form, getInitialMultiSelectSwitchForm());
const getQueryParam = (): QueryParam => ({
  key: props.columnControl.column,
  value: getQueryParamValueForMultiSelectSwitch(form.radio, form.selectedOptions),
});

watch(options, () => {
  form.selectedOptions = getColumnControlOptionsForMultiSelect(router, props.columnControl, options);
  form.radio = getMultiSelectSwitchState(getColumnControlOptionsForMultiSelect(router, props.columnControl, options));
});

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
