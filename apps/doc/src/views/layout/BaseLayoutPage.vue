<template>
  <BaseDesignPage :route-name="RouteName.Layout"><RouterView /></BaseDesignPage>
</template>

<script lang="ts">
export default {
  name: 'BaseLayoutPage',
};
</script>

<script setup lang="ts">
import { RouteName } from '@/router/enum/';
import BaseDesignPage from '@/views/BaseDesignPage.vue';
</script>
