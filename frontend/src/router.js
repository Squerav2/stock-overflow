import { createRouter, createWebHistory } from "vue-router";

import Home from "./views/Home.vue";
import Portfolio from "./views/Portfolio.vue";
import Watchlist from "./views/Watchlist.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Contact from "./views/Contact.vue";
import store from './store.js'


const routes = [

  
    {
        path: "/",
        component: Home,
    },
    {
        path: "/portfolio",
        component: Portfolio,
        meta: { auth: true }
    },
    {
        path: "/watchlist",
        component: Watchlist,
        meta: { auth: true }
    },
    {
        path: '/login',
        component: Login,

    },
    {
        path: '/register',
        component: Register,
    },
    {
        path: '/contact',
        component: Contact,
    },

];

const router = createRouter({
    routes: routes,
    history: createWebHistory(),
});
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.auth)) {
      if (!store.state.user) {
        toast.error("Lütfen giriş yapınız.");
        next('/');
      } else {
        next();
      }
    } else {
      next(); // make sure to always call next()!
    }
  });

export default router;
