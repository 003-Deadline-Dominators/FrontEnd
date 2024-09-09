import { createApp } from 'vue';
import App from './Home.vue';  // Assuming your main component is Home.vue
import router from './router';
import './assets/styles.css';

createApp(App)
    .use(router)
    .mount('#app');
