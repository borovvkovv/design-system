<template>
  <BaseDesignPage :route-name="RouteName.IconButton"><RouterView /></BaseDesignPage>
</template>

<script lang="ts">
export default {
  name: 'BaseIconButtonPage',
};
</script>

<script setup lang="ts">
import { RouteName } from '@/router/enum';
import BaseDesignPage from '@/views/BaseDesignPage.vue';
</script>
