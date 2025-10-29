<template>
  <div :class="['h-dvh w-dvw', 'flex']">
    <SideBar
      :links="pagesLinks"
      :is-initially-collapsed="false"
      class="shrink-0"
    />
    <div
      class="scrollbar-thin scrollbar scrollbar-track-grey-5 scrollbar-thumb-blueGrey-5 scrollbar-thumb-rounded scrollbar-w-1 scrollbar-h-2 hover:scrollbar-thumb-grey-4 active:scrollbar-thumb-blueGrey-3 grow overflow-auto"
    >
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import SideBar from '@/components/side-bar/SideBar.vue';
import { pagesLinks } from '@/router/links';
</script>
