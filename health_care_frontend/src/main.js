import { createApp } from 'vue'
import App from './App.vue'
import router from './routes.js';
import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js';
createApp(App).use(bootstrap).use(router).mount('#app');
