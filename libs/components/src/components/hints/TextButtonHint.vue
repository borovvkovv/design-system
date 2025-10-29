<template>
  <BaseHint
    :type="type"
    class="relative !p-0"
  >
    <template #default>
      <div
        v-if="isMoreOneMessage"
        class="text-size-6 text-black-1 absolute left-5 top-1/2 z-10 flex -translate-y-2/4 items-center"
      >
        <AppLink
          :is-disabled="currentTextId === 0"
          :link-style="arrowLinkStyle"
          @click="onLeftArrowClick"
        >
          <IconArrowLeft :size="32" />
        </AppLink>
        <span :class="textColor">{{ currentTextId + 1 }}</span>
        <span :class="textColor">&nbsp;/&nbsp;</span>
        <span :class="textColor">{{ hints.length }}</span>
        <AppLink
          :is-disabled="isIconArrowRightDisabled"
          :link-style="arrowLinkStyle"
          @click="onRightArrowCLick"
        >
          <IconArrowRight :size="32" />
        </AppLink>
      </div>
      <div
        ref="messagesWrapper"
        class="relative flex overflow-clip"
      >
        <div
          v-for="(hint, i) in hints"
          ref="messageList"
          :key="i"
          :class="[
            'my-4 h-full w-full shrink-0 pr-5',
            i > 0 && 'absolute left-full',
            isMoreOneMessage ? 'pl-32' : 'pl-5',
          ]"
        >
          <TextButton
            v-show="hint.buttonText"
            ref="buttonList"
            :text="hint.buttonText ?? ''"
            :color="buttonColor"
            :size="Size.S"
            class="relative top-1/2 !float-right ml-10 max-w-[158px] -translate-y-1/2"
            @button-click="() => hint.buttonClick?.call(undefined)"
          />
          <div
            ref="textList"
            :class="['flex items-center ', isMoreOneMessage && 'mx-auto justify-center']"
          >
            <div class="relative">
              <AppIcon
                v-if="iconName"
                :icon="iconName"
                class="absolute left-0 top-1/2 shrink-0 -translate-y-1/2"
                :size="24"
              />
              <span :class="[iconName && 'ml-9', 'inline-block py-2']">
                {{ hint.text }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </BaseHint>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, useCssModule, watch } from 'vue';
import type { ITextButtonHintProps } from '@comp/components/hints/utils/models';
import BaseHint from '@comp/components/hints/BaseHint.vue';
import AppIcon from '@comp/components/AppIcon.vue';
import TextButton from '@comp/components/buttons/TextButton.vue';
import { HintType } from '@comp/components/hints/utils/models';
import { IconName } from '@comp/components/icons/utils/models';
import { AppColor, Size } from '@comp/enums';
import IconArrowLeft from '@comp/components/icons/IconArrowLeft.vue';
import IconArrowRight from '@comp/components/icons/IconArrowRight.vue';
import AppLink from '@comp/components/app-link/AppLink.vue';
import { LinksStyles } from '@comp/components/app-link/utils/models';

const props = defineProps<ITextButtonHintProps>();
const currentTextId = ref(0);
const messageList = ref();
const textList = ref();
const buttonList = ref();
const messagesWrapper = ref();
const styles = useCssModule();
const textColor = computed(() => (props.type === HintType.Info ? 'text-white' : undefined));
const arrowLinkStyle = computed(() => (props.type === HintType.Info ? LinksStyles.Style8 : undefined));

const iconName = computed(() => {
  switch (props.type) {
    case HintType.Error:
      return IconName.IconInfo;
    default:
      return undefined;
  }
});
const buttonColor = computed(() => {
  switch (props.type) {
    case HintType.Error:
      return AppColor.Red;
    case HintType.Info:
      return AppColor.Blue;
    default:
      return undefined;
  }
});
const resizeObserver = new ResizeObserver(() => setHintHeight());
const isIconArrowRightDisabled = computed(() => currentTextId.value === props.hints.length - 1);
const messageTextList = computed(() => props.hints.map((hint) => `${hint.text}${hint.buttonText}`));
const isMoreOneMessage = computed(() => props.hints.length > 1);

onMounted(() =>
  nextTick(() =>
    setTimeout(() => {
      if (messagesWrapper.value) {
        resizeObserver.observe(messagesWrapper.value);
      }
    }, 0),
  ),
);

const setHintHeight = () => {
  if (
    textList.value?.[currentTextId.value] &&
    messageList.value[currentTextId.value] &&
    buttonList.value[currentTextId.value]
  ) {
    const maxHeight = Math.max(
      textList.value[currentTextId.value].getBoundingClientRect().height,
      buttonList.value[currentTextId.value].$el.getBoundingClientRect().height,
    );
    const maxHeightWithPadding = maxHeight + 32;
    messageList.value[currentTextId.value].style.height = `${maxHeight}px`;
    messagesWrapper.value.style.height = `${maxHeightWithPadding}px`;
  }
};

watch(
  () => messageTextList.value,
  () => {
    removeAnimationOnCurrentMessage();
    currentTextId.value = 0;
    removeAnimationOnCurrentMessage();

    nextTick(() => setTimeout(() => setHintHeight(), 0));
  },
);

const removeAnimationOnCurrentMessage = () =>
  messageList.value[currentTextId.value].classList.remove(
    styles.forward,
    styles.backward,
    styles.forwardRev,
    styles.backwardRev,
  );

const onLeftArrowClick = () => {
  removeAnimationOnCurrentMessage();
  messageList.value[currentTextId.value].classList.add(styles.forwardRev);

  currentTextId.value -= 1;
  if (currentTextId.value > 0) {
    removeAnimationOnCurrentMessage();
    messageList.value[currentTextId.value].classList.add(styles.backwardRev);
  } else {
    removeAnimationOnCurrentMessage();
    messageList.value[currentTextId.value].classList.add(styles.forwardRev);
  }
  setHintHeight();
};

const onRightArrowCLick = () => {
  removeAnimationOnCurrentMessage();

  if (currentTextId.value > 0) {
    messageList.value[currentTextId.value].classList.add(styles.backward);
  } else {
    messageList.value[currentTextId.value].classList.add(styles.forward);
  }

  currentTextId.value += 1;
  removeAnimationOnCurrentMessage();
  messageList.value[currentTextId.value].classList.add(styles.forward);

  setHintHeight();
};
</script>

<style module lang="scss">
.forward {
  animation: forward 0.5s ease;
  animation-fill-mode: forwards;
}

.backward {
  animation: backward 0.5s ease;
  animation-fill-mode: forwards;
}

.forwardRev {
  animation: forwardRev 0.5s ease;
  animation-fill-mode: forwards;
}

.backwardRev {
  animation: backwardRev 0.5s ease;
  animation-fill-mode: forwards;
}

@keyframes forward {
  0% {
    transform: translate(0%);
  }
  100% {
    transform: translate(-100%);
  }
}

@keyframes forwardRev {
  0% {
    transform: translate(-100%);
  }
  100% {
    transform: translate(0%);
  }
}

@keyframes backward {
  0% {
    transform: translate(-100%);
  }
  100% {
    transform: translate(-200%);
  }
}

@keyframes backwardRev {
  0% {
    transform: translate(-200%);
  }
  100% {
    transform: translate(-100%);
  }
}
</style>
