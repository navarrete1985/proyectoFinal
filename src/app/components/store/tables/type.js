const namespace = 'tables';

const type_tables = {
    namespace,
    getters: {
        getTableByIdStablishment: `${namespace}/getter:getTableByIdStablishment`,

    },
    mutations: {
        updatesTableByIdStablisment: `${namespace}/mutation:updatesTableByIdStablisment`,
    },
    actions: {
        getTableByIdStablishment: `${namespace}/action:getTableByIdStablishment`,
        updateTableByIdStablisment: `${namespace}/action:updateTableByIdStablisment`,
    }
}

export default type_tables;
export {type_tables};