import { createApp } from 'vue';
import MdPage from './pages/MdPage.vue';
import '@libs/components/style.css';
import LibComponents from '@libs/components/reg';

const app = createApp(MdPage);
app.use(LibComponents);

app.mount('#md');
