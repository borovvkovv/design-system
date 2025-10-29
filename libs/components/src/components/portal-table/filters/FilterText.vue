<template>
  <div class="flex items-center gap-x-2">
    <BaseSimpleInput
      v-model="textLocal"
      :size="Size.S"
      :placeholder="columnControl.placeholder"
      class="w-full"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate, type ValidationArgs } from '@vuelidate/core';
import { Size } from '@comp/enums';
import BaseSimpleInput from '@comp/components/inputs/BaseSimpleInput.vue';
import {
  type ColumnFilterTextForm,
  type IPortalTableFilterProps,
  type IPortalTableFilterRef,
  type QueryParam,
  type TColumnControlFilterText,
} from '@comp/components/portal-table/utils/models';
import { getQueryParamValueAsString } from '@comp/components/portal-table/utils/queryParamUtils';

const props = defineProps<IPortalTableFilterProps<TColumnControlFilterText>>();
const router = useRouter();

const form = reactive<ColumnFilterTextForm>({
  text: getQueryParamValueAsString(router, props.columnControl.column),
});

const rules: ValidationArgs<ColumnFilterTextForm> = {
  text: {},
};

const validator = useVuelidate(rules, form);
const isValidationError = computed(() => validator.value.$error);

const reset = () => {
  form.text = getQueryParamValueAsString(router, props.columnControl.column);
};

const clear = () => (form.text = undefined);

const getQueryParam = (): QueryParam => ({
  key: props.columnControl.column,
  value: form.text,
});

const textLocal = computed<string>({
  get() {
    return form.text ?? '';
  },
  set(newValue) {
    form.text = newValue === '' ? undefined : newValue;
  },
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
