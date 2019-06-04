<template>
    <div>
        <div class="card latest-update-card">
            <div class="card-header">
                <h5>Últimas acciones</h5>
                <div class="card-header-right">
                    <ul class="list-unstyled card-option">
                        <li><i class="fa fa fa-wrench open-card-option"></i></li>
                        <li><i class="fa fa-window-maximize full-card"></i></li>
                        <li><i class="fa fa-minus minimize-card"></i></li>
                        <li><i class="fa fa-refresh reload-card"></i></li>
                        <li><i class="fa fa-trash close-card"></i></li>
                    </ul>
                </div>
            </div>
            <div class="card-block">
                <div class="latest-update-box">
                    <div class="row p-b-15">
                        <div class="col-auto text-right update-meta">
                            <p class="text-muted m-b-0 d-inline">1 min ago</p>
                            <i class="feather icon-credit-card bg-simple-c-pink update-icon"></i>
                        </div>
                        <div class="col">
                            <h6>Mesa 5</h6>
                            <p class="text-muted m-b-0">Cuenta!</p>
                        </div>
                    </div>
                    <div class="row p-b-15">
                        <div class="col-auto text-right update-meta">
                            <p class="text-muted m-b-0 d-inline">2 min ago</p>
                            <i class="feather icon-check bg-simple-c-yellow  update-icon"></i>
                        </div>
                        <div class="col">
                            <h6>Mesa 20</h6>
                            <p class="text-muted m-b-0">Atención perzonalizada</p>
                        </div>
                    </div>
                     <div class="row p-b-0">
                        <div class="col-auto text-right update-meta">
                            <p class="text-muted m-b-0 d-inline">3 min ago</p>
                            <i class="feather icon-user bg-simple-c-green update-icon"></i>
                        </div>
                        <div class="col">
                            <h6>Mesa 34</h6>
                            <p class="text-muted m-b-10">Pedido</p>
                        </div>
                    </div>
                     <div class="row p-b-0">
                        <div class="col-auto text-right update-meta">
                            <p class="text-muted m-b-0 d-inline">2 min ago</p>
                            <i class="feather icon-user bg-simple-c-green update-icon"></i>
                        </div>
                        <div class="col">
                            <h6>Mesa 32</h6>
                            <p class="text-muted m-b-10">Pedido</p>
                        </div>
                    </div>
                    <div class="row p-b-15">
                        <div class="col-auto text-right update-meta">
                            <p class="text-muted m-b-0 d-inline">2 min ago</p>
                            <i class="feather icon-check bg-simple-c-yellow  update-icon"></i>
                        </div>
                        <div class="col">
                            <h6>Mesa 20</h6>
                            <p class="text-muted m-b-0">Atención perzonalizada</p>
                        </div>
                    </div>
                    <div class="row p-b-15">
                        <div class="col-auto text-right update-meta">
                            <p class="text-muted m-b-0 d-inline">2 min ago</p>
                            <i class="feather icon-credit-card bg-simple-c-pink update-icon"></i>
                        </div>
                        <div class="col">
                            <h6>Mesa 5</h6>
                            <p class="text-muted m-b-0">Cuenta!</p>
                        </div>
                    </div>
                    <div class="row p-b-15">
                        <div class="col-auto text-right update-meta">
                            <p class="text-muted m-b-0 d-inline">2 min ago</p>
                            <i class="feather icon-check bg-simple-c-yellow  update-icon"></i>
                        </div>
                        <div class="col">
                            <h6>Mesa 20</h6>
                            <p class="text-muted m-b-0">Atención perzonalizada</p>
                        </div>
                    </div>
                    <div class="row p-b-0">
                        <div class="col-auto text-right update-meta">
                            <p class="text-muted m-b-0 d-inline">3 min ago</p>
                            <i class="feather icon-user bg-simple-c-green update-icon"></i>
                        </div>
                        <div class="col">
                            <h6>Mesa 30</h6>
                            <p class="text-muted m-b-10">Pedido</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            activity: {
                type: Object,
                required: true
            },
            tables: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>