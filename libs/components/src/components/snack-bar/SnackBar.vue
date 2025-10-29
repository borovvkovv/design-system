<template>
  <div :class="['overflow-hidden rounded-md', styles.backgroundColor, styles.borderColor]">
    <div class="flex gap-x-4 px-4 py-3">
      <AppIcon :icon="parametersByStatus.icon" />
      <span>{{ message }}</span>
      <AppLink
        :link-style="LinksStyles.Style6"
        @click="() => emit('close')"
      >
        <IconCross24 :size="12" />
      </AppLink>
    </div>
    <span
      v-if="props.timer"
      :class="['block h-0.5', styles.progressBar, styles.progressBarColor]"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, useCssModule } from 'vue';
import { LinksStyles } from '@comp/components/app-link/utils/models';
import IconCross24 from '@comp/components/icons/IconCross24.vue';
import AppLink from '@comp/components/app-link/AppLink.vue';
import AppIcon from '@comp/components/AppIcon.vue';
import { SnackBarStatus, type SnackBarParameters, type SnackBarPropsStrict } from './utils/models';
import { getParametersByStatus } from './utils';

const props = withDefaults(defineProps<SnackBarPropsStrict>(), {
  status: SnackBarStatus.Normal,
});

const emit = defineEmits<{
  (eventName: 'close'): void;
}>();

const styles = useCssModule();
const parametersByStatus = computed<SnackBarParameters>(() => getParametersByStatus(props.status, styles));

onMounted(() => {
  if (props.timer) {
    setTimeout(() => emit('close'), props.timer);
  }
});
</script>

<style module lang="scss">
@use '@comp/assets/styles/colors.module.scss' as *;

.backgroundColor {
  background: v-bind('parametersByStatus.backgroundColor');
}

.borderColor {
  border: solid v-bind('parametersByStatus.borderColor') 1px;
}

.progressBarColor {
  background: v-bind('parametersByStatus.borderColor');
}

.progressBar {
  animation-name: progress-bar-animation;
  animation-timing-function: linear;
  animation-duration: v-bind('`${$props.timer}ms`');
}

@keyframes progress-bar-animation {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
</style>
