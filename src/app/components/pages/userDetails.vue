<template>
    <div>
        <loader :visible="loading" :global="true"></loader>
        <div class="page-header">
            <div class="row align-items-end">
                <div class="col-lg-8">
                    <div class="page-header-title">
                        <div class="d-inline">
                            <h4>Perfil de Usuario</h4>
                            <span>Realize las operaciones pertinentes de edición de usaurios</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <profile-header :imageBanner="imageBanner" :imageProfile="imageProfile">
            <template v-if="firstloader" v-slot:title>{{`${user.name} ${user.lastName}`}}</template>
            <template v-if="firstloader" v-slot:subtitle>{{user.email}}</template>
        </profile-header>
        <div class="row">
            <div class="col-lg-12">
                <tab-menu :arrayTabs="['General', 'Imágenes', 'Favoritos']" @changeTab="changeTab"></tab-menu>
                <!-- tab content start -->
                <div class="tab-content">
                    <!-- tab panel personal start -->
                    <div class="tab-pane active" id="personal" role="tabpanel">
                        <!-- personal card start -->
                        <div v-show="index === 0" class="card">
                            <user-form v-if="load" :user="user" @onUpdateUser="updateUser"></user-form>
                            <!-- end of card-block -->
                        </div>
                        <div v-show="index === 1" class="card">
                            <div class="card-header">
                                <h5 class="card-header-text">Imágenes</h5>
                                <span>Actualiza la imagen de perfirl del usuario.</span>
                            </div>
                            <div class="card-block">
                                <div class="view-info">
                                    <div class="row d-flex flex-row justify-content-center">
                                        <div class="col-md-12">
                                            <upload :filter="/\.(jpe?g|png|gif)$/i"
                                                    :defaultImagePreview="'../../images/default.png'"
                                                    :endpoint="endpoint"
                                                    :limit="1"
                                                    @onUploadProgress="onUploadProgress"
                                                    @onFinish="onFinish"
                                                    @beforeUpload="beforeUpload"
                                                    @onError="onError"
                                                    @onAdded="onAdded"
                                                    @beforeAdded="beforeAdded">
                                            </upload>
                                        </div>
                                    </div>
                                    <!-- end of row -->
                                </div>
                            </div>
                        </div>
                        <div v-show="index === 2" class="card">
                            <div class="card-header">
                                <h5 class="card-header-text">Establecimientos Favoritos</h5>
                                <span>Consulta el listado de establecimientos favoritos que posee el usario.</span>
                            </div>
                            <div class="card-block">
                                <div class="view-info">
                                    <favorites :establishments="establishments"></favorites>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- tab content end -->
            </div>
        </div>
    </div>
</template>

<script>
    import menu from '../../util/MenuEnums';
    import menuTypes, { type_users } from '../store/other/type';
    import ProfileHeader from '../elements/profileHeader';
    import TabMenu from '../elements/tabMenu';
    import Upload from '@/components/elements/upload';
    import commonTypes from "../store/other/type";
    import userTypes from '@/components/store/users/type';
    import Loader from "@/components/shared/preloader";
    import UserForm from "@/components/elements/userForm";
    import Favorites from "@/components/elements/favorites";

    export default {
        data() {
            return {
                params: {},
                endpoint: `${window.location.origin}/upload/user/${this.$route.params.id}`,
                index: 0,
                loading: false,
                lastState: {},
                load: false,
                imageBanner: `${window.location.origin}/src/users/default-bg.jpg`,
                imageProfile:  `${window.location.origin}/src/users/default.png`,
                firstloader: false,
                establishments: [
                                    "5cae1cc2066265087ae606a7",
                                    "5cdb2f9bd432f241402447c1",
                                    "5cdc55161d433c2b604ef2f1",
                                ]
            }
        },
        components: {ProfileHeader, TabMenu, Upload, Loader, UserForm, Favorites},
        methods: {
            beforeUpload(evt) {
                evt.waitUntil(new Promise((resolve, reject) => {
                     this.$swal({
                        title: 'Confirmación',
                        text: "¿Desea cambiar la imagen de usuario?",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Confirmar'
                    }).then((result) => {
                        if (result.value) {
                            resolve();
                        }
                    })
                })) 
            },
            onUploadProgress(percentage) {
                console.warn('On progress state --> ', percentage);
            },
            onFinish(response) {
                if (response && response.data && !response.data.error) {
                    this.$root.alertSuccess();
                    delete response.data.result.password;
                    this.$store.commit(userTypes.mutations.updateUserById, response.data.result);
                    if (response.data.result.photo_url) this.imageProfile = `${window.location.origin}/${response.data.result.photo_url}?t=${new Date().getTime()}`;
                }
            },
            onError(message) {
                this.$root.alertError({text: message});
            },
            onAdded(elements) {
                console.log(`OnAdded elements --> ${elements}`);
            },
            beforeAdded() {
                console.log('BeforeAdded...');
            },
            getImageBanner() {
                return `${window.location.origin}/src/users/default-bg.jpg`;
            },
            getImageProfile() {
                return `${window.location.origin}/${this.user && this.user.photo_url ? this.user.photo_url : '/src/users/default.png'}`;
            },
            changeTab(index) {
                this.index = index;
            },
            async updateUser(user) {
                this.loading = true;
                let response = await this.$store.dispatch(userTypes.actions.fetchUserById, user);
                this.loading = false;
                if (response.status === 200) this.$root.alertSuccess();
                else this.$root.alertError({text: 'Ha ocurrido algún error al intentar actualizar al usuario'});
            }
        },
        computed: {
            user() {
                return this.$store.getters[userTypes.getters.getUserById](this.$route.params.id);
            },
        },
        async beforeCreate() {
            this.$store.commit(menuTypes.mutations.updateNavPosition, menu.USERS);
            let response = await this.$store.dispatch(userTypes.actions.fetchGetUserById, this.$route.params.id);
            if (response.status === 200) {
                if (response.response.photo_url) this.imageProfile = `${window.location.origin}/${response.response.photo_url}?t=${new Date().getTime()}`
            }
            this.$store.commit(commonTypes.mutations.updateGlobalLoader, false);
            this.load = true;
            this.firstloader = true;
        }
    }
</script>

<style lang="scss" scoped>

</style>