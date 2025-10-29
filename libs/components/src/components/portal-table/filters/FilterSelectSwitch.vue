<template>
  <div class="flex flex-col gap-y-4">
    <AppRadiobutton
      v-model="form.radio"
      :group-name="groupName"
      value="All"
      :label="`Выбрать всех${`${options?.length ? ` (${options.length})` : ''}`}`"
    />
    <AppRadiobutton
      v-model="form.radio"
      :group-name="groupName"
      value="FromSelect"
      label="Выбрать из списка"
    />
    <SimpleSelect
      v-if="form.radio === 'FromSelect'"
      v-model="form.selectedOption"
      :options
      :is-loading="isLoadingOptions"
      :is-error="validator.$error"
      :is-error-loading="isLoadingOptionsError"
      :placeholder="columnControl.placeholder"
      :size="Size.S"
      is-full-width-drop-down
      @vue:mounted="validator.$reset()"
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
import SimpleSelect from '@comp/components/selects/SimpleSelect.vue';
import {
  type ColumnFilterSwitchSelectForm,
  type TColumnControlFilterSwitchSelect,
  type IPortalTableFilterProps,
  type IPortalTableFilterRef,
  type QueryParam,
} from '../utils/models';
import { getColumnControlOption, useFilterOptions } from '../utils';
import {
  getColumnFilterSwitchSelectRequireRule,
  getInitialSelectSwitchForm,
  getQueryParamValueForSelectSwitch,
  getSelectSwitchState,
} from '../utils/filterSelectSwitchUtils';

const props = defineProps<IPortalTableFilterProps<TColumnControlFilterSwitchSelect>>();

const router = useRouter();
const { isLoadingOptions, isLoadingOptionsError, options } = useFilterOptions(props.columnControl);

const groupName = ref<string>(createGuid());

const form = reactive<ColumnFilterSwitchSelectForm>({
  radio: getSelectSwitchState(getColumnControlOption(router, props.columnControl, options)),
  selectedOption: getColumnControlOption(router, props.columnControl, options),
});

const rules: ValidationArgs<ColumnFilterSwitchSelectForm> = {
  selectedOption: helpers.withMessage('require', () => getColumnFilterSwitchSelectRequireRule(form)),
  radio: {},
};
const validator = useVuelidate(rules, form);
const isValidationError = computed(() => validator.value.$error);

const reset = () => {
  form.selectedOption = getColumnControlOption(router, props.columnControl, options);
  form.radio = getSelectSwitchState(form.selectedOption);
};
const clear = () => Object.assign(form, getInitialSelectSwitchForm());

const getQueryParam = (): QueryParam => ({
  key: props.columnControl.column,
  value: getQueryParamValueForSelectSwitch(form.radio, form.selectedOption),
});

watch(options, () => {
  form.selectedOption = getColumnControlOption(router, props.columnControl, options);
  form.radio = getSelectSwitchState(form.selectedOption);
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
