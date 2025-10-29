<template>
  <BaseDesignPage :route-name="RouteName.SimpleSelect"><RouterView /></BaseDesignPage>
</template>

<script lang="ts">
export default {
  name: 'BaseSimpleSelectPage',
};
</script>

<script setup lang="ts">
import { RouteName } from '@/router/enum';
import BaseDesignPage from '@/views/BaseDesignPage.vue';
</script>
