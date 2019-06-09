<template>
  <div>
    <preloader :visible="loading" :global="true"></preloader>
    <div>
      <div class="row align-items-end"></div>
      <!-- "item == undefined"?urlbuena:default -->
      <profile-header
        :imageProfile="stablishment.image_logo == '' || stablishment.image_logo == undefined? defaultUrlLogo : urlStablishment+stablishment.image_logo"
        :id="stablishment._id"
        :imageBanner="stablishment.photo_url[0]==undefined?defaultUrlBanner:urlStablishment+stablishment.photo_url[0]"
      ></profile-header>
      <!-- <div class="display">
        <router-link
          :to="{path: `../tables/${stablishment._id}`}"
          replace
          class="btn btn-sm btn-primary"
        >Mesas del establecimiento</router-link>
      </div> -->
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
                              <!-- <a class="btn btn-primary waves-effect waves-light m-r-20"  >Editar mesa</a> -->
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
                                    <!-- <tr>
                                      <th scope="row">Localización</th>
                                      <td :class="{'white':editInputs==true}">
                                        New York,
                                        USA
                                      </td>
                                    </tr>-->
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
                                <transition name="fade">
                                  <div v-if="editInputs" class="text-center mt-3">
                                    <a
                                      class="btn btn-primary waves-effect waves-light m-r-20"
                                      @click="sendEdit"
                                    >Save</a>
                                    <a
                                      id="edit-cancel"
                                      class="btn btn-default waves-effect"
                                      @click="setDataInputs"
                                    >Cancel</a>
                                  </div>
                                </transition>
                                <!-- <button
                                  v-if="editInputs"
                                  id="edit-btn"
                                  type="button"
                                  @click="sendEdit"
                                  class="btn btn-sm btn-primary waves-effect waves-light f-right"
                                >
                                  <i class="icofont icofont-edit"></i>
                                  Guardar
                                </button>-->
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
              <div class="card-block" v-show="optionTab==1">
                <upload
                  :filter="/\.(jpe?g|png|gif)$/i"
                  :defaultImagePreview="'../../images/default.png'"
                  :endpoint="endpoint"
                  :limit="10"
                  @onUploadProgress="onUploadProgress"
                  @onFinish="onFinish"
                  @beforeUpload="beforeUpload"
                  @onError="onError"
                  @onAdded="onAdded"
                  @beforeAdded="beforeAdded"
                ></upload>
                <div class="divimgperfil">
                  <a @click="changePerfil" class="btn propbtn btn-sm btn-primary">Imagen de perfil</a>
                </div>
                <div class="row">
                  <div class="jFiler-items jFiler-row">
                    <ul class="jFiler-items-list jFiler-items-grid">
                      <li
                        v-for="item in stablishment.photo_url"
                        v-bind:key="item._id"
                        class="jFiler-item"
                      >
                        <div class="jFiler-item-container">
                          <div class="jFiler-item-inner">
                            <div class="jFiler-item-thumb">
                              <div class="jFiler-item-thumb-image">
                                <a :href="`${urlStablishment}/${item}`" data-lightbox="roadtrip">
                                  <div
                                    class="image-prev imgdivfoto"
                                    :style="{'backgroundImage': `url(${urlStablishment}/${item})`}"
                                  ></div>
                                </a>
                              </div>
                            </div>
                            <div class="jFiler-item-assets jFiler-row">
                              <ul class="list-inline pull-left">
                                <li>
                                  <!-- <span
                                    class="jFiler-item-others text-error inline-text"
                                  >{{item.split("/")[item.split("/").length-1]}}</span>
                                  </li>-->
                                  <span
                                    class="jFiler-item-others text-error inline-text"
                                  >{{item.replace(`upload/stablishments/${$route.params.id}/`,"")}}</span>
                                </li>
                              </ul>
                              <ul class="list-inline pull-right">
                                <li>
                                  <i
                                    v-show="isPerfil==true"
                                    v-on:click="imgPerfil(item)"
                                    class="fa pointer fa-plus-square-o"
                                  ></i>
                                  <!-- <a v-show="isPerfil==true" v-on:click="imgPerfil(item)" class="btn propbtn btn-sm btn-primary">Imagen de perfil</a> -->
                                  <a
                                    v-show="isPerfil==false"
                                    class="icon-jfi-trash jFiler-item-trash-action"
                                    v-on:click="borrarImg($event,item)"
                                  ></a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <!-- <div
                    class="col-lg-4 col-sm-6"
                    v-for="item in stablishment.photo_url"
                    v-bind:key="item._id"
                  >
                    <a class="micruz icon-jfi-trash jFiler-item-trash-action" v-on:click="borrarImg($event,item)"></a>

                    
                    <div class="thumbnail">
                      <div class="thumb">
                        <a
                          :href="`${urlStablishment}/${item}`"
                          data-lightbox="1"
                          data-title="My caption 1"
                        >
                          <img
                            :src="`${urlStablishment}/${item}`"
                            alt
                            class="img-fluid img-thumbnail"
                          >
                        </a>
                      </div>
                    </div>
                  </div>-->
                </div>
              </div>
             
              <div v-show="optionTab === 2" class="card">
                <div class="card-header">
                  <h5 class="card-header-text">Actividad en Vivo</h5>
                  <span>Visualice y gestione la actividad de su establecimiento en vivo, reserve mesas, atiendelas y gestione la cola de trabajos a realizar.</span>
                </div>
                <div class="card-block">
                  <div class="view-info">
                    <div class="row">
                      <div class="col-md-12 col-xl-5">
                        <latest-activity :activity="{}" :tables="{}"></latest-activity>
                      </div>
                      <div class="col-md-12 col-xl-7">
                        <live-queue :activity="{}" :tables="{}" :establishment_id="$route.params.id"></live-queue>
                      </div>
                    </div>
                  </div>
                </div>
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
import menu from "../../util/MenuEnums";
import menuTypes from "../store/other/type";
import TabMenu from "../elements/tabMenu";
import Upload from "@/components/elements/upload";
import Preloader from "../shared/preloader";
import commonTypes from "../store/other/type";
import stablishmentsTypes from "../store/stablishments/type";
import { console } from "../../util/helper";
import { all } from "q";
import latestActivity from "@/components/elements/latestActivity";
import liveQueue from "@/components/elements/liveQueue";
import lightbox from "../../assets/js/lightbox";

export default {
  data() {
    return {
      optionTab: 0,
      isPerfil: false,
      endpoint: `${window.location.origin}/upload/stablishments/${
        this.$route.params.id
      }`,
      loading: false,
      editInputs: false,
      tabs: ["Descripción", "Galeria", "Cola de trabajo"],
      defaultUrlBanner: "http://localhost:3000/src/users/default-bg.jpg",
      position: 0,
      defaultUrlLogo: "http://localhost:3000/src/users/default.png",
      urlStablishment: window.location.origin + "/"
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
    Upload,
    latestActivity,
    liveQueue
  },
  methods: {
    changePerfil() {
      if (this.isPerfil == false) {
        this.isPerfil = true;
      } else {
        this.isPerfil = false;
      }
    },
    beforeUpload(evt) {
      evt.waitUntil(
        new Promise((resolve, reject) => {
          this.$swal({
            title: "Confirmación",
            text: "¿Desea cambiar la subir las imagenes?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmar"
          }).then(result => {
            if (result.value) {
              resolve();
            }
          });
        })
      );
    },
    onUploadProgress(percentage) {
      console.warn("On progress state --> ", percentage);
    },
    onFinish(response) {
      if (response && response.data && !response.data.error) {
        this.$root.alertSuccess();
        this.$store.commit(
          stablishmentsTypes.mutations.updateStablishmentById,
          response.data.result
        );
      }
    },
    onError(message) {
      this.$root.alertError({ text: message });
    },
    onAdded(elements) {
      console.log(`OnAdded elements --> ${elements}`);
    },
    beforeAdded() {
      console.log("BeforeAdded...");
    },
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
    async borrarImg(e, name) {
      this.loading = true;

      var el = e.target;
      var imageContainer;
      var list;

      var imgsArray = this.stablishment.photo_url.filter(x => x != name);
      var stablishmentUpdate = this.stablishment;
      stablishmentUpdate.photo_url = imgsArray;
      console.log(stablishmentUpdate);

      let result = await this.$store.dispatch(
        stablishmentsTypes.actions.updateStablishmentById,
        stablishmentUpdate
      );
      console.log("resultado antes de alert" + result);
      if (result.status == 200) {
        this.$root.alertSuccess();
      } else {
        this.$root.alertError();
      }

      // imageContainer = el.parentNode;
      // list = imageContainer.parentNode;
      // list.removeChild(imageContainer);
      this.loading = false;
      console.log(this.loading);
      // this.loading = false;
      // this.editInputs = false;
    },
    async imgPerfil(item) {
      this.loading = true;
      this.stablishment.image_logo = item;
      let result = await this.$store.dispatch(
        stablishmentsTypes.actions.updateStablishmentById,
        this.stablishment
      );

      if (result.status == 200) {
        this.$root.alertSuccess();
      } else {
        this.$root.alertError();
      }
      this.isPerfil = false;
      this.loading = false;
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
    this.$store.commit(
      menuTypes.mutations.updateNavPosition,
      menu.STABLISHMENTS
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
@import "../../assets/styles/lightbox.css";

textarea,
input {
  flex:1 1 50%;
  background-color: lightblue;
  resize: none;
  opacity: 0.8;
  color: #353c4e;
  border: 0;
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #e9ecef;
}
.white {
  // background-color: #bababa !important;
  opacity: 1;
}
.loaderStyle {
  width: 100%;
  height: 100%;
}
.micruz {
  position: absolute;
  z-index: 1;
  top: 10px;
  cursor: pointer;
  right: 29px;
  color: white !important;
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

/*END STYLES*/
.divimgperfil {
  display: flex;
  justify-content: flex-end;
}
.btn {
  cursor: pointer;
}
.pointer {
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.border-error {
  border: 1px solid lightcoral !important;
}
.propbtn {
  margin-top: 2px;
  margin-bottom: 20px;
  color: white !important;
}
.display{
  display: flex;
  justify-content: flex-end;
  margin-bottom: 25px;

}
.imgdivfoto {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
tbody {
  display: flex;
  flex-flow: column nowrap;

  tr {
    display: flex;
    flex-flow: row nowrap;
    padding-bottom: 0px !important;
    height: 100%;

    th {
      flex: 1 1 50%;
      padding-top: calc(30px - 0.875em);
    }

    .input {
      flex: 1 1 50%;
      position: relative;

      &.form-radio,
      &.checkbox-fade {
        border-top: 1px solid #e9ecef;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
      }

      .btn-show-pass {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 24px;
        line-height: 60px;
        margin-right: 16px;
        cursor: pointer;
      }

      input,
      select {
        flex:1 1 50%;
        height: 60px !important;
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

      span.form-bar {
        background-color: #bababa !important;
        display: block;
        text-align: center;
      }
    }
  }
}
</style>