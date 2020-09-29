import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import News from '../views/News.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';
import Recovery from '../views/Recovery.vue';

const routes = [
  {
    path: '/',
    component: SignIn
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: { name: 'News' },
    children: [
      {
        path: '',
        name: 'News',
        component: News
      },
      {
        path: 'account',
        name: 'Account',
        component: () => import('../views/Account.vue')
      },
      {
        path: 'change-password',
        name: 'ChangePassword',
        component: () => import('../views/ChangePassword.vue')
      },
    ]
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/recovery',
    name: 'Recovery',
    component: Recovery
  },
  {
    path: '/:_*',
    redirect: { name: 'Home' }
  },
]

export default createRouter({
  history: createWebHistory(),
  routes
})
