import Vue from 'vue';
import Vuex from 'vuex';

import otherModule from './other/index';
import allergenModule from './allergen/index';
import menuModule from './menu/index';
import offerModule from './offers/index';
import stablishmentModule from './stablishments/index';
import tablesModule from './tables/index';
import userModule from './users/index';
import waitersModule from './waiters/index';

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