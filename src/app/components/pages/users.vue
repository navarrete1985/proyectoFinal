<template>
    <div class='wrapper'>
        <floating-button @onEventDispatch='event'></floating-button>
        <preloader :visible="loading" :global="true"></preloader>
        <div class="row">
            <div v-for="user in pagination.docs" v-bind:key="user._id" class="col-lg-4 col-xl-3 col-md-4">
                <div class="card rounded-card user-card">
                    <div class="card-block">
                        <div class="img-hover">
                            <img class="img-fluid img-radius" src="http://localhost:3000/src/users/default.png" alt="round-img">
                            <div class="img-overlay img-radius">
                                <span>
                                    <!-- <a href="#" class="btn btn-sm btn-primary" data-popup="lightbox"><i class="icofont icofont-plus"></i></a>
                                    <a href="" class="btn btn-sm btn-primary"><i class="icofont icofont-link-alt"></i></a> -->
                                    <router-link :to="{path: user._id}" append class="btn btn-sm btn-primary"><i class="icofont icofont-plus"></i></router-link>
                                </span>
                            </div>
                        </div>
                        <div class="user-content">
                            <h4 class="">{{getFullName(user)}}</h4>
                            <p class="m-b-0 text-muted">{{user.email}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <paginator :pagination="pagination" :range="2" @onPaginate='onPaginate'>
            <template v-slot:prev>Anterior</template>
            <template v-slot:next>Siguiente</template>
        </paginator>
    </div>
</template>

<script>
    import menu from '../../util/MenuEnums';
    // import types from "@/components/store/users/type";
    import menuTypes from '../store/other/type';
    import commonTypes from "../store/other/type";
    import usersTypes from "../store/users/type";
    import FloatingButton from '../elements/floatingButton';
    import Paginator from '../elements/paginator';
    import Preloader from '../shared/preloader';

    export default {
        data() {
            return {
                loading: false
            }
        },
        methods: {
            getFullName(user) {
                console.log(user);
                return `${user.name} ${user.lastName}`
            },
            event(event) {
                console.log(event);
                console.warn('He entrado en el evento disparado');
            },
            async onPaginate(index) {
                this.loading = true;
                await this.$store.dispatch(usersTypes.actions.fetchUserByPage, {page: index});
                this.loading = false;
            },
            getUserRoute(user) {
                // return `/${user._id}`;
            }
        },
        components: {FloatingButton, Paginator, Preloader},
        computed: {
            pagination() {
                return this.$store.getters[usersTypes.getters.getPageUser];
            }
        },
        beforeMount() {
            this.$store.commit(commonTypes.mutations.updateGlobalLoader, true);
            // let currentUser = localStorage.__DataUser ? JSON.parse(localStorage.__DataUser).user : null;
            // console.log('Usuario --> ', currentUser);
            // if(currentUser == null){
            //     this.$router.replace("login");
            // }
            // this.$store.commit(types.mutations.updateCurrentUser,currentUser);
            this.$store.commit(menuTypes.mutations.updateNavPosition, menu.USERS);
            if (this.$store.getters[usersTypes.getters.getPageUser] === undefined) {
                this.$store.dispatch(usersTypes.actions.fetchUserByPage, {page: 1, limit: 10});
            }
            this.$store.commit(commonTypes.mutations.updateGlobalLoader, false);
        },
    }
</script>

<style lang="scss" scoped>
    .wrapper {
        width: 100%;
    }
</style>