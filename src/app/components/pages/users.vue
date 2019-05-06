<template>
    <div>
        <div class="">Esto usuarios</div>
    </div>
</template>

<script>
    import menu from '@/util/MenuEnums';
    import types from "@/components/store/users/type";
    import menuTypes from '@/components/store/other/type';
    import commonTypes from "../store/other/type";

    export default {
        beforeMount() {
            let currentUser = localStorage.__DataUser ? JSON.parse(localStorage.__DataUser).user : null;
            console.log('Usuario --> ', currentUser);
            if(currentUser == null){
                this.$router.replace("login");
            }
            this.$store.commit(types.mutations.updateCurrentUser,currentUser);
            this.$store.commit(menuTypes.mutations.updateNavPosition, menu.USERS);
        },
        beforeCreate() {
            setTimeout(() => {
                this.$store.commit(commonTypes.mutations.updateGlobalLoader, false);
                //   console.log('Visible: ', this.$store.getters[commonTypes.getters.getGlobalLoaderState]);
            }, 1000);
        }
    }
</script>

<style lang="scss" scoped>

</style>