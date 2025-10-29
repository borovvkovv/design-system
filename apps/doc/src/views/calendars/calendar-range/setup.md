<template>
  <CalendarRangeSelect
    v-model:min-value="minDate"
    v-model:max-value="maxDate"
    :calendar-type="CalendarType.month"
    placeholder-for-min-value="Text"
    placeholder-for-max-value="Text"
    :size="Size.M"
    label="Label"
    :is-inactive-rule="(date) => date.getMonth() === 0"
    inactive-error-text="Ввод января запрещен"
    disabled
    required
    show-error
  />
</template>

// ...

<script setup lang="ts">
  import { ref } from 'vue';
  import {CalendarRangeSelect} from '@/components/CalendarRangeSelect.vue';
  import { CalendarType, Size } from '@/common/utils/models';

const minDate = ref<Date | undefined>();
const maxDate = ref<Date | undefined>();

</script>
