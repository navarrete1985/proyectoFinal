import Login from './components/pages/Login.vue';
import NotFound from './components/pages/NotFound.vue';
import Prueba from './components/pages/Prueba.vue';
import Forgot from './components/pages/forgotPasswd.vue';
import Home from './components/pages/home.vue';
import Users from './components/pages/users.vue';
import Base from './components/shared/Base';
import { basename } from 'path';

export default {
    routes: [
        {path: '/login', name: 'login', component: Login},
        {path: '/forgot', name: 'forgot', component: Forgot},
        {path: '/dashboard', name: 'home', component: Base, children: [
            {path: 'users', name: 'users', component: Users},
            {path: 'home', name: 'users', component: Home},
        ]},
        {path: '/asd', name: 'notfound', component: NotFound},
        {path: '*', name: 'index', component: Prueba}

    ]
}