<template>
  <section
    v-if="isEnabled || model.length"
    :class="[
      'border-blueGrey-3 relative mt-5 rounded-md border border-dashed px-8 py-6',
      isEnabled && 'hover:border-blue-2',
    ]"
    @mouseenter="() => (isSectionHover = true)"
    @mouseleave="() => (isSectionHover = false)"
    @dragenter="
      (evt: DragEvent) => {
        if (canAddFiles) {
          onDragEnterAndOver(evt);
        }
      }
    "
  >
    <div
      v-if="canAddFiles"
      class="flex items-center gap-x-10"
    >
      <IconTextButton
        class="relative shrink-0"
        :icon-name="IconName.IconPaperClip"
        text="Прикрепить файл"
        :color="AppColor.Grey"
        :size="Size.S"
        for="file-input"
      />
      <input
        id="file-input"
        type="file"
        class="hidden"
        @change="onChange"
      />
      <div class="relative flex min-w-0 items-center">
        <transition name="hoverText">
          <span
            v-if="isSectionHover"
            class="text-size-7 text-grey-2 absolute whitespace-nowrap"
          >
            Перетащите файлы сюда
          </span>
        </transition>
        <transition name="errors">
          <ul
            v-if="!isSectionHover"
            class="min-w-0"
          >
            <li
              v-for="(errorType, index) in ErrorType"
              :key="index"
            >
              <span
                :class="[
                  'text-size-7 block truncate whitespace-nowrap',
                  fileErrors.includes(errorType) ? 'text-red-3' : 'text-grey-2',
                ]"
              >
                {{ getErrorText(errorType) }}
              </span>
            </li>
          </ul>
        </transition>
      </div>
    </div>
    <AttachmentFileList
      v-model="model"
      :is-disabled="isDisabled"
      :size="Size.S"
    />
    <div
      v-show="isSectionDrag"
      data-section-drag
      class="bg-blue-7 absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center gap-x-4"
      @drop.stop.prevent="onDrop"
      @dragleave.capture="onDragLeave"
      @dragover.capture="onDragEnterAndOver"
    >
      <div class="pointer-events-none">
        <IconDragAndDrop />
      </div>
      <span class="text-size-7 text-blue-2 pointer-events-none">Перетащите файлы сюда</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { AppColor, Size } from '@comp/enums';
import IconDragAndDrop from '@comp/components/icons/IconDragAndDrop.vue';
import IconTextButton from '@comp/components/buttons/IconTextButton.vue';
import { IconName } from '@comp/components/icons/utils/models';
import { ErrorType, MAX_FILES } from '@comp/components/attachments/utils/models';
import AttachmentFileList from '@comp/components/attachments/AttachmentFileList.vue';
import { getFileErrors, getErrorText } from '@comp/components/attachments/utils';

const props = withDefaults(
  defineProps<{
    modelValue: File[];
    isDisabled: boolean;
  }>(),
  { isDisabled: false },
);

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

const isSectionHover = ref(false);
const isSectionDrag = ref(false);
const isEnabled = computed(() => !props.isDisabled);
const canAddFiles = computed(() => model.value.length < MAX_FILES && isEnabled.value);
const fileErrors = ref<ErrorType[]>([]);

function onChange(evt: Event) {
  isSectionHover.value = false;
  const files = (evt.target as HTMLInputElement).files;
  if (!files || files.length === 0) {
    return;
  }
  const file = files[0];

  fileErrors.value = getFileErrors(file);
  if (!fileErrors.value.length) {
    model.value = [...model.value, file];
    (evt.target as HTMLInputElement).value = '';
  }
}

function onDragEnterAndOver(evt: DragEvent) {
  evt.preventDefault();
  evt.stopPropagation();
  if (!isSectionDrag.value && evt.currentTarget === evt.target) {
    isSectionDrag.value = true;
  }
}

function onDragLeave(evt: DragEvent) {
  evt.preventDefault();
  evt.stopPropagation();

  if (isSectionDrag.value && evt.currentTarget === evt.target) {
    isSectionDrag.value = false;
  }
}

function onDrop(evt: DragEvent) {
  isSectionHover.value = false;
  isSectionDrag.value = false;
  if (evt.dataTransfer) {
    const dt = evt.dataTransfer;
    const files = dt.files;
    const file = files[0];

    fileErrors.value = getFileErrors(file);
    if (!fileErrors.value.length) {
      model.value = [...model.value, file];
    }
  }
}
</script>

<style scoped>
.errors-enter-active {
  animation: show-after 0.2s;
}

.errors-leave-active {
  animation: disappear-first 0.1s;
}

.hoverText-enter-active {
  animation: show-after 0.2s;
}

.hoverText-leave-active {
  animation: disappear-first 0.1s;
}

@keyframes disappear-after {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes show-after {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes disappear-first {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
