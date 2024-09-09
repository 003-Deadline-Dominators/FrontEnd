import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Homepage/intro.vue'
import Topic from '../components/Homepage/Topic/Topic.vue'
import Context from '../components/Homepage/Topic/Context/Context.vue'

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
        path: '/context',
        name: 'Context',
        component: Context
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
