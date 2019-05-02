const namespace = 'tables';

const type_users = {
    namespace,
    getters: {
        getUserById: `${namespace}/getter:getUserById`,
        getAll: `${namespace}/getter:getAll`,
    },
    mutations: {
        updateUserById: `${namespace}/mutation:updateUserById`,
    },
    actions: {
        fetchUserById: `${namespace}/action:fetchUserById`,
        fetchLogin: `${namespace}/action:fetchLogin`,
    }
}

export default type_users;
export {type_users};