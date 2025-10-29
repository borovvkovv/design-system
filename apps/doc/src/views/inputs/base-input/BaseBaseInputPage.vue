<template>
  <BaseDesignPage :route-name="RouteName.BaseInput"><RouterView /></BaseDesignPage>
</template>

<script lang="ts">
export default {
  name: 'BaseBaseInputPage',
};
</script>

<script setup lang="ts">
import { RouteName } from '@/router/enum';
import BaseDesignPage from '@/views/BaseDesignPage.vue';
</script>
