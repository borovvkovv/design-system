<template>
  <div class="grid w-fit grid-cols-3 gap-1">
    <TextButton
      v-for="columnNumber in allColumnWidthNumbers"
      :key="columnNumber"
      :text="columnNumber"
      :size="Size.XS"
      :color="AppColor.Grey"
      @button-click="() => columnWidths.push(columnNumber)"
    />
    <TextButton
      text="Reset"
      :size="Size.XS"
      :color="AppColor.Grey"
      class="col-span-2"
      @button-click="() => (columnWidths = [])"
    />
    <TextButton
      text="<"
      :size="Size.XS"
      :color="AppColor.Grey"
      @button-click="() => columnWidths.pop()"
    />
  </div>
</template>

<script setup lang="ts">
import { AppColor, Size } from '@libs/components/enums';
import { TextButton } from '@libs/components/buttons';

const columnWidths = defineModel<Array<string>>('columnWidths', { required: true });
const allColumnWidthNumbers = Array(12)
  .fill(0)
  .map((_, i) => (i + 1).toString());
</script>
