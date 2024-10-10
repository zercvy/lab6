import { createRouter, createWebHistory } from 'vue-router';
import LoginView from './views/loginView';
import RegisterView from './views/registerView';
import ProfileView from './views/profileView';

const routes = [
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/profile', component: ProfileView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
