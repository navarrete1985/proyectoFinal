<template>
    <div>
        <div v-if="isFavorites" class="row">
            <div class="row simple-cards users-card">
                <div v-for="establishment in establishments" class="col-md-12 col-xl-4" :key="establishment._id">
                    <div  class="card user-card">
                        <div class="card-header-img">
                            <img class="img-fluid img-radius" src="..\..\assets\images\user-card\img-round2.jpg" alt="card-img">
                            <h4>Michelle House</h4>
                            <h5><a href="..\..\..\cdn-cgi\l\email-protection.htm" class="__cf_email__" data-cfemail="9afbf8f9aba8a9dafef5f7fbf3f4b4f9f5f7">[email&nbsp;protected]</a></h5>
                            <h6>Systems Administrator</h6>
                        </div>

                        <div class="row justify-content-center">
                            <div class="col-auto">
                                <div class="label-icon">
                                    <i class="icofont icofont-bell-alt"></i>
                                    <label class="badge badge-primary badge-top-right">9</label>
                                </div>
                            </div>
                            <div class="col-auto">
                                <div class="label-icon">
                                    <i class="icofont icofont-heart"></i>
                                    <label class="badge badge-success badge-top-right">9</label>
                                </div>
                            </div>
                            <div class="col-auto">
                                <div class="label-icon">
                                    <i class="icofont icofont-bag-alt"></i>
                                    <label class="badge badge-danger badge-top-right">9</label>
                                </div>
                            </div>
                            <div class="col-auto">
                                <div class="label-icon">
                                    <i class="icofont icofont-ui-message"></i>
                                    <label class="badge badge-info badge-top-right">9</label>
                                </div>
                            </div>
                        </div>

                        <p>Lorem ipsum dolor sit amet, consectet ur adipisicing elit, sed do eiusmod temp or incidi dunt ut labore et.</p>
                        <div>
                            <button type="button" class="btn btn-primary waves-effect waves-light m-r-15"><i class="icofont icofont-plus m-r-5"></i>Follow</button>
                            <button type="button" class="btn btn-success waves-effect waves-light"><i class="icofont icofont-user m-r-5"></i>Profile</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="empty">

        </div>
    </div>
</template>

<script>
    export default {
        props: {
            establishments: {
                type: Array,
                required: true
            }
        },
        methods: {
            isFavorites() {
                return establishments.length > 0;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>