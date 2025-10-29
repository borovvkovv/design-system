<template>
  <ul
    v-if="model.length > 0"
    :class="['flex flex-col gap-y-5', model.length < MAX_FILES && !isDisabled ? 'mt-8' : '']"
  >
    <AttachmentFile
      v-for="(file, index) in canWrap && isFilesWrapped ? model.slice(0, MAX_FILES_WRAPPED) : model"
      :key="`${file.name}-${index}`"
      :file="file"
      :size="size"
      @on-delete-file="model = removeFile(model, file)"
    />
  </ul>

  <span
    v-if="canWrap && isFilesWrapped"
    data-show-all-files
    class="text-blue-3 hover:text-blue-2 active:text-blue-1 ml-auto mt-4 inline-block cursor-pointer"
    @click="isFilesWrapped = false"
  >
    Показать все
  </span>
  <span
    v-if="canWrap && !isFilesWrapped"
    data-wrap-files
    class="text-blue-3 hover:text-blue-2 active:text-blue-1 mt-4 inline-block cursor-pointer"
    @click="isFilesWrapped = true"
  >
    Свернуть
  </span>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import AttachmentFile from '@comp/components/attachments/AttachmentFile.vue';
import { MAX_FILES, MAX_FILES_WRAPPED } from '@comp/components/attachments/utils/models';
import { removeFile } from '@comp/components/attachments/utils';
import type { Size } from '@comp/enums';

const props = defineProps<{
  modelValue: File[];
  isDisabled: boolean;
  size: Size;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', newValue: File[]): void;
}>();

const model = computed({
  get(): File[] {
    return props.modelValue;
  },
  set(newValue: File[]): void {
    emit('update:modelValue', newValue);
  },
});

const isFilesWrapped = ref<boolean>(true);
const canWrap = computed(() => model.value.length > MAX_FILES_WRAPPED);
</script>
