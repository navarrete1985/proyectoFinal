const namespace = 'other';

const type_users = {
    getters: {
        getGlobalLoaderState: `${namespace}/getter:getGlobalLoaderState`,
        getReload: `${namespace}/getter:getReload`,
        getNavPosition: `${namespace}/getter:getNavPosition`,
    },
    mutations: {
        updateGlobalLoader: `${namespace}/mutation:updateGlobalLoader`,
        updateReload: `${namespace}/mutation:updateReload`,
        updateNavPosition: `${namespace}/mutation:updateNavPosition`,
    },
    actions: {}
}

export default type_users;
export {type_users};