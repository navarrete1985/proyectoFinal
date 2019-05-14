<template>
  <div class="wrapper">
    <div class="page-body">
      <div class="row">
        <div class="col-sm-12">
          <!-- Basic Inputs Validation start -->
          <div class="card">
            <div class="card-header">
              <h5>Insertar establecimiento</h5>
              
            </div>
            <div class="card-block">
              <!-- <form id="main" method="post" action="/" novalidate> -->
                <div class="form-group row">
                  <label class="col-sm-2 col-form-label">Descripción</label>
                  <div class="col-sm-10">
                    <input
                      v-model="stablishment.description"
                      type="text"
                      class="form-control"
                      name="description"
                      id="description"
                      placeholder="Descripción"
                    >
                    <span class="messages"></span>
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-sm-2 col-form-label">Nombre</label>
                  <div class="col-sm-10">
                    <input
                      v-model="stablishment.name"
                      type="text"
                      class="form-control"
                      name="name"
                      id="name"
                      placeholder="Nombre"
                    >
                    <span class="messages"></span>
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-sm-2 col-form-label">Ofertas</label>
                  <div class="col-sm-10">
                    <input
                      v-model="stablishment.offers"
                      type="text"
                      class="form-control"
                      name="offers"
                      id="offers"
                      placeholder="offers"
                    >
                    <span class="messages"></span>
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-sm-2 col-form-label">Uuid</label>
                  <div class="col-sm-10">
                    <input
                      v-model="stablishment.uuid"
                      type="text"
                      class="form-control"
                      name="uuid"
                      id="uuid"
                      placeholder="uuid"
                    >
                    <span class="messages"></span>
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-sm-2"></label>
                  <div class="col-sm-10">
                    <button @click="insert" class="btn btn-primary m-b-0">Submit</button>
                  </div>
                </div>
              <!-- </form> -->
            </div>
          </div>
          <!-- Basic Inputs Validation end -->
          <!-- Tooltip Validation card start -->
        </div>
      </div>
      <!-- Form components Validation card end -->
    </div>
  </div>
</template>
<script>
const { Stablishment } = require("../../util/models.js");
import menu from "@/util/MenuEnums";
import menuTypes from "@/components/store/other/type";
import commonTypes from "@/components/store/other/type";
import usersTypes from "@/components/store/users/type";
import stablishmentsTypes from "@/components/store/stablishments/type";
import { console } from "../../util/helper";

export default {
  data() {
    return {
      stablishment: new Stablishment(),
      remember: false,
      error: {
        email: {
          state: true,
          message: "Formato de email inválido"
        },
        password: {
          state: true,
          message: "Contraseña inválida, al menos 6 carácteres y 1 mayúscula."
        },
        validate: {
          state: true,
          message: "Email o contraseña inválido."
        }
      }
    };
  },
  methods: {
    insert() {
      console.log(this.stablishment);
    }
  },
  computed: {
    stablishments() {
      return this.$store.getters[
        stablishmentsTypes.getters.getAllStablishments
      ];
    }
  },
  beforeMount() {
    this.$store.commit(commonTypes.mutations.updateGlobalLoader, true);
    let currentUser = localStorage.__DataUser
      ? JSON.parse(localStorage.__DataUser).user
      : null;
    console.log("Usuario --> ", currentUser);
    if (currentUser == null) {
      this.$router.replace("login");
    }
    this.$store.commit(usersTypes.mutations.updateCurrentUser, currentUser);
    this.$store.commit(
      menuTypes.mutations.updateNavPosition,
      menu.STABLISHMENTS
    );
    this.$store.commit(commonTypes.mutations.updateGlobalLoader, false);
    this.$store.dispatch(stablishmentsTypes.actions.fetchAllStablishments);
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