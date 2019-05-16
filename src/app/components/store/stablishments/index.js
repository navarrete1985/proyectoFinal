import types from './type';

const state = {
    stablishments : [],
}

const getters = {
    [types.getters.getAllStablishments]: (state) => state.stablishments,
}

const mutations = {
    [types.mutations.updateStablishments]: (state, data) => state.stablishments = data,
}
//Definimos a continuación las mutaciones que vamos a tener


const actions = {}
//Definimos a continuación las acciones que vamos a tener
actions[types.actions.fetchAllStablishments] = async ({ commit, getters, state, dispatch }) => {
    console.warn('Voy a realizar la petición');
    let response = await fetch(`${window.location.origin}/api/establishment`);
    console.warn('Realizada --> ', response);
    response = await response.json();
    console.warn('Json response --> ', response);
    if (response.result) {
        console.warn('Respuesta de la store --> ', response);
        commit(types.mutations.updateStablishments, response.response);
    }

    return response;
};


actions[types.actions.insertStablishment] = async ({ commit, getters, state, dispatch }, { stablishment }) => {
    let response = await fetch(`${window.location.origin}/api/establishment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stablishment)
    });
    if (response.status === 200) {
        let newStablishment = response.response[0];
        commit[types.mutations.insertStablisments]({ stablishment: newStablishment });
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