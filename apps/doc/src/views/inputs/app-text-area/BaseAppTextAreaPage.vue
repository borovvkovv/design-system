<template>
  <BaseDesignPage :route-name="RouteName.AppTextArea"><RouterView /></BaseDesignPage>
</template>

<script lang="ts">
export default {
  name: 'BaseAppTextAreaPage',
};
</script>

<script setup lang="ts">
import { RouteName } from '@/router/enum';
import BaseDesignPage from '@/views/BaseDesignPage.vue';
</script>
