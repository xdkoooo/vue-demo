import VueRouter from 'vue-router';
import Vue from 'vue'
import Home from '../views/home';
import Poster from '../views/poster.vue'


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
        path: '/poster',
        component: Poster,
        meta: { title: 'poster' }
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
    },
    {
        path: '/vmodel',
        component: () => import('../views/vmodel'),
        meta: { title: 'vmodel' }
    },
    {
        path: '/next-tick',
        component: () => import('../views/next-tick'),
        meta: { title: 'nexttick' }
    },
    {
        path: '/audio-test',
        component: () => import('../views/audio-test'),
        meta: { title: 'audioTest' }
    },
    {
        path: '/audio-dom',
        component: () => import('../views/audio-dom'),
        meta: { title: 'audio-dom' }
    },
    {
        path: '/codemirror_editor',
        component: () => import('../views/codemirror'),
        meta: { title: 'codemirror_editor' }
    },
    {
        path: '/ace_editor',
        component: () => import('../views/aceeditor'),
        meta: { title: 'ace_editor' }
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