const namespace = 'tables';

const type_users = {
    namespace,
    getters: {
        getUserById: `${namespace}/getter:getUserById`,
        getAll: `${namespace}/getter:getAll`,
        getPageStablishment: `${namespace}/getter:getPageStablishment`,

    },
    mutations: {
        updateUserById: `${namespace}/mutation:updateUserById`,
        updatePageStablishment: `${namespace}/mutation:updateStablishment`,
    },
    actions: {
        fetchUserById: `${namespace}/action:fetchUserById`,
        fetchLogin: `${namespace}/action:fetchLogin`,
    }
}

export default type_users;
export {type_users};