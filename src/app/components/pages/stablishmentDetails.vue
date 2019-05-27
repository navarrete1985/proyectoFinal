<template>
  <div>
    <preloader :visible="loading" :global="true"></preloader>
    <div>
      <div class="row align-items-end"></div>
      <!-- "item == undefined"?urlbuena:default -->
      <profile-header
        :imageProfile="stablishment.image_logo == '' || stablishment.image_logo == undefined? defaultUrlLogo : urlStablishment+stablishment.image_logo"
        :imageBanner="stablishment.photo_url[0]==undefined?defaultUrlBanner:urlStablishment+stablishment.photo_url[0]"
      ></profile-header>
      <div class="row">
        <div class="col-lg-12">
          <tab-menu :arrayTabs="tabs" @changeTab="changeTab"></tab-menu>
          <!-- tab content start -->
          <div class="tab-content">
            <!-- tab panel personal start -->
            <div class="tab-pane active" id="personal" role="tabpanel">
              <!-- personal card start -->
              <div class="card" v-show="optionTab==0">
                <div class="card-header">
                  <h5 class="card-header-text">About Me</h5>
                  <button
                    id="edit-btn"
                    type="button"
                    @click="setDataInputs"
                    class="btn btn-sm btn-primary waves-effect waves-light f-right"
                  >
                    <i class="icofont icofont-edit"></i>
                  </button>
                </div>
                <div class="card-block">
                  <div class="view-info">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="general-info">
                          <div class="row">
                            <div class="col-lg-12 col-xl-12">
                              <div class="table-responsive">
                                <table class="table m-0">
                                  <tbody>
                                    <tr>
                                      <th scope="row">Nombre de establecimiento</th>
                                      <input
                                        type="text"
                                        v-model="stablishment.name"
                                        :class="{'white':editInputs==true}"
                                        :readonly="!editInputs"
                                      >
                                    </tr>
                                    <tr>
                                      <th scope="row">Ocupación actual</th>
                                      <input
                                        type="text"
                                        v-model="stablishment.ocupation"
                                        :class="{'white':editInputs==true}"
                                        :readonly="!editInputs"
                                      >
                                    </tr>
                                    <tr>
                                      <th scope="row">Identificador de establecimiento</th>
                                      <input
                                        type="text"
                                        v-model="stablishment._id"
                                        :class="{'white':editInputs==true}"
                                        :readonly="!editInputs"
                                      >
                                    </tr>
                                    <tr>
                                      <th scope="row">Uuid</th>
                                      <input
                                        type="text"
                                        v-model="stablishment.uuid"
                                        :class="{'white':editInputs==true}"
                                        :readonly="!editInputs"
                                      >
                                    </tr>
                                    <tr>
                                      <th scope="row">Localización</th>
                                      <td :class="{'white':editInputs==true}">New York, USA</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Email</th>
                                      <input
                                        type="text"
                                        :class="{'white':editInputs==true}"
                                        v-model="stablishment.email"
                                        :readonly="!editInputs"
                                      >
                                    </tr>
                                    <tr>
                                      <th scope="row">Teléfono</th>
                                      <input
                                        type="text"
                                        v-model="stablishment.phone"
                                        :class="{'white':editInputs==true}"
                                        :readonly="!editInputs"
                                      >
                                    </tr>
                                    <tr>
                                      <th scope="row">Facebook</th>
                                      <input
                                        type="text"
                                        v-model="stablishment.facebook"
                                        :class="{'white':editInputs==true}"
                                        :readonly="!editInputs"
                                      >
                                    </tr>
                                    <tr>
                                      <th scope="row">Instagram</th>
                                      <input
                                        type="text"
                                        :class="{'white':editInputs==true}"
                                        v-model="stablishment.instagram"
                                        :readonly="!editInputs"
                                      >
                                    </tr>
                                    <tr>
                                      <th scope="row">Twitter</th>
                                      <input
                                        type="text"
                                        :class="{'white':editInputs==true}"
                                        v-model="stablishment.twitter"
                                        :readonly="!editInputs"
                                      >
                                    </tr>
                                    <tr>
                                      <th scope="row">Web</th>
                                      <input
                                        type="text"
                                        :class="{'white':editInputs==true}"
                                        v-model="stablishment.website"
                                        :readonly="!editInputs"
                                      >
                                    </tr>
                                    <tr>
                                      <th scope="row">Descripción</th>
                                      <textarea
                                        :class="{'white':editInputs==true}"
                                        v-model="stablishment.description"
                                        :readonly="!editInputs"
                                      ></textarea>
                                    </tr>
                                  </tbody>
                                </table>
                                <button
                                  v-if="editInputs"
                                  id="edit-btn"
                                  type="button"
                                  @click="sendEdit"
                                  class="btn btn-sm btn-primary waves-effect waves-light f-right"
                                >
                                  <i class="icofont icofont-edit"></i>
                                  Guardar
                                </button>
                              </div>
                            </div>
                            <!-- end of table col-lg-6 -->
                            <!-- <div class="col-lg-12 col-xl-6">
                            <div class="table-responsive">
                              <table class="table">
                                <tbody>
                                  <tr>
                                    <th scope="row">Email</th>
                                    <td>
                                      <a href="#!">
                                        <span
                                          class="__cf_email__"
                                          data-cfemail="4206272f2d02273a232f322e276c212d2f"
                                        >[email&#160;protected]</span>
                                      </a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Mobile Number</th>
                                    <td>(0123) - 4567891</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Twitter</th>
                                    <td>@xyz</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Skype</th>
                                    <td>demo.skype</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Website</th>
                                    <td>
                                      <a href="#!">www.demo.com</a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            </div>-->
                            <!-- end of table col-lg-6 -->
                          </div>
                          <!-- end of row -->
                        </div>
                        <!-- end of general info -->
                      </div>
                      <!-- end of col-lg-12 -->
                    </div>
                    <!-- end of row -->
                  </div>
                  <!-- end of view-info -->
                </div>
                <!-- end of card-block -->
              </div>
              <div class="card-block" v-show="optionTab==2">
                <div class="row">
                  <div class="col-lg-4 col-sm-6">
                    <div class="thumbnail">
                      <div class="thumb">
                        <a
                          href="..\..\assets\images\gallery-grid\1.png"
                          data-lightbox="1"
                          data-title="My caption 1"
                        >
                          <img
                            src="..\..\assets\images\gallery-grid\1.png"
                            alt
                            class="img-fluid img-thumbnail"
                          >
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-sm-6">
                    <div class="thumbnail">
                      <div class="thumb">
                        <a
                          href="..\..\assets\images\gallery-grid\1.png"
                          data-lightbox="2"
                          data-title="My caption 2"
                        >
                          <img
                            src="..\..\assets\images\gallery-grid\1.png"
                            alt
                            class="img-fluid img-thumbnail"
                          >
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-sm-6">
                    <div class="thumbnail">
                      <div class="thumb">
                        <a
                          href="..\..\assets\images\gallery-grid\1.png"
                          data-lightbox="3"
                          data-title="My caption 3"
                        >
                          <img
                            src="..\..\assets\images\gallery-grid\1.png"
                            alt
                            class="img-fluid img-thumbnail"
                          >
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-sm-6">
                    <div class="thumbnail">
                      <div class="thumb">
                        <a
                          href="..\..\assets\images\gallery-grid\1.png"
                          data-lightbox="4"
                          data-title="My caption 4"
                        >
                          <img
                            src="..\..\assets\images\gallery-grid\1.png"
                            alt
                            class="img-fluid img-thumbnail"
                          >
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-sm-6">
                    <div class="thumbnail">
                      <div class="thumb">
                        <a
                          href="..\..\assets\images\gallery-grid\1.png"
                          data-lightbox="5"
                          data-title="My caption 5"
                        >
                          <img
                            src="..\..\assets\images\gallery-grid\1.png"
                            alt
                            class="img-fluid img-thumbnail"
                          >
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-sm-6">
                    <div class="thumbnail">
                      <div class="thumb">
                        <a
                          href="..\..\assets\images\gallery-grid\1.png"
                          data-lightbox="6"
                          data-title="My caption 6"
                        >
                          <img
                            src="..\..\assets\images\gallery-grid\1.png"
                            alt
                            class="img-fluid img-thumbnail"
                          >
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-sm-6">
                    <div class="thumbnail">
                      <div class="thumb">
                        <a
                          href="..\..\assets\images\gallery-grid\1.png"
                          data-lightbox="7"
                          data-title="My caption 7"
                        >
                          <img
                            src="..\..\assets\images\gallery-grid\1.png"
                            alt
                            class="img-fluid img-thumbnail"
                          >
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-sm-6">
                    <div class="thumbnail">
                      <div class="thumb">
                        <a
                          href="..\..\assets\images\gallery-grid\1.png"
                          data-lightbox="8"
                          data-title="My caption 8"
                        >
                          <img
                            src="..\..\assets\images\gallery-grid\1.png"
                            alt
                            class="img-fluid img-thumbnail"
                          >
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-sm-6">
                    <div class="thumbnail">
                      <div class="thumb">
                        <a
                          href="..\..\assets\images\gallery-grid\1.png"
                          data-lightbox="9"
                          data-title="My caption 9"
                        >
                          <img
                            src="..\..\assets\images\gallery-grid\1.png"
                            alt
                            class="img-fluid img-thumbnail"
                          >
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card" v-show="optionTab==1">
                <div class="card-header">
                  <h5 class="card-header-text">Galeria</h5>
                </div>
                <div class="contenedordegaleria">
                  <div
                    class="miResponfsif"
                    v-for="item in stablishment.photo_url"
                    v-bind:key="item._id"
                    :style="{'background-image':`url(http://localhost:3000/src/stablishments/5ce03bf18fbdb6278824563d/${item})`}"
                  ></div>
                </div>
                <Upload></Upload>
              </div>
              <!-- <div class="card">
              <div class="card-header">
                <h5 class="card-header-text">Upload files</h5>
                <button
                  id="edit-btn"
                  type="button"
                  class="btn btn-sm btn-primary waves-effect waves-light f-right"
                >
                  <i class="icofont icofont-edit"></i>
                  Guardar
                </button>
              </div>
              <div class="card-block">
                <div class="view-info">
                  <div class="row">
              <upload></upload>-->
              <!--</div>
                   end of row 
                </div>
              </div>
              </div>-->
            </div>
          </div>
          <!-- tab content end -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const { Stablishment } = require("../../util/models.js");
import ProfileHeader from "../elements/profileHeader";
import TabMenu from "../elements/tabMenu";
import Upload from "@/components/elements/upload";
import Preloader from "../shared/preloader";
import commonTypes from "../store/other/type";
import stablishmentsTypes from "../store/stablishments/type";
import { console } from "../../util/helper";
import { all } from "q";

export default {
  data() {
    return {
      optionTab: 0,
      loading: false,
      editInputs: false,
      tabs: ["Descripción", "Galeria", "Ofertas", "Carta"],
      defaultUrlBanner: "http://localhost:3000/src/users/default-bg.jpg",
      position: 0,
      defaultUrlLogo: "http://localhost:3000/src/users/default.png",
      urlStablishment:
        window.location.origin +
        "/src/stablishments/" +
        this.$route.params.id +
        "/"
    };
  },
  computed: {
    stablishment() {
      return this.$store.getters[
        stablishmentsTypes.getters.getStablishmentById
      ](this.$route.params.id);
    }
  },
  components: {
    ProfileHeader,
    TabMenu,
    Preloader,
    Upload
  },
  methods: {
    changeTab(index) {
      console.log("position del papi" + index);
      this.optionTab = index;
    },
    setDataInputs() {
      console.log(this.editInputs);
      if (this.editInputs == false) {
        this.editInputs = true;
      } else {
        this.editInputs = false;
      }
    },
    async sendEdit() {
      this.loading = true;

      console.log(this.stablishment);
      let result = await this.$store.dispatch(
        stablishmentsTypes.actions.updateStablishmentById,
        this.stablishment
      );

      // this.loading = false;
      // this.editInputs = false;
      console.log("resultado antes de alert" + result);
      if (result.status == 200) {
        this.$root.alertSuccess();
      } else {
        this.$root.alertError();
      }
      this.loading = false;
      this.editInputs = false;
    }
  },

  async beforeMount() {
    var userId = this.$route.params.id;
    console.log(userId);

    await this.$store.dispatch(
      stablishmentsTypes.actions.getStablishmentById,
      userId
    );

    this.$store.commit(commonTypes.mutations.updateGlobalLoader, false);
    // if(this.stablishment.image_logo == undefined || this.stablishment.image_logo == "" ){
    //     this.stablishment.image_logo = "default.png";

    // }

    // if(this.stablishment.photo_url[0] == undefined || this.stablishment.photo_url[0] == "" ){
    //   this.stablishment.photo_url[0] = "default-bg.jpg";
    // }

    console.log("el establecimiento is in da haus" + this.stablishment);
  }
};
</script>

<style lang="scss" scoped>
textarea,
input {
  width: 100%;
  background-color: lightblue;
  resize: none;
  color: #353c4e;
  border: 0;
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #e9ecef;
}
.white {
  background-color: #bababa !important;
}
.loaderStyle {
  width: 100%;
  height: 100%;
}
.miResponfsif {
  background-repeat: no-repeat;
  background-size: contain;
  width: 25%;
  height: 145px;
  margin: 30px;
  background-position: center;
}
.contenedordegaleria {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>