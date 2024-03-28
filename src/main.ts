import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import loadComponents from './components-loader';

const app = createApp(App);

loadComponents(app);

app.mount('#app');
