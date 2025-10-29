import { createApp } from 'vue';
import LgPage from './pages/LgPage.vue';
import '@libs/components/style.css';
import LibComponents from '@libs/components/reg';

const app = createApp(LgPage);
app.use(LibComponents);

app.mount('#lg');
