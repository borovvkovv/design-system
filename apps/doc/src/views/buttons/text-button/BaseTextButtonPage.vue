<template>
  <BaseDesignPage :route-name="RouteName.TextButton"><RouterView /></BaseDesignPage>
</template>

<script lang="ts">
export default {
  name: 'BaseTextButtonPage',
};
</script>

<script setup lang="ts">
import { RouteName } from '@/router/enum';
import BaseDesignPage from '@/views/BaseDesignPage.vue';
</script>
