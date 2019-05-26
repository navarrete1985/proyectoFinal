<template>
    <div>
        <div class="card">
            <div class="card-header">
                <h5>List View</h5>
            </div>
            <div class="row card-block">
                <div class="col-md-12">
                    <ul class="list-view">
                        <li>
                            <div class="card list-view-media">
                                <div class="card-block">
                                    <div class="media">
                                        <a class="media-left" href="#">
                                            <img class="media-object card-list-img" src="..\..\assets\images\avatar-1.jpg" alt="Generic placeholder image">
                                        </a>
                                        <div class="media-body">
                                            <div class="col-xs-12">
                                                <h6 class="d-inline-block">
                                                    Heading</h6>
                                                <label class="label label-info">Agent</label>
                                            </div>
                                            <div class="f-13 text-muted m-b-15">
                                                Software Engineer
                                            </div>
                                            <p>Hi, This is my short intro text.
                                                Lorem ipsum is a dummy content sit
                                                dollar. You can copy and paste this
                                                dummy content from anywhere and to
                                                anywhere. Its all free and must be a
                                                good to folllow in prectice</p>
                                            <div class="m-t-15">
                                                <button type="button" data-toggle="tooltip" title="" class="btn btn-facebook btn-mini waves-effect waves-light" data-original-title="Facebook">
                                                    <span class="icofont icofont-social-facebook"></span>
                                                </button>
                                                <button type="button" data-toggle="tooltip" title="" class="btn btn-twitter btn-mini waves-effect waves-light" data-original-title="Twitter">
                                                    <span class="icofont icofont-social-twitter"></span>
                                                </button>
                                                <button type="button" data-toggle="tooltip" title="" class="btn btn-linkedin btn-mini waves-effect waves-light" data-original-title="Linkedin">
                                                    <span class="icofont icofont-brand-linkedin"></span>
                                                </button>
                                                <button type="button" data-toggle="tooltip" title="" class="btn btn-dribbble btn-mini waves-effect waves-light" data-original-title="Drible">
                                                    <span class="icofont icofont-social-dribble"></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="">
                            <div class="card list-view-media">
                                <div class="card-block">
                                    <div class="media">
                                        <a class="media-left" href="#">
                                            <img class="media-object card-list-img" src="..\..\assets\images\avatar-2.jpg" alt="Generic placeholder image">
                                        </a>
                                        <div class="media-body">
                                            <div>
                                                <h6 class="d-inline-block">
                                                    Heading</h6>
                                                <label class="label  label-info">Accountant</label>
                                            </div>
                                            <div class="f-13 text-muted m-b-15">
                                                Softwear Engineer
                                            </div>
                                            <p>Hi, This is my short intro text.
                                                Lorem ipsum is a dummy content sit
                                                dollar. You can copy and paste this
                                                dummy content from anywhere and to
                                                anywhere. Its all free and must be a
                                                good to folllow in prectice</p>
                                            <div class="m-t-15">
                                                <button type="button" data-toggle="tooltip" title="" class="btn btn-facebook btn-mini waves-effect waves-light" data-original-title="Facebook">
                                                    <span class="icofont icofont-social-facebook"></span>
                                                </button>
                                                <button type="button" data-toggle="tooltip" title="" class="btn btn-twitter btn-mini waves-effect waves-light" data-original-title="Twitter">
                                                    <span class="icofont icofont-social-twitter"></span>
                                                </button>
                                                <button type="button" data-toggle="tooltip" title="" class="btn btn-linkedin btn-mini waves-effect waves-light" data-original-title="Linkedin">
                                                    <span class="icofont icofont-brand-linkedin"></span>
                                                </button>
                                                <button type="button" data-toggle="tooltip" title="" class="btn btn-dribbble btn-mini waves-effect waves-light" data-original-title="Drible">
                                                    <span class="icofont icofont-social-dribble"></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="">
                            <div class="card list-view-media">
                                <div class="card-block">
                                    <div class="media">
                                        <a class="media-left" href="#">
                                            <img class="media-object card-list-img" src="..\..\assets\images\avatar-3.jpg" alt="Generic placeholder image">
                                        </a>
                                        <div class="media-body">
                                            <div>
                                                <h6 class="d-inline-block">
                                                    Heading</h6>
                                                <label class="label  label-info">Accountant</label>
                                            </div>
                                            <div class="f-13 text-muted m-b-15">
                                                Softwear Engineer
                                            </div>
                                            <p>Hi, This is my short intro text.
                                                Lorem ipsum is a dummy content sit
                                                dollar. You can copy and paste this
                                                dummy content from anywhere and to
                                                anywhere. Its all free and must be a
                                                good to folllow in prectice</p>
                                            <div class="m-t-15">
                                                <button type="button" data-toggle="tooltip" title="" class="btn btn-facebook btn-mini waves-effect waves-light" data-original-title="Facebook">
                                                    <span class="icofont icofont-social-facebook"></span>
                                                </button>
                                                <button type="button" data-toggle="tooltip" title="" class="btn btn-twitter btn-mini waves-effect waves-light" data-original-title="Twitter">
                                                    <span class="icofont icofont-social-twitter"></span>
                                                </button>
                                                <button type="button" data-toggle="tooltip" title="" class="btn btn-linkedin btn-mini waves-effect waves-light" data-original-title="Linkedin">
                                                    <span class="icofont icofont-brand-linkedin"></span>
                                                </button>
                                                <button type="button" data-toggle="tooltip" title="" class="btn btn-dribbble btn-mini waves-effect waves-light" data-original-title="Drible">
                                                    <span class="icofont icofont-social-dribble"></span>
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