<template>
    <div class='wrapper'>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12" ref='container'>
                    <div class="btn-group-sm hidden" id="mini-fab">
                        <a href="#" class="btn btn-info btn-fab" data-toggle="tooltip" data-placement="left"
                            data-original-title="Other" title="" id="autre">
                            <i class="material-icons">
                                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                    <path fill="#000000"
                                        d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" />
                                </svg>
                            </i>
                        </a>
                        <a href="#" class="btn btn-warning btn-fab" data-toggle="tooltip" data-placement="left"
                            data-original-title="SMS" title="" id="sms" @click="$emit('onEventDispatch', $event)">
                            <i class="material-icons">
                                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                    <path fill="#000000"
                                        d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9Z" />
                                </svg>
                            </i>
                        </a>
                        <a href="#" class="btn btn-danger btn-fab" data-toggle="tooltip" data-placement="left"
                            data-original-title="Mail" title="" id="mail">
                            <i class="material-icons zmdi zmdi-account-add"></i>
                        </a>
                    </div>
                    <div class="btn-group">
                        <a href="javascript:void(0)" class="btn btn-success btn-fab" id="main" @click="toggle" v-closable="{exclude: ['container'], handler: 'onClose'}">
                            <i class="material-icons zmdi zmdi-edit"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            toggle() {
                $("#mini-fab").toggleClass('hidden');
            },
            onClose() {
                $("#mini-fab").addClass('hidden');
            }
        },
        beforeMount() {
            // $('[data-toggle="tooltip"]').tooltip();  
        }
    }
</script>

<style lang="scss" scoped>

    

    .btn-group, .btn-group-sm {

        z-index: 100;

        .btn-success:hover {
            background-color: rgba(90, 168, 120, 0.644) !important;
        }
        
        .btn-danger:hover {
            background-color: rgba(223, 120, 79, 0.644);
        }

        .btn-warning:hover {
            background-color: rgba(185, 129, 64, 0.644);
        }

        .btn-info:hover {
            background-color: rgba(75, 182, 196, 0.644);
        }
    }

    .btn-group-sm .btn-fab {
        position: fixed !important;
        right: 29px;
    }

    .btn-group .btn-fab {
        position: fixed !important;
        right: 20px;
    }

    #main {
        bottom: 20px;
    }

    #mail {
        bottom: 100px
    }

    #sms {
        bottom: 145px
    }

    #autre {
        bottom: 190px
    }

    .hidden {
        display: none!important;
    }

    .btn.btn-fab, .input-group-btn .btn.btn-fab {
        border-radius: 50%;
        font-size: 24px;
        height: 56px;
        margin: auto;
        min-width: 56px;
        width: 56px;
        padding: 0;
        overflow: hidden;
        -webkit-box-shadow: 0 1px 1.5px 0 rgba(0,0,0,.12), 0 1px 1px 0 rgba(0,0,0,.24);
        box-shadow: 0 1px 1.5px 0 rgba(0,0,0,.12), 0 1px 1px 0 rgba(0,0,0,.24);
        position: relative;
        line-height: normal;
    }

    .btn.btn-fab i.material-icons, .input-group-btn .btn.btn-fab i.material-icons {
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-12px,-12px);
        -ms-transform: translate(-12px,-12px);
        -o-transform: translate(-12px,-12px);
        transform: translate(-12px,-12px);
        line-height: 24px;
        width: 24px;
        color: black;
    }

    .btn-group-sm .btn.btn-fab, .btn-group-sm .input-group-btn .btn.btn-fab, .btn.btn-fab.btn-fab-mini, .input-group-btn .btn.btn-fab.btn-fab-mini {
        height: 40px;
        min-width: 40px;
        width: 40px;
    }

</style>