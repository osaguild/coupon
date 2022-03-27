import { createRouter, createWebHistory } from 'vue-router';
import Search from './components/SearchPage.vue';
import List from './components/ListPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/list' },
    { name: 'search', path: '/search', component: Search },
    { name: 'list', path: '/list', component: List }
  ],
});

export default router;