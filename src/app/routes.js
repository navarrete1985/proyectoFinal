import Login from './components/pages/login.vue';
import NotFound from './components/pages/notfound.vue';
import Prueba from './components/pages/prueba.vue';
import Forgot from './components/pages/forgotPasswd.vue';
import EditStablishments from './components/pages/editstablishments.vue';
import Stablishment from './components/pages/stablishment.vue';
import Users from './components/pages/users.vue';
import Base from './components/shared/base';
import UserDetail from './components/pages/userDetails';
import StablishmentDetail from './components/pages/stablishmentDetails.vue';
import Tables from './components/pages/tables.vue';
import prueba from './components/pages/construccion.vue';


import { basename } from 'path';

export default {
    routes: [
        {path: '/login', name: 'login', component: Login},
        {path: '/forgot', name: 'forgot', component: Forgot},
        {path: '/prueba', name: 'prueba', component: prueba},
        {path: '/dashboard', name: 'home', component: Base, children: [
            {path: 'users', name: 'users', component: Users},
            {path: 'editstablishments', name: 'editstablishments', component: EditStablishments},            
            {path: 'users/:id', name: 'userDetail', component: UserDetail},
            {path: 'stablishments/:id', name: 'stablishmentDetail', component: StablishmentDetail},
            {path: 'stablishments', name: 'stablishments', component: Stablishment },
            {path: 'tables/:id', name: 'tables', component:Tables },

        ]},
        {path: '*', name: 'notfound', component: NotFound},
    ]
}