import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '*',
        name: 'NotFound',
        component: () => import('../views/NotFound.vue')
    },
    {
        path: '/',
        name: 'Homepage',
        component: () => import('../views/Homepage.vue')
    },
    {
        path: '/login',
        name: 'LoginPage',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/register',
        name: 'RegisterPage',
        component: () => import('../views/Register.vue')
    },
    {
        path: '/bookmark',
        name: 'BookmarkPage',
        component: () => import('../views/Bookmark.vue')
    },
    {
        path: '/news/:id',
        name: 'NewsDetailPage',
        component: () => import('../views/NewsDetail.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const access_token = localStorage.getItem('access_token')

    switch(to.name) {
        case 'LoginPage':
            access_token ? next({ name: 'Homepage'}) : next()
            break
        case 'RegisterPage':
            access_token ? next({ name: 'Homepage'}) : next()
            break
        case 'BookmarkPage':
            !access_token ? next({ name: 'Homepage'}) : next()
            break
        default:
            next()
    }
})

export default router
