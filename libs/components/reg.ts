import type { App } from 'vue';
import twMergeDirective from '@comp/directives/tw-merge';

const Buefy = {
  install(Vue: App) {
    Vue.use(twMergeDirective);
    // Vue.use({
    //   install(Vue: App) {
    //     Vue.component('BaseButton', BaseButton);
    //   },
    // });
  },
};

export default Buefy;
