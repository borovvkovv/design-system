<template>
  <BaseSimpleSelect
    ref="baseSimpleSelect"
    v-bind="props"
    v-model:query="query"
    :is-empty="!filteredOptions.length"
    is-full-width-drop-down
    @change:query="onChange"
  >
    <ul>
      <li
        v-for="option in filteredOptions"
        :key="option.value"
        @click="
          () => {
            value = option;
            query = option.title;
            baseSimpleSelect?.setDropDownVisibility(false);
          }
        "
      >
        <SearchResultSpan
          :text="option.title"
          :pattern="query"
          class="cursor-pointer p-2"
        />
      </li>
    </ul>
  </BaseSimpleSelect>
</template>

<script setup lang="ts" generic="TKey extends SelectKeyType">
import { computed, ref, watch } from 'vue';
import SearchResultSpan from '@comp/components/selects/SearchResultSpan.vue';
import type { ISimpleSelectProps } from '@comp/components/inputs/utils/models';
import type { ISelectItem, SelectKeyType } from '@comp/components/selects/utils/models';
import BaseSimpleSelect from '@comp/components/selects/BaseSimpleSelect.vue';

const props = defineProps<ISimpleSelectProps<TKey>>();

const emit = defineEmits<{
  (e: 'update:modelValue', newValue: ISelectItem<TKey> | undefined): void;
}>();

const query = ref(props.modelValue?.title ?? '');
const baseSimpleSelect = ref();

const filteredOptions = computed(() =>
  query.value === '' || props.options.map((option) => option.title).includes(query.value)
    ? props.options
    : props.options.filter((option) => {
        return option.title.toLowerCase().includes(query.value.toLowerCase());
      }),
);

const onChange = () => {
  value.value = props.options?.filter((option) => option.title.toLowerCase() === query.value.toLowerCase())[0];
};

const value = computed<ISelectItem<TKey> | undefined>({
  get(): ISelectItem<TKey> | undefined {
    return props.modelValue;
  },
  set(newValue: ISelectItem<TKey> | undefined): void {
    emit('update:modelValue', newValue);
  },
});

watch(
  () => props.modelValue,
  () => (query.value = props.modelValue?.title ?? query.value),
);
</script>
