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
    console.log("el id en el action"+id);
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
    return response.response[0];
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