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
                            <p class="text-muted m-b-0 d-inline">1 min ago</p>
                            <i class="feather icon-credit-card bg-simple-c-pink update-icon"></i>
                        </div>
                        <div class="col">
                            <h6>Mesa 5</h6>
                            <p class="text-muted m-b-0">Cuenta!</p>
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
                this.$store.getter[tablesTypes.getters.getAllTablesByEstablishmentId](this.establishment_id).slice(0, 5);
            }
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