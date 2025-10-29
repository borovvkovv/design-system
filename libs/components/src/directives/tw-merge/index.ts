import { type App, type Directive, type DirectiveBinding, type VNode } from 'vue';
import { extendTailwindMerge } from 'tailwind-merge';

const customTwMergeFactory = () => {
  const colors = [
    ...Array.from({ length: 5 }, (_, i) => `black-${i + 1}`),
    ...Array.from({ length: 6 }, (_, i) => `grey-${i + 1}`),
    ...Array.from({ length: 5 }, (_, i) => `blueGrey-${i + 1}`),
    ...Array.from({ length: 7 }, (_, i) => `darkBlue-${i + 1}`),
    ...Array.from({ length: 9 }, (_, i) => `blue-${i + 1}`),
    ...Array.from({ length: 4 }, (_, i) => `green-${i + 1}`),
    ...Array.from({ length: 10 }, (_, i) => `red-${i + 1}`),
    'white',
    'white-40',
    'orange',
    'transparent',
  ];

  const textSizes = [
    ...Array.from({ length: 7 }, (_, i) => `size-${i + 1}`),
    ...Array.from({ length: 7 }, (_, i) => `mobile-${i + 1}`),
    ...Array.from({ length: 7 }, (_, i) => `tablet-${i + 1}`),
    ...Array.from({ length: 7 }, (_, i) => `desktop-${i + 1}`),
    ...Array.from({ length: 4 }, (_, i) => `size-h${i + 1}`),
    ...Array.from({ length: 4 }, (_, i) => `mobile-h${i + 1}`),
    ...Array.from({ length: 4 }, (_, i) => `tablet-h${i + 1}`),
    ...Array.from({ length: 4 }, (_, i) => `desktop-h${i + 1}`),
  ];

  return extendTailwindMerge({
    extend: {
      theme: {
        colors: colors,
        borderColor: colors,
      },
      classGroups: {
        'font-size': [
          {
            text: textSizes,
          },
        ],
      },
    },
  });
};

type ComputeClasses = (el: HTMLElement, binding: DirectiveBinding, vNode: VNode) => void;
const computeClasses: ComputeClasses = (el) => {
  const exitingClasses = el.classList.value;
  const inheritedClasses = '';
  const customTwMerge = customTwMergeFactory();

  el.classList.value = customTwMerge(exitingClasses, inheritedClasses);
};

export const twMergeDirective: Directive = {
  beforeMount: computeClasses,
  updated: computeClasses,
};

export default {
  install: (app: App) => {
    app.directive('twMerge', twMergeDirective);
  },
};
