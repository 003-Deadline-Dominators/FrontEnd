import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Homepage/intro.vue';
import Topic from '../components/Homepage/Topic/Topic.vue';
import Context from '../components/Homepage/Topic/Context/Context.vue';
import Dashboard from "@/components/dashboard/dashboard.vue";
import App from '../components/App.vue';
import store from '@/store'; // Import your store to access Vuex state

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
        beforeEnter: (to, from, next) => {
            // Check if user is logged in
            if (store.getters.isLoggedIn) {
                next(); // Allow access if logged in
            } else {
                next('/'); // Redirect to home if not logged in
            }
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
