const namespace = 'stablishment';

const type_stablishments = {
    namespace,
    getters: {
        getStablishmentById: `${namespace}/getter:getStablishmentById`,
        getAllStablishments: `${namespace}/getter:getAllStablishments`,
    },
    mutations: {
        updateStablishmentById: `${namespace}/mutation:updateStablishmentById`,
        updateStablishments: `${namespace}/mutation:updateStablishments`,
    },
    actions: {
        fetchAllStablishments: `${namespace}/action:fetchAllStablishments`,
        insertStablishment: `${namespace}/action:insertStablishment`,
    }
}

export default type_stablishments;
export {type_stablishments};