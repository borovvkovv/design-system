<template>
  <BaseDesignPage :route-name="RouteName.Icons"><RouterView /></BaseDesignPage>
</template>

<script lang="ts">
export default {
  name: 'BaseIconsPage',
};
</script>

<script setup lang="ts">
import { RouteName } from '@/router/enum';
import BaseDesignPage from '@/views/BaseDesignPage.vue';
</script>
