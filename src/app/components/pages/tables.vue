<template>
  <div class="wrapper">
    <preloader :visible="loading" :global="true"></preloader>
    <div class="col-11">
      <h3>Mesas</h3>
      <div class="btn-group-vertical buttons" role="group" aria-label="Basic example">
        <!-- <button class="btn btn-secondary" @click="replace">Replace</button> -->
      </div>
      <button class="btn btn-sm btn-primary rel" @click="sendEdit">Actualizar mesas</button>
      <input type="text" v-model="valueInput">
      <button class="btn btn-sm btn-primary rel" @click="addSection">Añadir nueva sección</button>
      <div v-if="cargado">
        <div v-for="(section,index) in table.section" :key="index">
          <h4>{{section.name}}</h4>
          <button class="btn btn-secondary" @click="add(index)">Add</button>
          <button class="btn btn-secondary" @click="deleteSection(index)">Borrar Sección</button>
          <draggable v-model=" section.tables" class="list-group mesas">
            <div
              class="list-group-item mesasimg col-md-2"
              v-for="(mesa,index2) in section.tables"
              :key="index2"
            >
              <button @click="cosa(index,index2)" class="mibtn">{{ mesa.name }}</button>
              <button
                @click="deleteTable(index,index2)"
                class="icon-jfi-trash jFiler-item-trash-action mipa"
              ></button>
            </div>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from "../../util/vuedraggable";
import commonTypes from "../store/other/type";
const { Table } = require("../../util/models.js");
import menu from "../../util/MenuEnums";
import menuTypes from "../store/other/type";
import Upload from "@/components/elements/upload";
import Preloader from "../shared/preloader";
import tablesTypes from "../store/tables/type";
import { console } from "../../util/helper";

let id = 3;
let id2 = 3;

export default {
  components: {
    draggable,
    Preloader
  },
  data() {
    return {
      name: "",
      loading: false,
      isCheck: true,
      valueInput: "",
      cargado: false,
      nameState: null,
      submittedNames: [],
      enabled: true,
      list: [],
      // list: [{ name: "1", id: 0 }, { name: "2", id: 1 }, { name: "3", id: 2 }],

      // list2: [
      //   { name: "1", id2: 0 },
      //   { name: "2", id2: 1 },
      //   { name: "3", id2: 2 }
      // ],
      dragging: false
    };
  },
  computed: {
    draggingInfo() {
      return this.dragging ? "under drag" : "";
    },
    table() {
      return this.$store.getters[tablesTypes.getters.getTableByIdStablishment](
        this.$route.params.id
      );
    }
  },
  methods: {
    cosa(indexS,indexT) {
      this.$swal({
        title: `Mesa ${this.table.section[indexS].tables[indexT].name}`,
        html:
          `<label class="milabel">uuid</label><input id="swal-input1" value="${this.table.section[indexS].tables[indexT].uuid}"  class="swal2-input">` +
          `<label class="milabel">Name</label> <input id="swal-input2" value="${this.table.section[indexS].tables[indexT].name}" class="swal2-input">`,
        focusConfirm: false,
        preConfirm: () => {
          this.table.section[indexS].tables[indexT].uuid = document.getElementById("swal-input1").value
          this.table.section[indexS].tables[indexT].name = document.getElementById("swal-input2").value

      }
    })
    },
    async sendEdit() {
      // this.loading=true;
      console.log(this.table);
      this.table.section.forEach(section => {
        section.tables.forEach((value, key) => {
          console.log("mesa " + key + "valor" + value.order);
          value.order = key + 1;
        });
      });
      let result = await this.$store.dispatch(
        tablesTypes.actions.updateTableByIdStablisment,
        this.table
      );
      console.error("Resultado ", result);
      if (result.status == 200) {
        this.$root.alertSuccess();
      } else {
        this.$root.alertError();
      }
      // this.loading=false;
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid ? "valid" : "invalid";
      return valid;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the name to submitted names
      this.submittedNames.push(this.name);
      // Hide the modal manually
      this.$nextTick(() => {
        this.$refs.modal.hide();
      });
    },
    add: function(index) {
      console.log(this.table.section[index].tables.length);
      var numero = this.table.section[index].tables.length + 1;
      var ob = {
        identifier: "indeti",
        name: numero.toString(),
        order: numero,
        state: 0,
        uuid: "0C0C0C0C0C0C2130C040CC3"
      };
      this.table.section[index].tables.push(ob);
      // this.list.push({ name: id + 1, id: id++ });
      console.log(this.table);
    },
    deleteSection: function(indexS) {
      this.table.section = this.table.section.filter(function(value, index, arr) {
        console.log(index, indexS);
        return index != indexS;
      });
    },
    deleteTable: function(indexS, indexT) {
      this.table.section[indexS].tables = this.table.section[
        indexS
      ].tables.filter(function(value, index, arr) {
        console.log(index, indexT);
        return index != indexT;
      });
    },
    addSection: function() {
      this.table.section.push({ name: this.valueInput, tables: [] });
    },
    readOrType() {
      console.log(this.isCheck);
      if (this.isCheck == true) {
        this.isCheck = false;
      } else {
        this.isCheck = true;
      }
    },
    replace: function() {
      this.list = [{ name: "Edgard", id: id++ }];
    }
  },
  async beforeCreate() {
    this.cargado = false;
    var userId = this.$route.params.id;
    console.log(userId);

    await this.$store.dispatch(
      tablesTypes.actions.getTableByIdStablishment,
      userId
    );
    this.$store.commit(
      menuTypes.mutations.updateNavPosition,
      menu.STABLISHMENTS
    );
    this.$store.commit(commonTypes.mutations.updateGlobalLoader, false);
    this.cargado = true;
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
}
.mesasimg {
  background-image: url(http://localhost:3000/images/mesa.jpg);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.activa {
  opacity: 1;
}

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
.mipa {
  position: absolute;
  top: 0;
  right: 0;
  background: transparent;
  border: none;
}

.mibtn {
  cursor: pointer;
  background: none;
  border: none;
}
</style>