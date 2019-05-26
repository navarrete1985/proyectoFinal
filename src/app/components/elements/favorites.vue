<template>
    <div>
        <div v-if="isFavorites" class="row">
            <div class="row simple-cards users-card">
                <div v-for="establishment in establishments" class="col-md-6 col-xl-3" :key="establishment._id">
                    <div  class="card user-card">
                        <div class="card-header-img">
                            <div class="img-responsive pb-100" :style="{backgroundImage: getEsblishmentImage(establishment)}" alt="card-img"/>
                        </div>

                        <div class="content-wrapper">
                            <h4>{{establishment.name}}</h4>
                            <div class="ocupation">
                                <div class="label-icon">
                                    <i class="fa fa-group"></i>
                                    <label class="badge badge-primary badge-top-right">{{establishment.ocupation}}</label>
                                </div>
                            </div>
                            <span>{{establishment.description}}</span>
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

    import usersTypes from "../store/users/type";

    export default {
        data() {
            return {
                establishments: [],
            }
        },
        props: {
            idsEstablishments: {
                type: Array,
                required: true
            },
            default: {
                type: String,
                default: 'src/users/default.png'
            }
        },
        methods: {
            isFavorites() {
                return establishments.length > 0;
            },
            getEsblishmentImage(establishment) {
                let base = window.location.origin + '/';
                let image = base + this.default;
                if (establishment.photo_url.length > 0) {
                    let imageIndex = Math.floor((Math.random() * establishment.photo_url.length));
                    image = base + establishment.photo_url[imageIndex];
                }
                return 'url(' + image + ')';
            }
        },
        async beforeMount() {
            if (this.idsEstablishments.length > 0) {
                let headers = new Headers();
                headers.append('Content-Type', 'application/json');
                headers.append('Authorization', `basic ${this.$store.getters[usersTypes.getters.getCurrentUser].token}`)
                
                let response = await fetch(`${window.location.origin}/api/establishment/find`, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({ids: this.idsEstablishments}),
                });
                let jsonResponse = await response.json();
                if (jsonResponse.status === 200 && !jsonResponse.error) {
                    this.establishments = jsonResponse.response;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

    .row.simple-cards.users-card {
        padding: 8px;
    }

    .card.user-card {

        padding: 10px 0 !important;

        .content-wrapper {
            display: flex;
            flex-flow: column nowrap;
            padding: 8px;

            span {
                margin-top: 8px;
                height: 60px;
                overflow: hidden;
                display: inline-block;
                display: -webkit-box;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical;
            }

        }
    }
</style>