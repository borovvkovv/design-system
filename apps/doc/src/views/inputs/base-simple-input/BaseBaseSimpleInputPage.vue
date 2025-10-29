<template>
  <BaseDesignPage :route-name="RouteName.BaseSimpleInput"><RouterView /></BaseDesignPage>
</template>

<script lang="ts">
export default {
  name: 'BaseBaseSimpleInputPage',
};
</script>

<script setup lang="ts">
import { RouteName } from '@/router/enum';
import BaseDesignPage from '@/views/BaseDesignPage.vue';
</script>
