<template>
    <div>
        <div class="card">
            <div class="card-header">
                <h5>Cola de peticiones</h5>
            </div>
            <div class="row card-block">
                <div class="col-md-12">
                    <ul class="list-view">
                        <li>
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
                                                    Mesa 5</h6>
                                            </div>
                                            <label class="label label-info">hace 1 min</label>
                                            <p>La mesa 5 solicita la cuenta</p>
                                            <div class="m-t-15">
                                                <button type="button" data-toggle="tooltip" title="" class="btn btn-facebook btn-mini waves-effect waves-light" data-original-title="Facebook">
                                                    Atender
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="card list-view-media">
                                <div class="card-block">
                                    <div class="media">
                                        <a class="media-left" href="#">
                                            <img width="100px" class="media-object card-list-img" src="..\..\assets\images\mesa.jpg" alt="Generic placeholder image">
                                            <i class="feather lovebien icon-check bg-simple-c-yellow update-icon"></i>

                                        </a>
                                        <div class="media-body">
                                            <div class="col-xs-12">
                                                <h6 class="d-inline-block">
                                                    Mesa 20</h6>
                                            </div>
                                            <label class="label label-info">hace 2 min</label>
                                            <p>La mesa 20 solicita atención perzonalizada</p>
                                            <div class="m-t-15">
                                                <button type="button" data-toggle="tooltip" title="" class="btn btn-facebook btn-mini waves-effect waves-light" data-original-title="Facebook">
                                                    Atender
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="card list-view-media">
                                <div class="card-block">
                                    <div class="media">
                                        <a class="media-left" href="#">
                                            <img width="100px" class="media-object card-list-img" src="..\..\assets\images\mesa.jpg" alt="Generic placeholder image">
                                            <i class="feather lovebien icon-user bg-simple-c-green update-icon"></i>

                                        </a>
                                        <div class="media-body">
                                            <div class="col-xs-12">
                                                <h6 class="d-inline-block">
                                                    Mesa 34</h6>
                                            </div>
                                            <label class="label label-info">hace 2 min</label>
                                            <p>La mesa 34 solicita realizar un pedido</p>
                                            <div class="m-t-15">
                                                <button type="button" data-toggle="tooltip" title="" class="btn btn-facebook btn-mini waves-effect waves-light" data-original-title="Facebook">
                                                    Atender
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import table_types from '@/components/store/tables/type';

    export default {
        data() {
            return {
                queue: {},
            }
        },
        props: {
            activity: {
                type: Object,
                required: true
            },
            establishment_id: {
                type: Number,
                required: true
            },
        },
        methods: {
            register() {

            },
        },
        async created() {
            await this.$store.dispatch(table_types.actions.getTableByIdStablishment, this.establishment_id);
            this.register();
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