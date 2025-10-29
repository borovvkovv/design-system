<template>
  <div
    :class="[
      'h-9 w-20',
      'my-1 flex items-center justify-center',
      'text-size-6',
      year.active ? 'rounded-md text-white' : year.inactive ? 'text-grey-2' : 'text-black-1',
      isIYearRange && year.active
        ? 'cursor-pointer'
        : year.active || year.inactive
          ? 'cursor-default'
          : 'hover:bg-grey-5 cursor-pointer hover:rounded ',
      isYearInRange ? 'bg-grey-5 hover:rounded-none' : year.active ? 'bg-blue-2' : undefined,
    ]"
    @click="(target: MouseEvent) => emit('click:date', target)"
  >
    <span>{{ year.value }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { IYearRange, IYear } from '@comp/components/calendars/utils/models';

const props = defineProps<{
  year: IYearRange | IYear;
}>();

const emit = defineEmits<{ (eventName: 'click:date', target: MouseEvent): void }>();

const isIYearRange = computed(() => 'isInRange' in props.year);
const isYearInRange = computed(() => ('isInRange' in props.year ? props.year.isInRange : false));
</script>
