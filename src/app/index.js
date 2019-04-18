import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Login from './components/Login.vue';
import NotFound from './components/NotFound.vue';

Vue.use(VueRouter);

//Declaración de las rutas
const routes = [
    {path: '/', name: 'index', component: App},
    {path: '/login', name: 'login', component: Login},
    {path: '/asd', name: 'notfound', component: NotFound}
]

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