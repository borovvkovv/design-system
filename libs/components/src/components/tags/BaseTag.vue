<template>
  <div
    v-if="text"
    :class="['text-size-6 w-fit rounded-md px-3 py-1', bgTextColor]"
  >
    {{ text }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { TagType, type IBaseTagProps } from '@comp/components/tags/utils/models';

const props = defineProps<IBaseTagProps>();

const bgTextColor = computed(() => {
  switch (props.type) {
    case TagType.Success:
      return 'bg-green-2 text-green-3';
    case TagType.Info:
      return 'bg-blue-8 text-blue-9';
    case TagType.Warning:
      return 'bg-red-7 text-red-8';
    case TagType.Error:
      return 'bg-red-9 text-red-10';
    default:
      return 'bg-grey-5 text-grey-1';
  }
});
</script>
