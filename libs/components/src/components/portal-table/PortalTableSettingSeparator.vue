<template>
  <div
    ref="separator"
    :class="columnSettingIndex !== undefined && columnSettingIndex < columnSettings.length - 1 && '-mb-px'"
  >
    <div
      :class="[
        'h-px w-full',
        isHover ? 'bg-blue-2' : columnSettingIndex === undefined ? 'bg-transparent' : 'bg-blueGrey-5',
      ]"
    ></div>
    <div :class="['h-px w-full', isHover ? 'bg-blue-2' : 'bg-transparent']"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Point } from 'chart.js';
import { replaceItemInArray } from '@comp/utils/array';
import type { ColumnSetting } from '@comp/components/portal-table/utils/models';

const props = defineProps<{
  columnSettings: ColumnSetting[];
  columnSettingIndex?: number;
  swipeField: HTMLElement | undefined;
}>();

const emit = defineEmits<{
  (eventName: 'update:columnSettings', newValue: ColumnSetting[]): void;
}>();

const isHover = ref(false);
const separator = ref<HTMLElement | undefined>();

const checkHover = (leftTopDragging: Point, rightBottomDragging: Point, draggingSettingIndex: number) => {
  if (
    draggingSettingIndex === props.columnSettingIndex ||
    draggingSettingIndex === (props.columnSettingIndex ?? -1) + 1
  )
    return;

  if (separator.value && props.swipeField) {
    const clientRect = separator.value.getBoundingClientRect();
    const swipeField = props.swipeField.getBoundingClientRect();

    const leftTopSeparator = { x: clientRect.x - swipeField.x, y: clientRect.y + clientRect.height / 2 - swipeField.y };
    const rightBottomSeparator = {
      x: leftTopSeparator.x + clientRect.width,
      y: leftTopSeparator.y,
    };

    isHover.value =
      ((leftTopSeparator.x >= (leftTopDragging.x ?? 0) && leftTopSeparator.x < (rightBottomDragging.x ?? 0)) ||
        (rightBottomSeparator.x >= (leftTopDragging.x ?? 0) &&
          rightBottomSeparator.x < (rightBottomDragging.x ?? 0))) &&
      ((leftTopSeparator.y >= (leftTopDragging.y ?? 0) && leftTopSeparator.y < (rightBottomDragging.y ?? 0)) ||
        (rightBottomSeparator.y >= (leftTopDragging.y ?? 0) && rightBottomSeparator.y < (rightBottomDragging.y ?? 0)));
  }
};

const replaceColumnSettingIfHover = (draggingColumnSettingIndex: number) => {
  if (isHover.value) {
    isHover.value = false;

    if (props.columnSettingIndex === draggingColumnSettingIndex) return;

    const columnSettingIndexAsNumber = props.columnSettingIndex === undefined ? -1 : props.columnSettingIndex;

    const sortedColumnSettingsByIndex = [...props.columnSettings].sort(
      (setting1, setting2) => setting1.index - setting2.index,
    );

    const newColumnSettings: ColumnSetting[] = replaceItemInArray(
      draggingColumnSettingIndex,
      columnSettingIndexAsNumber,
      sortedColumnSettingsByIndex,
    );

    emit(
      'update:columnSettings',
      props.columnSettings.map((setting) => ({
        ...setting,
        index: newColumnSettings.findIndex((settingLocal) => settingLocal.index === setting.index),
      })),
    );
  }
};

defineExpose({ checkHover, replaceColumnSettingIfHover });
</script>
