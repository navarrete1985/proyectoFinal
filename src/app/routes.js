import Login from './components/Login.vue';
import NotFound from './components/NotFound.vue';
import Prueba from './components/Prueba.vue';
import Forgot from './components/forgotPasswd.vue';

export default {
    routes: [
        {path: '/', name: 'index', component: Prueba},
        {path: '/login', name: 'login', component: Login},
        {path: '/forgot', name: 'login', component: Forgot},
        {path: '/asd', name: 'notfound', component: NotFound}
    ]
}