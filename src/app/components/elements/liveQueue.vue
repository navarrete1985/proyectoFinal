<template>
    <div>
        <div class="card">
            <div class="card-header">
                <h5>Cola de peticiones</h5>
            </div>
            <div class="row card-block">
                <div class="col-md-12 container-queue">
                    <VuePerfectScrollbar :settings="settings" class="scroll-area">
                        <ul class="list-view">
                            <div class="content" v-if="load">
                                <li v-for="item in tablesWaiting" :key="item._id">
                                    <div class="card list-view-media">
                                        <div class="card-block">
                                            <div class="media">
                                                <a class="media-left" href="#">
                                                    <img width="100px" class="media-object card-list-img" src="..\..\assets\images\mesa.jpg" alt="Generic placeholder image">
                                                    <i v-if="item.state === 1" class="feather lovebien icon-check bg-simple-c-yellow update-icon"></i>
                                                    <i v-else-if="item.state === 2" class="feather lovebien icon-user bg-simple-c-green update-icon"></i>
                                                    <i v-else class="feather lovebien icon-credit-card bg-simple-c-pink update-icon"></i>
                                                </a>
                                                <div class="media-body">
                                                    <div class="col-xs-12">
                                                        <h6 class="d-inline-block">
                                                            Mesa {{item.name}} - Sección: {{item.section}}</h6>
                                                    </div>
                                                    <label class="label label-info">{{calculateDiff(item.time_state_change)}} minutos</label>
                                                    <p v-if="item.state === 1">La mesa {{item.name}} de la sección {{item.section}} quiere realizar un pedido.</p>
                                                    <p v-else-if="item.state === 2">La mesa {{item.name}} de la sección {{item.section}} solicita atención personalizada.</p>
                                                    <p v-else>La mesa {{item.name}} de la sección {{item.section}} solicita la cuenta.</p>
                                                    <div class="m-t-15">
                                                        <button type="button" data-toggle="tooltip" title="" class="btn btn-facebook btn-mini waves-effect waves-light" data-original-title="Facebook" @click="free($event, item)">
                                                            Atendida
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </div>
                        </ul>
                    </VuePerfectScrollbar>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import table_types from '@/components/store/tables/type';
    import Pusher from 'pusher-js';
    import VuePerfectScrollbar from 'vue-perfect-scrollbar';
    import userTypes from '@/components/store/users/type';

    export default {
        data() {
            return {
                queue: {},
                channel: {},
                tablesWaiting: [],
                load: false,
                settings: {
                    maxScrollbarLength: 60
                },
                currentUserId: '',
            }
        },
        components: {VuePerfectScrollbar},
        props: {
            activity: {
                type: Object,
                required: true
            },
            establishment_id: {
                type: String,
                required: true
            },
        },
        computed: {
        },
        methods: {
            register() {
                let pusher = new Pusher("e44d00fb9c45fb71f1f3", {
                    cluster: 'eu',
                    forceTLS: true
                });

                this.channel = pusher.subscribe(this.establishment_id);

                this.channel.bind('onUpdateEstablishment', (data) => {
                    this.tablesWaiting = [];
                    this.updateState(data.all);
                    if (data.table.state !== 0) this.$root.toastSuccess({title: `Se ha añadido a la cola una nueva petición de la mesa ${data.table.name}` });
                    console.log(data);
                    this.$store.commit(table_types.mutations.updatesTableByIdStablisment, [data.all]);
                });
            },
            prepareTablesWaiting() {
                let all = this.$store.getters[table_types.getters.getTableByIdStablishment](this.establishment_id);
                this.updateState(all);
            },
            sortedTables() {
                this.tablesWaiting.sort((a, b) => new Date(a.time_state_change) - new Date(b.time_state_change))
            },
            updateState(data) {
                // if (data === undefined) return;
                data.section.forEach(section => {
                    section.tables.forEach(table => {
                        if (table.state !== 0) {
                            table.section = section.name;
                            this.tablesWaiting.push(table);
                        } 
                    })
                })
                this.sortedTables();
            },
            calculateDiff(date) {
                let diff = Math.abs(new Date(date) - new Date());
                return  Math.floor((diff/1000)/60);
            },
            free(evt, table) {
                this.$swal({
                    title: 'Confirmación',
                    text: "¿Desea liberar la mesa?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirmar'
                }).then((result) => {
                    if (result.value) {
                        let params = {
                            params: {
                                establishment_id: this.establishment_id,
                                user_id: this.currentUserId,
                                new_state: "0",
                                table_id: table._id
                            }
                        };
                        fetch(`${window.location.origin}/api/tables/change`, {
                            method: 'POST',
                            body: JSON.stringify(params),
                            headers:{
                                'Content-Type': 'application/json'
                            }
                        }).then(result => result.json())
                        .then(json => {
                            if (!json.error) this.$root.toastSuccess({title: `Se ha añadido liberado la mesa ${json.response.new_state.name} con éxito!`});
                        })
                    }
                    else this.$root.toastError({title: 'Operación abortada!'});
                })
            }
        },
        async created() {
            await this.$store.dispatch(table_types.actions.getTableByIdStablishment, this.establishment_id);
            this.prepareTablesWaiting();
            this.register();
            this.load = true;
            this.currentUserId = this.$store.getters[userTypes.getters.getCurrentUser]._id
        }

    }
</script>

<style lang="scss" scoped>

    .lovebien{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        text-align: center;
        padding: 12px 13px;
        font-size: 16px;
        color: #fff;
        margin-left: 10px;
        position: absolute;
        top: 78px;
        left: 76px;
    }

    .container-queue {
        position: relative;
    }

    .scroll-area {
        position: relative;
        margin: auto;
        width: 100%;
        max-height: 600px;
    }

    .content {

        .card {
            margin: 0px 16px 16px 30px;
        }
    }

</style>