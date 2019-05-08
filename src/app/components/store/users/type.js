const namespace = 'users';

const type_users = {
    namespace,
    getters: {
        getUserById: `${namespace}/getter:getUserById`,
        getAllUsers: `${namespace}/getter:getAllUsers`,
        getCurrentUser: `${namespace}/getter:getCurrentUser`,
    },
    mutations: {
        updateUserById: `${namespace}/mutation:updateUserById`,
        updateCurrentUser: `${namespace}/mutation:updateCurrentUser`,
        updateUsers: `${namespace}/mutation:updateUsers`,
    },
    actions: {
        fetchUserById: `${namespace}/action:fetchUserById`,
        fetchLogin: `${namespace}/action:fetchLogin`,
        fetchAllUsers: `${namespace}/action:fetchAllUsers`,
    }
}

export default type_users;
export {type_users};