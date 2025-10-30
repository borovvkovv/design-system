import { createRouter, createWebHistory } from 'vue-router';
import routes from '@/router/designSystemRoutes';

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: [routes],
});

export default router;
