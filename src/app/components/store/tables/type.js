const namespace = 'tables';

const type_tables = {
    namespace,
    getters: {
        getTableByIdStablishment: `${namespace}/getter:getTableByIdStablishment`,
        getAllTablesByEstablishmentId: `${namespace}/getter:getAllTablesByEstablishmentId`,
    },
    mutations: {
        updatesTableByIdStablisment: `${namespace}/mutation:updatesTableByIdStablisment`,
    },
    actions: {
        getTableByIdStablishment: `${namespace}/action:getTableByIdStablishment`,
        updateTableByIdStablisment: `${namespace}/action:updateTableByIdStablisment`,
        createEstablishmentTables: `${namespace}/action:createEstablishmentTables`,
    }
}

export default type_tables;
export {type_tables};