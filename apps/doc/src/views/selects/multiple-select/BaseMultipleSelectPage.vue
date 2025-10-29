<template>
  <BaseDesignPage :route-name="RouteName.MultipleSelect"><RouterView /></BaseDesignPage>
</template>

<script lang="ts">
export default {
  name: 'BaseMultipleSelectPage',
};
</script>

<script setup lang="ts">
import { RouteName } from '@/router/enum';
import BaseDesignPage from '@/views/BaseDesignPage.vue';
</script>
