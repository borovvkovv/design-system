<template>
  <BaseSelectDropDown>
    <template #input="{ setDropDownVisibility, isDropDownVisible }">
      <div class="flex flex-col gap-y-6">
        <div
          v-if="title || count"
          class="flex"
        >
          <h4 v-if="title">{{ title }}</h4>
          <div
            v-if="count"
            class="text-size-4 text-grey-2 ml-1"
          >
            {{ count }}
          </div>
        </div>
        <BaseSimpleInput
          v-bind="props"
          v-model="query"
          :type="InputType.Text"
          class="mb-1"
          :is-error="isResultsEmpty || isError"
          :error-list="isDropDownVisible && filteredOptions.length ? undefined : errorList"
          @update:model-value="() => setDropDownVisibility(true)"
          @change:model-value="inputChangeHandler"
        />
      </div>
    </template>
    <template #dropDown="{ registerCallSection, unregisterCallSection, setDropDownVisibility }">
      <ul
        v-if="filteredOptions.length"
        class="text-size-5 shadow-24 scrollbar scrollbar-thumb-blueGrey-5 scrollbar-thumb-rounded scrollbar-w-1 hover:scrollbar-thumb-grey-4 active:scrollbar-thumb-blueGrey-3 max-h-72 overflow-y-scroll bg-white p-2"
        @vue:mounted="registerCallSection"
        @vue:unmounted="unregisterCallSection"
      >
        <li
          v-for="option in filteredOptions"
          :key="option.value"
          @click="() => optionClickHandler(option, setDropDownVisibility)"
        >
          <SearchResultSpan
            :text="option.title"
            :pattern="previousQuery"
            class="cursor-pointer p-2"
          />
        </li>
      </ul>
    </template>
  </BaseSelectDropDown>
</template>

<script setup lang="ts" generic="TKey extends SelectKeyType">
import { computed, type Ref, ref, watch } from 'vue';
import { InputType, type ISmartInputProps } from '@comp/components/inputs/utils/models';
import BaseSelectDropDown from '@comp/components/selects/BaseSelectDropDown.vue';
import SearchResultSpan from '@comp/components/selects/SearchResultSpan.vue';
import BaseSimpleInput from '@comp/components/inputs/BaseSimpleInput.vue';
import type { ISelectItem, SelectKeyType } from '@comp/components/selects/utils/models';

const props = defineProps<ISmartInputProps<TKey>>();

const emit = defineEmits<{
  (e: 'update:modelValue', newValue: ISelectItem<TKey> | undefined): void;
}>();

const query = ref(props.modelValue?.title ?? '');
const previousQuery = ref('');
const isResultsEmpty = ref(false);
const filteredOptions = ref<ISelectItem<TKey>[]>(props.options) as Ref<ISelectItem<TKey>[]>;

watch(query, () => {
  if (
    query.value === '' ||
    props.options.filter((option) => option.title.toUpperCase() === query.value.toUpperCase()).length
  ) {
    filteredOptions.value = props.options;
    isResultsEmpty.value = false;
    return;
  }
  const newFilteredOptions = props.options.filter((option) =>
    option.title.toLowerCase().includes(query.value.toLowerCase()),
  );
  if (newFilteredOptions.length) {
    filteredOptions.value = newFilteredOptions;
    isResultsEmpty.value = false;
  } else {
    isResultsEmpty.value = true;
  }
});

watch(query, () => {
  if (!isResultsEmpty.value) {
    previousQuery.value = query.value;
  }
});

const value = computed<ISelectItem<TKey> | undefined>({
  get(): ISelectItem<TKey> | undefined {
    return props.modelValue;
  },
  set(newValue: ISelectItem<TKey> | undefined): void {
    emit('update:modelValue', newValue);
  },
});

const inputChangeHandler = () => {
  {
    value.value = props.options?.filter((option) => option.title.toLowerCase() === query.value.toLowerCase())[0];
  }
};

const optionClickHandler = (option: ISelectItem<TKey>, setDropDownVisibility: (isVisible: boolean) => void) => {
  value.value = option;
  query.value = option.title;
  setDropDownVisibility(false);
};
</script>
