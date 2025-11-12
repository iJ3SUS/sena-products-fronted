import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import ProductRoutes from './products'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: '/products',
            meta: { requiresAuth: true }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/Login.vue'),
            meta: { requiresAuth: false, requiresGuest: true }
        },
        ...ProductRoutes.map(route => ({
            ...route,
            meta: { ...route.meta, requiresAuth: true }
        }))
    ]
})

// Guard de autenticación
router.beforeEach(async (to, from, next) => {
    const auth = useAuthStore()

    if (!auth.isLoggedIn && localStorage.getItem('session')) {
        await auth.check()
    }

    if (to.meta.requiresAuth && !auth.isLoggedIn) {
        next('/login')
        return
    }

    if (to.meta.requiresGuest && auth.isLoggedIn) {
        next('/')
        return
    }
    
    next()
})

export default router
