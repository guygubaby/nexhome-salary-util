import { createHead } from '@vueuse/head'
import vhCheck from 'vh-check'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router/index'

import { store } from '@/store/index'

import 'windi.css'
import './styles/main.scss'

const head = createHead()

const app = createApp(App)

vhCheck('vh-offset')

app.use(store)
app.use(head)
app.use(router)

app.mount('#app')
