import types from './type';

const state = {
    gLoader: true,
}

const getters = {
    [types.getters.getGlobalLoaderState] (state, getters, rootState){
        return state.gLoader;
    },
}

//Definición de las mutaciones que vamos a tener(setter que no conlleven a operaciones asíncronas)
const mutations = {
    [types.mutations.updateGlobalLoader] (state, data) {
        state.gLoader = data;
    },
}

//Definición de las acciones que vamos a tener(acciones = operaciones asíncronas)
const actions = {}

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