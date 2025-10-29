<template>
  <div class="flex items-center gap-x-2">
    <SimpleSelect
      v-model="form.selectedOption"
      :options
      :placeholder="columnControl.placeholder"
      :is-loading="isLoadingOptions"
      :is-error="validator.$error"
      :is-error-loading="isLoadingOptionsError"
      :size="Size.S"
      is-full-width-drop-down
      class="w-full"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate, type ValidationArgs } from '@vuelidate/core';
import { Size } from '@comp/enums';
import SimpleSelect from '@comp/components/selects/SimpleSelect.vue';
import { getColumnControlOption, useFilterOptions } from '../utils';
import {
  type ColumnFilterSelectForm,
  type TColumnControlFilterSelect,
  type IPortalTableFilterProps,
  type IPortalTableFilterRef,
  type QueryParam,
} from '../utils/models';

const props = defineProps<IPortalTableFilterProps<TColumnControlFilterSelect>>();

const router = useRouter();
const { isLoadingOptions, isLoadingOptionsError, options } = useFilterOptions(props.columnControl);

const form = reactive<ColumnFilterSelectForm>({
  selectedOption: getColumnControlOption(router, props.columnControl, options),
});

const rules: ValidationArgs<ColumnFilterSelectForm> = {
  selectedOption: {},
};

const validator = useVuelidate(rules, form);
const isValidationError = computed(() => validator.value.$error);

const reset = () => {
  form.selectedOption = getColumnControlOption(router, props.columnControl, options);
};
const clear = () => (form.selectedOption = undefined);

const getQueryParam = (): QueryParam => ({
  key: props.columnControl.column,
  value: form.selectedOption?.value,
});

watch(options, () => (form.selectedOption = getColumnControlOption(router, props.columnControl, options)));

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
