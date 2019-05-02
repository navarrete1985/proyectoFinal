import Vue from 'vue';
import Vuex from 'vuex';

import otherModule from './other';
import allergenModule from './allergen';
import menuModule from './menu';
import offerModule from './offers';
import stablishmentModule from './stablishments';
import tablesModule from './tables';
import userModule from './users';
import waitersModule from './waiters';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        otherModule,
        allergenModule,
        menuModule,
        offerModule,
        stablishmentModule,
        tablesModule,
        userModule,
        waitersModule,
    }
})

export default store;