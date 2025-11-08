<template>
  <BaseButton
    v-if="isSideBarCollapsed"
    :text="language"
    :size="Size.S"
    :color="language == languageSwitcher.right.value ? AppColor.Grey : AppColor.Blue"
    @button-click="
      () =>
        (language =
          language === languageSwitcher.left.value ? languageSwitcher.right.value : languageSwitcher.left.value)
    "
  >
    {{ language }}
  </BaseButton>
  <SwitcherButton
    v-else
    v-model="language"
    :switcher="languageSwitcher"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { SwitcherButton } from '@libs/components/buttons';
import type { Switcher } from '@libs/components/buttons-types';
import { Size } from '@libs/components/enums';
import { AppColor } from '@libs/components/enums';
import { BaseButton } from '@libs/components/buttons';

defineProps<{
  isSideBarCollapsed: boolean;
}>();

const i18n = useI18n();
const languageRef = ref<string>(i18n.locale.value);
const language = computed<string>({
  get() {
    return languageRef.value;
  },
  set(newValue): void {
    languageRef.value = newValue;
    i18n.locale.value = newValue;
  },
});

const languageSwitcher: Switcher<string> = {
  left: { text: 'Русский', value: 'RU' },
  right: { text: 'English', value: 'EN' },
};
</script>
