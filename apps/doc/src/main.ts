import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import i18n from './translations';
import 'highlight.js/styles/stackoverflow-light.css';
import hljs from 'highlight.js';
import typescript from 'highlight.js/lib/languages/typescript';
import hljsVuePlugin from '@highlightjs/vue-plugin';
import '@libs/components/style.css';
import LibComponents from '@libs/components/reg';

hljs.registerLanguage('typescript', typescript);

const app = createApp(App);

app.use(hljsVuePlugin);
app.use(router);
app.use(i18n);
app.use(LibComponents);
app.mount('#app');
