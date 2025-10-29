<template>
  <div :class="['relative my-0 max-w-[1440px]', 'mx-4 md:mx-6 lg:mx-10 2xl:mx-auto']">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'LayoutContainer',
};
</script>
