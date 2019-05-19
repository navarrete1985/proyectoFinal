<template>
  <div>
    <div class="page-header">
      <div class="row align-items-end">
        <div class="col-lg-8">
          <div class="page-header-title">
            <div class="d-inline">
              <h4>Establecimiento {{stablishment._id}}</h4>
              <span>lorem ipsum dolor sit amet, consectetur adipisicing elit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- "item == undefined"?urlbuena:default -->
    <profile-header
      :imageProfile="stablishment.image_logo == '' || stablishment.image_logo == undefined? defaultUrlLogo : urlStablishment+stablishment.image_logo"
      :imageBanner="stablishment.photo_url[0]==undefined?defaultUrlBanner:urlStablishment+stablishment.photo_url[0]"
    ></profile-header>
    <div class="row">
      <div class="col-lg-12">
        <tab-menu :arrayTabs="tabs" @changeTab="setOptionShow"></tab-menu>
        <!-- tab content start -->
        <div class="tab-content">
          <!-- tab panel personal start -->
          <div class="tab-pane active" id="personal" role="tabpanel">
            <!-- personal card start -->
            <div class="card">
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
</template>

<script>
const {
	Stablishment
} = require("../../util/models.js");
import ProfileHeader from "../elements/profileHeader";
import TabMenu from "../elements/tabMenu";
import Upload from "@/components/elements/upload";
import commonTypes from "../store/other/type";
import stablishmentsTypes from "../store/stablishments/type";
import {
	console
} from "../../util/helper";
import { all } from 'q';

export default {
	data() {
		return {
			editInputs: false,
			tabs: ["Descripción", "Galeria", "Ofertas", "Carta"],
			defaultUrlBanner: "http://localhost:3000/src/users/default-bg.jpg",
			position: 0,
			defaultUrlLogo: "http://localhost:3000/src/users/default.png",
			urlStablishment: window.location.origin +
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
		Upload
	},
	methods: {
		setOptionShow(index) {
			console("position del papi" + index);
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
      this.$store.commit(commonTypes.mutations.updateGlobalLoader, true);

      console.log(this.stablishment);
      let result = await this.$store.dispatch(stablishmentsTypes.actions.updateStablishmentById,this.stablishment);

      this.$store.commit(commonTypes.mutations.updateGlobalLoader, false);
      console.log("resultado antes de alert"+result)
      if(result.status == 200 ){
        alert("editado correctamente");
      }else{
        alert("error al editar")
      }

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
</style>