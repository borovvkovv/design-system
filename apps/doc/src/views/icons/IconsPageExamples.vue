<template>
  <AppTable
    v-model="tableData"
    :is-loading="false"
    class="mt-6"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AppTable } from '@libs/components/table';
import type { TTableData } from '@libs/components/table-types';
import { buildDesignSystemIconsExampleTable } from './utils';
import { designSystemIcons } from './utils/models';

const tableData = ref<TTableData>(buildDesignSystemIconsExampleTable(designSystemIcons));
</script>
