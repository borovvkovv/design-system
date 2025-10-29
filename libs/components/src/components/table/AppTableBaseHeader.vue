<template>
  <thead
    ref="headerRef"
    :class="[isHeaderSticky && 'sticky top-0 z-10 bg-white']"
  >
    <tr
      v-for="(headerRow, i) in header instanceof Array ? header : [header]"
      :key="i"
      :class="[headerRow.modifier?.textColor ?? 'text-grey-2', headerRow.modifier?.other]"
    >
      <th
        v-for="(cell, index) in headerRow.cells"
        :key="index"
        :class="[
          cell.modifier?.text ?? 'font-normal',
          cell.modifier?.textColor,
          cell.modifier?.textAlign ?? (index === 0 ? 'text-left' : 'text-right'),
          cell.modifier?.width ?? (index === 0 ? 'w-auto' : 'w-53'),
          cell.modifier?.padding ?? ['py-4', index === 0 ? 'pl-0' : 'pl-8 md:pl-16'],
          cell.modifier?.border,
          cell.modifier?.other,
          cell.modifier?.verticalAlign,
          isColumnSticky && index === 0 && 'sticky left-0 bg-white',
          isColumnSticky && index === 0 && isColumnStickyNow && 'shadow-right4',
        ]"
        :rowspan="cell.rowspan"
        :colspan="cell.colspan"
      >
        {{ cell.text }}
      </th>
    </tr>
  </thead>
</template>

<script setup lang="ts">
import type { THeaderRow } from '@comp/components/table/utils/models';
import { useTableHeaderSticknessStatus } from '@comp/tables/hooks/useTableHeaderSticknessStatus';
import { onMounted, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    header: THeaderRow | THeaderRow[];
    isHeaderSticky?: boolean;
    isColumnSticky?: boolean;
    isColumnStickyNow?: boolean;
  }>(),
  {
    isHeaderSticky: false,
    isColumnSticky: false,
  },
);

const emit = defineEmits<{
  (eventName: 'change:header', isSticky: boolean): void;
}>();

const headerRef = ref<Element | undefined>();
const { setHeaderSticknessStatusListeners } = useTableHeaderSticknessStatus(headerRef, (isSticky: boolean) =>
  emit('change:header', isSticky),
);

onMounted(() => {
  if (props.isHeaderSticky) {
    setHeaderSticknessStatusListeners();
  }
});
</script>
