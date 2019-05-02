import types from './type';

const state = {

}

const getters = {

}

const mutations = {}
//Definimos a continuación las mutaciones que vamos a tener


const actions = {}
//Definimos a continuación las acciones que vamos a tener

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