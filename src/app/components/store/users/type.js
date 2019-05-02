const namespace = 'users';

const type_users = {
    namespace,
    getters: {
        getUserById: `${namespace}/getter:getUserById`,
        getAll: `${namespace}/getter:getAll`,
        getCurrentUser: `${namespace}/getter:getCurrentUser`,
    },
    mutations: {
        updateUserById: `${namespace}/mutation:updateUserById`,
        updateCurrentUser: `${namespace}/mutation:updateCurrentUser`,
    },
    actions: {
        fetchUserById: `${namespace}/action:fetchUserById`,
        fetchLogin: `${namespace}/action:fetchLogin`,
    }
}

export default type_users;
export {type_users};