import Login from './components/pages/Login.vue';
import NotFound from './components/pages/NotFound.vue';
import Prueba from './components/pages/Prueba.vue';
import Forgot from './components/pages/forgotPasswd.vue';
import home from './components/pages/home.vue';

export default {
    routes: [
        {path: '/login', name: 'login', component: Login},
        {path: '/forgot', name: 'login', component: Forgot},
        {path: '/dashboard', name: 'home', component: home},
        {path: '/asd', name: 'notfound', component: NotFound},
        {path: '*', name: 'index', component: Prueba}

    ]
}