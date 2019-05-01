const namespace = 'other';

const type_users = {
    getters: {
        getGlobalLoaderState: `${namespace}/getter:getGlobalLoaderState`,
    },
    mutations: {
        updateGlobalLoader: `${namespace}/mutation:updateGlobalLoader`,
    },
    actions: {}
}

export default type_users;
export {type_users};