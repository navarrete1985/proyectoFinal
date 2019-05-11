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
        state.users.find(item => item._id === id);
    },
    [types.getters.getAllUsers]: (state) => state.users,
    [types.getters.getCurrentUser]: (state) => state.currentUser,
    [types.getters.getPageUser]: (state) => state.userPage,
}

const mutations = {
    [types.mutations.updateCurrentUser]: (state, data) => state.currentUser = data,
    [types.mutations.updateUserById]: (state, { id, newUser }) => {
        return state.users.find(user => {
            if (user._id === id) {
                user = newUser;
                return true;
            }
        });
    },
    [types.mutations.updateUsers]: (state, data) => state.users = data,
    [types.mutations.updatePageUser]: (state, data) => state.userPage = data,
}

const actions = {};

actions[types.actions.fetchUserById] = async ({ commit, getters, state, dispatch }, { user, id }) => {
    user.id = id;
    let response = await fetch(`${window.location.origin}/api/user`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
    if (response.status === 200) {
        let newUser = response.response[0];
        commit[types.mutations.updateUserById]({ id: newUser.user_id, newUser });
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
    console.warn('Json response --> ', json);
    console.warn('Respuesta de la store --> ', json.itemsList);
    commit(types.mutations.updateUsers, json.itemsList);

    return json;
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