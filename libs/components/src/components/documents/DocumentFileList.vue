<template>
  <ul
    v-if="documents.length > 0"
    class="flex flex-col gap-y-5"
  >
    <li
      v-for="(file, index) in documents"
      :key="`${file.name}-${index}`"
    >
      <AppLink
        :link-style="LinksStyles.Style2"
        :to="file.url"
        :is-download-link="true"
        :download-file-name="file.name"
        class="group flex gap-x-3.5"
      >
        <IconDocumentExtension
          :extension="getFileExtensionByName(file.name)"
          class="text-grey-2 ml-1 shrink-0 grow-0"
          :size="file.size === null ? Size.S : Size.M"
        />
        <div :class="['flex flex-col', file.size === null && 'justify-center']">
          <span class="text-size-5 text-black-1 group-hover:text-grey-1">
            {{ file.name }}
          </span>
          <span
            v-if="file.size !== null"
            class="text-size-7 text-grey-2"
          >
            {{ file.size }}
          </span>
        </div>
      </AppLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import IconDocumentExtension from '@comp/components/icons/IconDocumentExtension.vue';
import { getFileExtensionByName } from '@comp/components/attachments/utils';
import AppLink from '@comp/components/app-link/AppLink.vue';
import { LinksStyles } from '@comp/components/app-link/utils/models';
import type { IEDocFile } from '@comp/components/documents/utils/models';
import { Size } from '@comp/enums';

defineProps<{
  documents: IEDocFile[];
}>();
</script>
