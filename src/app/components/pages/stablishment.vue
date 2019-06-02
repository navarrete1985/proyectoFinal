<template>
  <div class="wrapper">
    <preloader :visible="loading" :global="true"></preloader>
    <div class="row">
      <div
        v-for="stablishment in pagination.docs"
        v-bind:key="stablishment._id"
        class="col-lg-6 col-xl-3 col-md-6"
      >
        <div class="card rounded-card user-card">
          <div class="card-block">
            <div class="img-hover">
              <img
                class="img-fluid img-radius"
                src="http://localhost:3000/src/users/default.png"
                alt="round-img"
              >
              <div class="img-overlay img-radius">
                <span>
                  <span>
                    <!-- <a href="#" class="btn btn-sm btn-primary" data-popup="lightbox"><i class="icofont icofont-plus"></i></a>
                    <a href="" class="btn btn-sm btn-primary"><i class="icofont icofont-link-alt"></i></a>-->
                    <router-link
                      :to="{path: stablishment._id}"
                      append
                      class="btn btn-sm btn-primary"
                    >
                      <i class="icofont icofont-plus"></i>
                    </router-link>
                  </span>
                </span>
              </div>
            </div>
            <div class="user-content">
              <h4 class>{{stablishment.name}}</h4>
              <p class="m-b-0 text-muted">{{stablishment.description}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <paginator :pagination="pagination" :range="2" @onPaginate="onPaginate">
      <template v-slot:prev>Anterior</template>
      <template v-slot:next>Siguiente</template>
    </paginator>
  </div>
</template>
<script>
import menu from "../../util/MenuEnums";
import menuTypes from "../store/other/type";
import commonTypes from "../store/other/type";
import usersTypes from "../store/users/type";
import stablishmentsTypes from "../store/stablishments/type";
import Paginator from "../elements/paginator";
import Preloader from "../shared/preloader";

export default {
  data() {
    return {
      loading: false
    };
  },
  methods: {
    async onPaginate(index) {
      this.loading = true;
      await this.$store.dispatch(
        stablishmentsTypes.actions.fetchStablishmentByPage,
        { page: index }
      );
      this.loading = false;
    }
  },
  components: { Paginator, Preloader },
  computed: {
    //   stablishments() {
    //       return this.$store.getters[
    //           stablishmentsTypes.getters.getAllStablishments
    //       ];
    //   },
    pagination() {
      return this.$store.getters[
        stablishmentsTypes.getters.getPageStablishment
      ];
    }
  },
  async beforeCreate() {
    this.$store.commit(commonTypes.mutations.updateGlobalLoader, true);
    let currentUser = localStorage.__DataUser
      ? JSON.parse(localStorage.__DataUser).user
      : null;
    console.log("Usuario --> ", currentUser);
    if (currentUser == null) {
      this.$router.replace("login");
    }
    this.$store.commit(usersTypes.mutations.updateCurrentUser, currentUser);

    let page = this.$store.getters[
      stablishmentsTypes.getters.getPageStablishment
    ];
    if (Object.entries(page).length === 0) {
      await this.$store.dispatch(
        stablishmentsTypes.actions.fetchStablishmentByPage,
        { page: 1, limit: 10 }
      );
    }
    this.$store.commit(
      menuTypes.mutations.updateNavPosition,
      menu.STABLISHMENTS
    );
    this.$store.commit(commonTypes.mutations.updateGlobalLoader, false);
  }
};
</script>

<style lang="scss" scoped>
.col-md-2 {
  flex: 0 0 135px !important;
  max-width: 135px !important;
  margin: 8px;
}

.list-group-item {
  position: relative;
  display: block;
  padding: 40px 17px;
  text-align: center;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
}

.mesas {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-direction: row;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
}

.buttons {
  margin-top: 35px;
}

.active {
  border: none;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.wrapper {
  width: 100%;
}
</style>