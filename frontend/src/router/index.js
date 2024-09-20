import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Homepage/intro.vue'
import Topic from '../components/Homepage/Topic/Topic.vue'
import Context from '../components/Homepage/Topic/Context/Context.vue'
import dashboard from "../components/dashboard/dashboard.vue";
import App from '../components/App.vue'

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
        name: 'dashboard',
        component: dashboard
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router