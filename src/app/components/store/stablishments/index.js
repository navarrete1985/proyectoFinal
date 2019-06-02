import types from './type';
import Vue from 'vue';

const state = {
    stablishments: [],
    stablishentPage: {},

}

const getters = {
    [types.getters.getAllStablishments]: (state) => state.stablishments,
    [types.getters.getStablishmentById]: (state) => {
        return id => {
            return state.stablishments.find(x => {
                console.log(`Resultado --> ${x._id === id}`)
                 return x._id === id
                 });
        }
    },
    [types.getters.getPageStablishment]: (state) => state.stablishentPage,
}

const mutations = {
    [types.mutations.updateStablishments]: (state, data) => state.stablishments = data,
    [types.mutations.updateStablishmentByIdGet]: (state, data) =>{
        console.log("resultado de mutacion-->"+data)
        state.stablishments.push(data[0]);
    } ,
    [types.mutations.updatePageStablishment]: (state, data) => state.stablishentPage = data,

    // [types.mutations.updateStablishmentById]: (state, data) => state.stablishments.find(x => {
    //     if (x._id === data._id) {
    //         state.stablishments.push(x);
    //         return true;
    //     }
    //     return false;
    // }),
    [types.mutations.updateStablishmentById]: (state, data) => state.stablishments.find((establishment,index) => {
        console.log("ANTES DE BUSCAR EN MUTACION"+data);
        if (establishment._id === data._id) {
            console.log("mutacion de update para la store del update"+data);
            Vue.set(state.stablishments, index, data);
            return true;
        }
        return false;
    }),

}
//Definimos a continuación las mutaciones que vamos a tener


const actions = {}
//Definimos a continuación las acciones que vamos a tener
actions[types.actions.fetchAllStablishments] = async ({ commit, getters, state, dispatch }) => {
    let response = await fetch(`${window.location.origin}/api/establishment`);
    response = await response.json();
    if (response.result) {
        commit(types.mutations.updateStablishments, response.response);
    }

    return response;
};

actions[types.actions.getStablishmentById] = async ({ commit, getters, state, dispatch }, id) => {
    let result = getters[types.getters.getStablishmentById](id);
    if (result != undefined) {
        return result;
    }
    let response = await fetch(`${window.location.origin}/api/establishment/${id}`);
    response = await response.json();
    if (response.result) {
        console.log("antes del commit"+response.response);
        commit(types.mutations.updateStablishmentByIdGet, response.response);
    }
    return response.response[0];
};

actions[types.actions.fetchStablishmentByPage] = async ({commit, getters, state, dispatch}, page) => {
    console.log("action!")
    console.log(page);
    let response = await fetch(`${window.location.origin}/api/establishment/pagination`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(page)
    });
    if (response.status !== 200) {
        console.error('Error en la petición');
        return;
    } 
    let json = await response.json();
    json.status = response.status;
    commit(types.mutations.updatePageStablishment, json);

    return json;
}

actions[types.actions.insertStablishment] = async ({ commit, getters, state, dispatch }, stablishment) => {
    console.log(stablishment);
    let response = await fetch(`${window.location.origin}/api/establishment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stablishment)
    });

    console.log(response);
    if (response.status === 200) {
        let newStablishment = response.response;
        state.stablishments.push(newStablishment);
    }
    return response;
};


actions[types.actions.updateStablishmentById] = async ({ commit, getters, state, dispatch }, stablishment) => {
    console.log("action!")
    console.log(stablishment);
    let response = await fetch(`${window.location.origin}/api/establishment`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stablishment)
    });

    console.log("respuesta de la bd al update"+response);
    if (response.status === 200) {
        commit(types.mutations.updateStablishmentById, stablishment);
    }
    return response;
};

const module = {
    namespaced: false,
    state,
    getters,
    actions,
    mutations,
    modules: {} //En caso de que necesitemos módularizar más añadimos aquí esos módulos
}

export default module;
export { module, types };