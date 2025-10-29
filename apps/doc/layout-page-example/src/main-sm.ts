import { createApp } from 'vue';
import SmPage from './pages/SmPage.vue';
import '@libs/components/style.css';
import LibComponents from '@libs/components/reg';

const app = createApp(SmPage);
app.use(LibComponents);

app.mount('#sm');
