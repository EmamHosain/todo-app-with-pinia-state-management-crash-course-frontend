import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import axios from 'axios'
const app = createApp(App)
const pinia = createPinia();

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.baseURL = 'http://localhost:8000';

app.use(pinia);
app.mount('#app')
