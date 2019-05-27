<template>
    <div>
        <div class="card latest-update-card">
            <div class="card-header">
                <h5>Latest Updates</h5>
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
                            <p class="text-muted m-b-0 d-inline">4 hrs ago</p>
                            <i class="feather icon-briefcase bg-simple-c-pink update-icon"></i>
                        </div>
                        <div class="col">
                            <h6>+ 5 New Products were added!</h6>
                            <p class="text-muted m-b-0">Congratulations!</p>
                        </div>
                    </div>
                    <div class="row p-b-15">
                        <div class="col-auto text-right update-meta">
                            <p class="text-muted m-b-0 d-inline">1 day ago</p>
                            <i class="feather icon-check bg-simple-c-yellow  update-icon"></i>
                        </div>
                        <div class="col">
                            <h6>Database backup completed!</h6>
                            <p class="text-muted m-b-0">Download the <span class="text-c-blue">latest backup</span>.</p>
                        </div>
                    </div>
                    <div class="row p-b-0">
                        <div class="col-auto text-right update-meta">
                            <p class="text-muted m-b-0 d-inline">2 day ago</p>
                            <i class="feather icon-facebook bg-simple-c-green update-icon"></i>
                        </div>
                        <div class="col">
                            <h6>+1 Friend Requests</h6>
                            <p class="text-muted m-b-10">This is great, keep it up!</p>
                            <div class="table-responsive">
                                <table class="table table-hover m-b-0">
                                    <tbody>
                                        <tr>
                                            <td class="b-none">
                                                <a href="#!" class="align-middle">
                                                <img src="..\..\assets\images\avatar-2.jpg" alt="user image" class="img-radius img-40 align-top m-r-15">
                                                <div class="d-inline-block">
                                                    <h6>Jeny William</h6>
                                                    <p class="text-muted m-b-0">Graphic Designer</p>
                                                </div>
                                            </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
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