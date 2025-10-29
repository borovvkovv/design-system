<template>
  <CalendarSelect
    v-model="date"
    :calendar-type="CalendarType.month"
    placeholder="Text"
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
  import {CalendarSelect} from '@/components/CalendarSelect.vue';
  import { CalendarType, Size } from '@/common/utils/models';

const date = ref<Date>(new Date());

</script>
