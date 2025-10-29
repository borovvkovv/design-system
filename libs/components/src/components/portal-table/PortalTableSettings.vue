<template>
  <PortalTableModalSlider
    ref="modalRef"
    title="Настройка таблицы"
    :is-apply-button-disabled="isSettingsNotChanged"
    :is-reset-button-disabled="isSettingsNotChanged"
    @apply:click="onApplyClick"
    @reset:click="onResetClick"
  >
    <div class="overflow-clip">
      <template
        v-for="(columnSetting, columnSettingIndex) in sortedColumnSettings"
        :key="`${columnSetting.title}-${columnSettingIndex}`"
      >
        <PortalTableSettingSeparator
          v-if="columnSettingIndex === 0"
          ref="columnSettingSeparators"
          v-model:column-settings="columnSettings"
          :swipe-field="modalContainer"
        />
        <DragAndDrop
          :swipe-field="modalContainer"
          @swiping="
            (topLeftContent, rightBottomContent) =>
              onSwipingHandler(topLeftContent, rightBottomContent, columnSetting.index)
          "
          @swiped:end="() => onSwipeEndHandler(columnSetting.index)"
        >
          <template #default="{ isSwiping }">
            <div :class="['flex flex-col bg-white', isSwiping && 'opacity-80']">
              <PortalTableSetting
                ref="portalTableSettingRefs"
                :model-value="columnSetting"
                :class="isSwiping && 'border-blueGrey-5 border'"
                @update:model-value="onChangeColumnSetting"
              />
              <PortalTableSettingSeparator
                v-if="!isSwiping"
                ref="columnSettingSeparators"
                v-model:column-settings="columnSettings"
                :column-setting-index="columnSetting.index"
                :swipe-field="modalContainer"
              />
            </div>
          </template>
          <template #stub>
            <div class="border-b-blueGrey-5 bg-grey-6 h-full w-full border-b" />
          </template>
        </DragAndDrop>
      </template>
    </div>
  </PortalTableModalSlider>
</template>

<script setup lang="ts" generic="T">
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import type { Point } from 'chart.js';
import DragAndDrop from '@comp/components/drag-and-drop/DragAndDrop.vue';
import PortalTableSetting from './PortalTableSetting.vue';
import PortalTableModalSlider from './PortalTableModalSlider.vue';
import PortalTableSettingSeparator from './PortalTableSettingSeparator.vue';
import { columnSettingsToHeaderCells, headerCellsToColumnSettings, resetColumnQueryParamIfColumnHidden } from './utils';
import type { ColumnSetting, TPortalData } from './utils/models';
import { getHeaderOrFirstHeaderRow } from './utils/headerUtils';

const props = defineProps<{
  tableData: TPortalData<T>;
}>();

const emit = defineEmits<{
  (eventName: 'update:tableData', newValue: TPortalData<T>): void;
}>();

const router = useRouter();
const modalRef = ref<InstanceType<typeof PortalTableModalSlider> | undefined>();
const modalContainer = computed(() => modalRef.value?.modalContainer);
const portalTableSettingRefs = ref();
const columnSettingSeparators = ref();

const header = computed(() => getHeaderOrFirstHeaderRow(props.tableData.header));
const isSettingsNotChanged = computed<boolean>(() =>
  portalTableSettingRefs.value?.every((portalTableSettingRef: any) => !portalTableSettingRef.isChanged),
);

const columnSettings = ref<ColumnSetting[]>(headerCellsToColumnSettings(header.value?.cells));
const sortedColumnSettings = computed(() =>
  [...columnSettings.value].sort((setting1, setting2) => setting1.index - setting2.index),
);

const onChangeColumnSetting = (newValue: ColumnSetting) => {
  const newColumnSettings = [...columnSettings.value];
  const newColumnSettingIndex = newColumnSettings.findIndex((setting) => setting.index === newValue.index);
  newColumnSettings[newColumnSettingIndex] = newValue;
  columnSettings.value = newColumnSettings;
};

const onApplyClick = () => {
  let newHeader = { ...header.value, cells: columnSettingsToHeaderCells(columnSettings.value, header.value?.cells) };
  resetColumnQueryParamIfColumnHidden(newHeader, router);

  emit('update:tableData', {
    ...props.tableData,
    header: Array.isArray(props.tableData.header)
      ? props.tableData.header.map((headerRow, headerRowIndex) => (headerRowIndex === 0 ? newHeader : headerRow))
      : newHeader,
  });

  columnSettings.value = headerCellsToColumnSettings(newHeader.cells);

  modalRef.value?.closeModal();
};

const onResetClick = () => {
  portalTableSettingRefs.value?.forEach((settingRef: any) => settingRef.reset());
};

const onSwipingHandler = (
  topLeftDraggingSetting: Point,
  rightBottomDraggingSetting: Point,
  draggingSettingIndex: number,
) => {
  columnSettingSeparators.value?.forEach((columnSettingSeparator: any) =>
    columnSettingSeparator.checkHover(topLeftDraggingSetting, rightBottomDraggingSetting, draggingSettingIndex),
  );
};

const onSwipeEndHandler = (draggingColumnSettingIndex: number) => {
  columnSettingSeparators.value?.forEach((columnSettingSeparator: any) =>
    columnSettingSeparator.replaceColumnSettingIfHover(draggingColumnSettingIndex),
  );
};

watch(header, () => {
  columnSettings.value = headerCellsToColumnSettings(header.value?.cells);
});

const closeModal = () => {
  modalRef.value?.closeModal();
};

defineExpose({
  openModal: () => {
    modalRef.value?.openModal();
  },
  closeModal,
});
</script>
