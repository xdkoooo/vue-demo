import VueRouter from 'vue-router';
import Vue from 'vue'
import Home from '../views/home';


Vue.use(VueRouter);



const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home,
        meta: { title: 'home' }
    },
    {
        path: '/test',
        component: () => import('../views/test'),
        meta: { title: 'test' }
    },
    {
        path: '/watch',
        component: () => import('../views/watch'),
        meta: { title: 'watch' }
    }
]

const router = new VueRouter({
    routes,
    mode: 'history',
    linkActiveClass: 'active'
})

// 前置钩子(guard)
router.beforeEach((to, from, next) => {
    document.title = to.matched[0].meta.title
    console.log(to);
    next() // { path: '/login'} '/'
})
// (后置钩子hook)
router.afterEach((to, from) => {

})



export default router;