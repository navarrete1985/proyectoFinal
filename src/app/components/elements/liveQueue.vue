<template>
    <div>
        <div class="card">
            <div class="card-header">
                <h5>Cola de peticiones</h5>
            </div>
            <div class="row card-block">
                <div class="col-md-12">
                    <ul class="list-view">
                        <div class="content" v-if="load">
                            <li v-for="item in tablesWaiting" :key="item._id">
                                <div class="card list-view-media">
                                    <div class="card-block">
                                        <div class="media">
                                            <a class="media-left" href="#">
                                                <img width="100px" class="media-object card-list-img" src="..\..\assets\images\mesa.jpg" alt="Generic placeholder image">
                                                <i class="feather lovebien icon-credit-card bg-simple-c-pink update-icon"></i>

                                            </a>
                                            <div class="media-body">
                                                <div class="col-xs-12">
                                                    <h6 class="d-inline-block">
                                                        Mesa {{item.name}} - Sección: {{item.section}}</h6>
                                                </div>
                                                <label class="label label-info">{{calculateDiff(item.time_state_change)}} minutos</label>
                                                <p>La mesa 5 solicita la cuenta</p>
                                                <div class="m-t-15">
                                                    <button type="button" data-toggle="tooltip" title="" class="btn btn-facebook btn-mini waves-effect waves-light" data-original-title="Facebook">
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
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import table_types from '@/components/store/tables/type';
    import Pusher from 'pusher-js';

    export default {
        data() {
            return {
                queue: {},
                channel: {},
                tablesWaiting: [],
                load: false,
            }
        },
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
                Pusher.logToConsole = true;

                let pusher = new Pusher("e44d00fb9c45fb71f1f3", {
                    cluster: 'eu',
                    forceTLS: true
                });

                this.channel = pusher.subscribe(this.establishment_id);

                this.channel.bind('onUpdateEstablishment', (data) => {
                    this.tablesWaiting = [];
                    this.updateState(data.all);
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
            }
        },
        async created() {
            await this.$store.dispatch(table_types.actions.getTableByIdStablishment, this.establishment_id);
            this.register();
            this.prepareTablesWaiting();
            this.load = true;
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
</style>