import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import store from './store'


const app = createApp(App)
app.use(router, VueSidebarMenu)
app.use(store)
app.mount('#app')