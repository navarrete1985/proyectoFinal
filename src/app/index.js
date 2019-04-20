import App from './App.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Routes from './routes';

let routes = Routes.routes;

Vue.use(VueRouter);

//Asignación de las rutas a nuestro enrutador
const router = new VueRouter({
    mode: 'history',
    routes
});

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
});