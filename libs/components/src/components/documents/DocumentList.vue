<template>
  <FilesSkeleton
    v-if="isLoading"
    v-bind="calculatedLoading"
  />
  <DocumentFileList
    v-else-if="documentList?.length"
    :documents="documentList"
  />
  <IconTextStub
    v-else-if="!documentList?.length && !isLoading"
    :icon="IconName.IconEmptyDocumentList"
    :texts="['Нет документов за выбранный период.', 'Выберите другой период для просмотра или другой вид документа.']"
    :height="height"
    :format="format"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import IconTextStub from '@comp/components/stubs/IconTextStub.vue';
import { IconName } from '@comp/components/icons/utils/models';
import type { IEDocFile } from '@comp/components/documents/utils/models';
import DocumentFileList from '@comp/components/documents/DocumentFileList.vue';
import type { LineSkeletonProps } from '@comp/components/skeletons/utils/models';
import FilesSkeleton from '@comp/components/skeletons/FilesSkeleton.vue';
import { getLoadingConfig } from '@comp/components/documents/utils';
import type { Format } from '@comp/enums/format';

const props = defineProps<{
  documentList?: IEDocFile[];
  height?: number;
  isLoading: boolean;
  loadingConfig?: LineSkeletonProps;
  format?: Format;
}>();

const calculatedLoading = ref<LineSkeletonProps | undefined>(props.loadingConfig);

watch(
  () => props.documentList,
  () => {
    if (!props.loadingConfig && props.documentList) {
      calculatedLoading.value = getLoadingConfig(props.documentList);
    }
  },
);
</script>
