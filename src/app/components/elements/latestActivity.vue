<template>
    <div>
        <div class="card latest-update-card">
            <div class="card-header">
                <h5>Últimas acciones</h5>
                <div class="card-header-right">
                </div>
            </div>
            <div class="card-block">
                <div v-if="load" class="latest-update-box">
                    <div v-for="item in tables" :key="item._id" class="row p-b-15">
                        <div class="col-auto text-right update-meta">
                            <p class="text-muted m-b-0 d-inline">{{calculateDiff(item.time_state_change)}} minutos</p>
                            <i v-if="item.state === 0" class="feather lovebien icon-unlock bg-simple-c-yellow update-icon"></i>
                            <i v-else-if="item.state === 1" class="feather lovebien icon-message-square bg-simple-c-yellow update-icon"></i>
                            <i v-else-if="item.state === 2" class="feather lovebien icon-user bg-simple-c-green update-icon"></i>
                            <i v-else class="feather lovebien icon-credit-card bg-simple-c-pink update-icon"></i>
                        </div>
                        <div class="col">
                            <h6>Mesa {{item.name}} - Sección: {{item.section}}</h6>
                            <p v-if="item.state === 0">Queda liberada.</p>
                            <p v-else-if="item.state === 1">Quiere realizar un pedido.</p>
                            <p v-else-if="item.state === 2">Solicita atención personalizada.</p>
                            <p v-else>Solicita la cuenta.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import tablesTypes from '@/components/store/tables/type';
    import commonTypes from '@/components/store/other/type';

    export default {
        props: {
            establishment_id: {
                type: String,
                required: true
            },
        },
        data() {
            return {
                load: false,
            }
        },
        computed: {
            tables() {
               let tables = this.$store.getters[tablesTypes.getters.getAllTablesByEstablishmentId](this.establishment_id);
               return tables.slice(0, 5);
            }
        },
        methods: {
            calculateDiff(date) {
                let diff = Math.abs(new Date(date) - new Date());
                return  Math.floor((diff/1000)/60);
            },
        },
        async beforeMount() {
            this.$store.commit(commonTypes.mutations.updateGlobalLoader, true);
            await this.$store.dispatch(tablesTypes.actions.getTableByIdStablishment, this.establishment_id);
            this.$store.commit(commonTypes.mutations.updateGlobalLoader, false);
            this.load = true;
        }
    }
</script>

<style lang="scss" scoped>

</style>