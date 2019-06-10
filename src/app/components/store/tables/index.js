import types from './type';

const state = {
    tables:[]
}

const getters = {
    [types.getters.getTableByIdStablishment]: (state) => {
        return id => {
            return state.tables.find(x => {
                console.log(`Resultado --> ${x.establishmentId === id}`)
                 return x.establishmentId === id
                 });
        }
    },
}

const mutations = {
    [types.mutations.updatesTableByIdStablisment]: (state, data) => state.tables = data,

}
//Definimos a continuación las mutaciones que vamos a tener


const actions = {}
//Definimos a continuación las acciones que vamos a tener
actions[types.actions.getTableByIdStablishment] = async ({ commit, getters, state, dispatch }, id) => {
    let result = getters[types.getters.getTableByIdStablishment](id);
    if (result != undefined) {
        return result;
    }
    let response = await fetch(`${window.location.origin}/api/tables/${id}`);
    response = await response.json();
    if (response.result) {
        console.log("antes del commit"+response.response);
        commit(types.mutations.updatesTableByIdStablisment, response.response);
    }
    if (response.response.length === 0) {
        await dispatch(
            types.actions.createEstablishmentTables,
            id
          );
    }
    return response.response[0];
};


actions[types.actions.createEstablishmentTables] = async ({ commit, getters, state, dispatch }, id) => {
    let response = await fetch(`${window.location.origin}/api/tables`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({establishmentId: id}),
    });

    if (response.status === 200) {
        response = await response.json();
        commit(types.mutations.updatesTableByIdStablisment, response.response);
    }
}

actions[types.actions.updateTableByIdStablisment] = async ({ commit, getters, state, dispatch }, table) => {
    console.log("action!")
    console.log(table);
    let response = await fetch(`${window.location.origin}/api/tables`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(table)
    });

    console.log("respuesta de la bd al update"+response);
    if (response.status === 200) {
        response = await response.json();
        commit(types.mutations.updatesTableByIdStablisment, response.response);
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
export {module, types};