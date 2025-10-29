<template>
  <div
    v-bind="attrs"
    @mouseenter="(evt: MouseEvent) => popupRef?.showPopup?.(evt)"
    @mouseleave="() => popupRef?.startCheckIfPointerReachPopup?.()"
  >
    <FlexibleMenu
      ref="flexibleMenu"
      :visible-items="visibleOrderOptions"
      :collapsed-items="collapsedOrderOptions"
      :max-lines="maxLines"
      class="overflow-clip"
      @update:visible-items="(items: T[]) => (visibleOrderOptions = items)"
      @update:collapsed-items="(items: T[]) => (collapsedOrderOptions = items)"
    >
      <template #visibleItems>
        <slot :visible-items="visibleOrderOptions" />
      </template>
      <template #collapsedMenu>...</template>
    </FlexibleMenu>
  </div>
  <AppTableCellTextPopup
    v-if="collapsedOrderOptions.length"
    ref="popupRef"
    :text="popupText"
  />
</template>

<script setup lang="ts" generic="T">
import { ref, useAttrs, watch, type Ref } from 'vue';
import FlexibleMenu from '@comp/components/flexible-menu/FlexibleMenu.vue';
import AppTableCellTextPopup from '@comp/components/table/AppTableCellTextPopup.vue';

const props = withDefaults(
  defineProps<{
    items: T[];
    maxLines?: number;
    popupText: string;
  }>(),
  {
    maxLines: 3,
  },
);

const visibleOrderOptions = ref<T[]>(props.items) as Ref<T[]>;
const collapsedOrderOptions = ref<T[]>([]) as Ref<T[]>;
const popupRef = ref<InstanceType<typeof AppTableCellTextPopup>>();
const attrs = useAttrs();
const flexibleMenu = ref();

watch(
  () => props.items,
  () => flexibleMenu.value.rerender(props.items),
);
</script>
