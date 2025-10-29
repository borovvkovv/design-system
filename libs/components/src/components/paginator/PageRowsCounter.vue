<template>
  <div class="flex items-center gap-x-5">
    <div>
      <span>{{ `${firstPageInRange}-${lastPageInRange}` }}</span>
      <span class="text-grey-1">&nbsp;из&nbsp;</span>
      <span>{{ totalItems }}</span>
    </div>
    <SimpleSelect
      :options="options ?? []"
      :model-value="optionsSelected"
      :size="Size.S"
      class="w-30"
      @update:model-value="onChangeRowsInPageHandler"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Size } from '@comp/enums';
import { useSelect } from '@comp/components/paginator/hooks/useSelect';
import SimpleSelect from '@comp/components/selects/SimpleSelect.vue';
import type { ISelectItem } from '@comp/components/selects/utils/models';

const props = defineProps<{
  itemsPerPageList: number[];
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}>();

const rowsInPageListComputed = computed(() => props.itemsPerPageList);

const { options, optionsSelected } = useSelect(rowsInPageListComputed, (item) => ({
  title: `По ${item.toString()}`,
  value: item.toString(),
}));

const emit = defineEmits<{
  (eventName: 'update:itemsPerPage', newValue: number): void;
}>();

const firstPageInRange = computed(
  () => props.currentPage * Number(optionsSelected.value?.value) - Number(optionsSelected.value?.value) + 1,
);
const lastPageInRange = computed(() =>
  Math.min(firstPageInRange.value + Number(optionsSelected.value?.value) - 1, props.totalItems),
);

const onChangeRowsInPageHandler = (newValue: ISelectItem<string> | undefined) => {
  optionsSelected.value = newValue ?? options.value?.[0];

  emit('update:itemsPerPage', Number(optionsSelected.value!.value));
};
</script>
