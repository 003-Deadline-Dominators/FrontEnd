import { createApp } from 'vue';
import App from './Home.vue';  // Assuming your main component is Home.vue
import router from './router';
import ElementPlus from 'element-plus';
import './assets/styles.css';
import store from './store';


createApp(App)
    .use(router)
    .use(ElementPlus)
    .use(store)
    .mount('#app');
