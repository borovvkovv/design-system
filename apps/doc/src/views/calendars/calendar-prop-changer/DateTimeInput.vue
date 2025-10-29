<template>
  <div>
    <InputLabel :label="label" />
    <input
      :value="dateTimeLocal"
      type="datetime-local"
      min="1900-01-01T00:00"
      max="2100-01-01T00:00"
      @blur="
        (event) => {
          const newValue = (event.target as HTMLInputElement).value;

          dateTimeLocal = newValue;
        }
      "
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'DateTimeInput',
};
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { format } from '@/utils/date';
import { InputLabel } from '@libs/components/inputs';

const dateTime = defineModel<Date | undefined>();

defineProps<{ label: string }>();

const dateTimeLocal = computed<string>({
  get() {
    return dateTime.value ? `${format(dateTime.value, 'yyyy-MM-dd')}T${format(dateTime.value, 'HH:mm')}` : '';
  },
  set(newValue): void {
    if (newValue) dateTime.value = new Date(newValue);
    else dateTime.value = undefined;
  },
});
</script>
