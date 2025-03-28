import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { MoveDirectivesPlugin } from 'vue-move-directives';

const app = createApp(App)
app.use(MoveDirectivesPlugin);

app.mount('#app')
