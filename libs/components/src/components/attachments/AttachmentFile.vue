<template>
  <div
    :class="[
      'flex',
      size === Size.S ? 'items-start justify-between gap-y-5' : 'bg-grey-5 relative rounded-md md:justify-center',
    ]"
  >
    <AppLink
      :link-style="LinksStyles.Style2"
      :to="getFileUrl(file)"
      :is-download-file="true"
      :download-file-name="file.name"
      :class="['block cursor-pointer', size === Size.S ? 'group flex gap-x-3.5' : 'h-full p-6 md:p-8']"
    >
      <IconDocumentExtension
        v-if="size === Size.S"
        :extension="getFileExtension(file)"
        class="text-grey-2 ml-1 shrink-0 grow-0"
        :size="file.size === null ? Size.S : Size.M"
      />
      <div
        :class="[
          'flex',
          size === Size.S ? 'flex-col' : 'h-full items-center gap-x-7 md:flex-col',
          file.size === null && 'justify-center',
        ]"
      >
        <div
          v-if="size === Size.M"
          :class="[
            'absolute left-11 top-1/2 -translate-y-1/2 md:left-1/2 md:-translate-x-1/2',
            'bg-blue-2 rounded-full',
            'h-10 w-10 md:h-16 md:w-16',
            'flex items-center justify-center',
          ]"
        >
          <AppIcon
            :icon="IconName.IconDownload"
            class="text-white"
          />
        </div>
        <div
          v-if="size === Size.M"
          :class="[
            'flex shrink-0 justify-center md:shrink',
            'overflow-hidden md:mx-auto md:mb-5',
            'w-20 md:w-auto',
            'h-30 md:h-auto',
            'shadow-2',
          ]"
        >
          <slot name="previewImage" />
        </div>
        <div class="flex flex-col lg:mx-auto">
          <span
            :class="['text-black-1', size === Size.M ? 'text-size-6 block' : 'text-size-5 group-hover:text-grey-1']"
          >
            {{ size === Size.S ? getFileName(file) : file.name }}
          </span>
          <span
            v-if="file.size !== null"
            class="text-size-7 text-grey-2"
          >
            {{ getFileSize(file) }}
          </span>
        </div>
      </div>
    </AppLink>
    <div
      v-if="size === Size.S"
      class="ml-12"
      @click="emit('onDeleteFile', file)"
    >
      <IconWasteBin
        v-if="!isDisabled"
        class="text-blueGrey-3 hover:text-grey-1 shrink-0 cursor-pointer"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import IconWasteBin from '@comp/components/icons/IconWasteBin.vue';
import IconDocumentExtension from '@comp/components/icons/IconDocumentExtension.vue';
import { getFileName, getFileSize, getFileExtension, getFileUrl } from '@comp/components/attachments/utils';
import AppLink from '@comp/components/app-link/AppLink.vue';
import { LinksStyles } from '@comp/components/app-link/utils/models';
import { Size } from '@comp/enums';
import { IconName } from '@comp/components/icons/utils/models';
import AppIcon from '@comp/components/AppIcon.vue';

withDefaults(
  defineProps<{
    file: File;
    isDisabled?: boolean;
    size?: Size;
  }>(),
  {
    size: Size.S,
  },
);

const emit = defineEmits<{
  (e: 'onDeleteFile', newValue: File): void;
}>();
</script>
