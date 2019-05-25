import Vue from 'vue';
import types from './type';

const state = {
    currentUser: {
        user: "",
        remember:"",
    },
    users: [],
    userPage: {},
}

const getters = {
    [types.getters.getUserById]: (state, getters) => (id) => {
        return state.users.find(item => item._id === id);
    },
    [types.getters.getAllUsers]: (state) => state.users,
    [types.getters.getCurrentUser]: (state) => state.currentUser,
    [types.getters.getPageUser]: (state) => state.userPage,
}

const mutations = {
    [types.mutations.updateCurrentUser]: (state, data) => state.currentUser = data,
    [types.mutations.updateUserById]: (state, newUser) => {
        state.users.find((user, index) => {
            if (user._id === newUser._id) {
                Vue.set(state.users, index, newUser);
                return true;
            }
        });
    },
    [types.mutations.updateUsers]: (state, data) => state.users = data,
    [types.mutations.updatePageUser]: (state, data) => state.userPage = data,
    [types.mutations.addUser]: (state, data) => state.users.push(data),
}

const actions = {};

actions[types.actions.fetchUserById] = async ({ commit, getters, state, dispatch }, user) => {
    
    let response = await fetch(`${window.location.origin}/api/user`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
    if (response.status === 200) {
        response = await response.json();
        let newUser = response.response;
        console.log('Vamos a actualizar a --> ', newUser );
        commit(types.mutations.updateUserById, newUser);
    }

    return response;
};

actions[types.actions.fetchLogin] = async ({ commit, getters, state, dispatch }, { email, password }) => {
    let response = await fetch(`${window.location.origin}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    response = await response.json();
    if (response.ok) {
        commit(types.mutations.updateCurrentUser, response.user);
    }

    return response;
};

actions[types.actions.fetchAllUsers] = async ({ commit, getters, state, dispatch }) => {
    let response = await fetch(`${window.location.origin}/api/user`);
    
    if (response.status !== 200) {
        console.error('Error en la petición');
        return;
    } 
    let json = await response.json();
    commit(types.mutations.updateUsers, json.response);

    return json;
};

actions[types.actions.fetchUserByPage] = async ({commit, getters, state, dispatch}, page) => {
    console.warn('Voy a realizar la petición');
    let response = await fetch(`${window.location.origin}/api/user/pagination`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(page)
    });
    console.warn('Realizada --> ', response);
    if (response.status !== 200) {
        console.error('Error en la petición');
        return;
    } 
    let json = await response.json();
    json.status = response.status;
    console.warn('Respuesta de la store --> ', json);
    commit(types.mutations.updatePageUser, json);

    return json;
}

actions[types.actions.fetchGetUserById] = async ({commit, getters, state, dispatch}, id) => {
    let user = getters[types.getters.getUserById](id);
    console.log('El usuario que intento recoger de vuex es --> ', user);
    if (user) return user;

    let response = await fetch(`${window.location.origin}/api/user/${id}`, {
        methods: 'GET',
        headers: {
            'Authorization': `basic ${getters[types.getters.getCurrentUser].token}`
        }
    });

    if (response.status !== 200) {
        console.log('Error en la petición');
        return undefined;
    }

    let jsonResponse = await response.json();
    if (jsonResponse.result) {
        commit(types.mutations.addUser, jsonResponse.response);
    }
    return jsonResponse;
}


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