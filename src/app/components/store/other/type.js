const namespace = 'other';

const type_users = {
    getters: {
        getGlobalLoaderState: `${namespace}/getter:getGlobalLoaderState`,
        getReload: `${namespace}/getter:getReload`,
    },
    mutations: {
        updateGlobalLoader: `${namespace}/mutation:updateGlobalLoader`,
        updateReload: `${namespace}/mutation:updateReload`,
    },
    actions: {}
}

export default type_users;
export {type_users};