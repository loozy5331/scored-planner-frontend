import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import Cookies from 'js-cookie'
import router from './router'
import store from './store'

const app = createApp(App);

// cookies
app.config.globalProperties.cookies = Cookies;

// set axios
const axios_ = axios.create({
    // baseURL: 'http://localhost:8000',
    baseURL: 'http://ec2-52-78-162-84.ap-northeast-2.compute.amazonaws.com:8000',
    headers: {
        'xsrfCookieName': 'csrftoken',
        'xsrfHeaderName': 'X-CSRFTOKEN',
        'withCredentials': true
    }
});
app.config.globalProperties.axios = axios_;

app.use(router).use(store).mount('#app');