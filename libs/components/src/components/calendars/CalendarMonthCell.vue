<template>
  <div
    :class="[
      'h-9 w-20',
      'my-1 flex items-center justify-center',
      'text-size-6',
      month.active ? 'rounded-md text-white' : month.inactive ? 'text-grey-2' : 'text-black-1',
      isIMonthRange && month.active
        ? 'cursor-pointer'
        : month.active || month.inactive
          ? 'cursor-default'
          : 'hover:bg-grey-5 cursor-pointer hover:rounded',
      isMonthInRange ? 'bg-grey-5 hover:rounded-none' : month.active ? 'bg-blue-2' : undefined,
    ]"
    @click="(target: MouseEvent) => emit('click:date', target)"
  >
    <span>{{ month.name }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { IMonth, IMonthRange } from '@comp/components/calendars/utils/models';

const props = defineProps<{
  month: IMonth | IMonthRange;
}>();

const emit = defineEmits<{
  (eventName: 'click:date', target: MouseEvent): void;
}>();

const isIMonthRange = computed(() => 'isInRange' in props.month);
const isMonthInRange = computed(() => ('isInRange' in props.month ? props.month.isInRange : false));
</script>
