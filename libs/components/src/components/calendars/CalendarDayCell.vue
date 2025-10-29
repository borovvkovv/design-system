<template>
  <div
    :class="[
      'h-8 w-8',
      'my-1 flex items-center justify-center',
      'text-size-6',
      day.active ? 'rounded text-white' : day.inactive ? 'text-grey-2' : day.weekend ? 'text-red-3' : 'text-black-1',
      isIDayRange && day.active
        ? 'cursor-pointer'
        : day.active || day.inactive || day.prevMonth || day.nextMonth
          ? 'cursor-default'
          : 'hover:bg-grey-5 cursor-pointer hover:rounded',
      isDayInRange ? 'bg-grey-5 hover:rounded-none' : day.active ? 'bg-blue-2' : undefined,
    ]"
    @click="(target: MouseEvent) => emit('click:date', target)"
  >
    <span v-if="!day.prevMonth && !day.nextMonth">{{ day.value }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { IDay, IDayRange } from '@comp/components/calendars/utils/models';

const props = defineProps<{
  day: IDay | IDayRange;
}>();

const emit = defineEmits<{
  (eventName: 'click:date', target: MouseEvent): void;
}>();

const isIDayRange = computed(() => 'isInRange' in props.day);
const isDayInRange = computed(() => ('isInRange' in props.day ? props.day.isInRange : false));
</script>
