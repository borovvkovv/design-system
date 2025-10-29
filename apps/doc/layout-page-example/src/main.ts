import { createApp } from 'vue';
import IndexPage from './pages/IndexPage.vue';
import '@libs/components/style.css';
import LibComponents from '@libs/components/reg';

const app = createApp(IndexPage);
app.use(LibComponents);

app.mount('#app');
