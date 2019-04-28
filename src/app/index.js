import App from './App.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Routes from './routes';
import BootstrapVue from 'bootstrap-vue';
// import Vuex from 'vuex';
import {config} from '@/components/store/Store.js';
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
let Vuex = config(Vue);
// Vue.use(Vuex); //Store para almacenar nuestros datos compartidos que sean reactivos

Vue.use(VueRouter);

let routes = Routes.routes;

//Asignación de las rutas a nuestro enrutador
const router = new VueRouter({
    mode: 'history',
    routes
});

// Vue.store = Vue.prototype.$store = {
//     user: null,
//     loader: true,
//     stablishment: null,
//     waiters: null,
//     baseUrl: window.location.origin
// }

new Vue({
    el: '#app',
    router,
    store: Vuex.store,
    computed: Vuex.computed,
    methods: Vuex.methods,
    render: h => h(App),
});