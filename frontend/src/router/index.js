import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Homepage/intro.vue';
import Topic from '../components/Homepage/Topic/Topic.vue';
import Context from '../components/Homepage/Topic/Context/Context.vue';
import Dashboard from "@/components/dashboard/dashboard.vue"; // Use PascalCase for component name
import App from '../App.vue';
import store from '@/store'; // Import the store

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/topic',
        name: 'Topic',
        component: Topic
    },
    {
        path: '/topic/context',
        name: 'Context',
        component: Context
    },
    {
        path: '/topic/context/question',
        name: 'Question',
        component: App
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true } // Add meta field for authentication check
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Navigation guard
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (requiresAuth && !store.state.isLoggedIn) {
        next('/');
    } else {
        next();
    }
});

export default router;
