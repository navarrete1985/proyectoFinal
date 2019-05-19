import App from './App.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Routes from './routes';
import store from './components/store/Store.js';
import directives from './components/directives';
import VueSweetalert2 from 'vue-sweetalert2';
 
Vue.use(VueRouter);
Vue.use(VueSweetalert2);

let routes = Routes.routes;

//Asignación de las rutas a nuestro enrutador
const router = new VueRouter({
    mode: 'history',
    routes
});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
});