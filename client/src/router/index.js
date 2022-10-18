import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'
import Register from '../views/register.vue'
import Login from '../views/login.vue'
import Nofind from '../views/404.vue'
import Home from '../views/home.vue'
import InfoShow from '../views/infoshow.vue'
import FundList from '../views/FundList.vue'
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/index'

    },
    {
        path: '/index',
        name: 'home',
        component: Index,
        children: [{ path: '', component: Home },
            { path: '/home', name: 'home', component: Home },
            { path: '/infoshow', name: 'infoshow', component: InfoShow },
            { path: '/fundlist', name: 'fundlist', component: FundList },
        ]
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    }
    ,
    { path: '*', name: '/404', component: Nofind },
    { path: '/login', name: 'login', component: Login },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//router protector
router.beforeEach((to, from, next) => {
    const isLogin = localStorage.eleToken ? true : false;
    if (to.path == "/login" || to.path == "/register") {
        next();

    } else {
        isLogin ? next() : next("/login");
    }
})

export default router;
