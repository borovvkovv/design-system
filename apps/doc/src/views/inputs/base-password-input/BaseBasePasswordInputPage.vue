<template>
  <BaseDesignPage :route-name="RouteName.BasePasswordInput"><RouterView /></BaseDesignPage>
</template>

<script lang="ts">
export default {
  name: 'BaseBasePasswordInputPage',
};
</script>

<script setup lang="ts">
import { RouteName } from '@/router/enum';
import BaseDesignPage from '@/views/BaseDesignPage.vue';
</script>
