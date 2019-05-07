<template>
    <div class='wrapper'>
        <div class="row">
            <div v-for="user in users" v-bind:key="user._id" class="col-lg-6 col-xl-3 col-md-6">
                <div class="card rounded-card user-card">
                    <div class="card-block">
                        <div class="img-hover">
                            <img class="img-fluid img-radius" src="http://localhost:3000/src/users/default.png" alt="round-img">
                            <div class="img-overlay img-radius">
                                <span>
                                    <a href="#" class="btn btn-sm btn-primary" data-popup="lightbox"><i class="icofont icofont-plus"></i></a>
                                    <a href="" class="btn btn-sm btn-primary"><i class="icofont icofont-link-alt"></i></a>
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
    </div>
</template>

<script>
    import menu from '@/util/MenuEnums';
    import types from "@/components/store/users/type";
    import menuTypes from '@/components/store/other/type';
    import commonTypes from "@/components/store/other/type";
    import usersTypes from "@/components/store/users/type";

    export default {
        methods: {
            getFullName(user) {
                console.log(user);
                return `${user.name} ${user.lastName}`
            }
        },
        computed: {
            users() {
                return this.$store.getters[usersTypes.getters.getAllUsers];
            }
        },
        beforeMount() {
            this.$store.commit(commonTypes.mutations.updateGlobalLoader, true);
            let currentUser = localStorage.__DataUser ? JSON.parse(localStorage.__DataUser).user : null;
            console.log('Usuario --> ', currentUser);
            if(currentUser == null){
                this.$router.replace("login");
            }
            this.$store.commit(types.mutations.updateCurrentUser,currentUser);
            this.$store.commit(menuTypes.mutations.updateNavPosition, menu.USERS);
            this.$store.dispatch(usersTypes.actions.fetchAllUsers);
            this.$store.commit(commonTypes.mutations.updateGlobalLoader, false);
        },
    }
</script>

<style lang="scss" scoped>
    .wrapper {
        width: 100%;
    }
</style>