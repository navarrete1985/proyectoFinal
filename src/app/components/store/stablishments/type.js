const namespace = 'stablishment';

const type_stablishments = {
    namespace,
    getters: {
        getStablishmentById: `${namespace}/getter:getStablishmentById`,
        getAllStablishments: `${namespace}/getter:getAllStablishments`,
        getPageStablishment: `${namespace}/getter:getPageStablishment`,

    },
    mutations: {
        updateStablishmentById: `${namespace}/mutation:updateStablishmentById`,
        updateStablishmentByIdGet: `${namespace}/mutation:updateStablishmentByIdGet`,
        updateStablishments: `${namespace}/mutation:updateStablishments`,
        updatePageStablishment: `${namespace}/mutation:updatePageStablishment`,
    },
    actions: {
        fetchAllStablishments: `${namespace}/action:fetchAllStablishments`,
        getStablishmentById: `${namespace}/action:getStablishmentById`,
        updateStablishmentById: `${namespace}/action:updateStablishmentById`,
        insertStablishment: `${namespace}/action:insertStablishment`,
        fetchStablishmentByPage: `${namespace}/action:fetchStablishmentByPage`,

    }
}

export default type_stablishments;
export {type_stablishments};