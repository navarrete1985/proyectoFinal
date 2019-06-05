<template>
  <div class="wrapper">
    <div class="col-11">
      <h3>Mesas</h3>
      <div class="btn-group-vertical buttons" role="group" aria-label="Basic example">
        <button class="btn btn-secondary" @click="add">Add</button>
        <!-- <button class="btn btn-secondary" @click="replace">Replace</button> -->
      </div>
      <button @click="sendEdit">Enviar</button>
      <div v-for="section in table.section" :key="section.name">
        <h2>{{section.name}}</h2>
        <draggable v-model =" section.tables"  class="list-group mesas" @click="cosa">
          <div class="list-group-item mesasimg col-md-2" v-for="mesa in section.tables" :key="mesa.name">
            <button @click="cosa" class="mibtn">{{ mesa.name }}</button>
          </div>
        </draggable>
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
import { console } from '../../util/helper';

let id = 3;
let id2 = 3;

export default {
  components: {
    draggable
  },
  data() {
    return {
      name: "",
      isCheck: true,
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
      return this.$store.getters[
        tablesTypes.getters.getTableByIdStablishment
      ](this.$route.params.id);
    }
  },
  methods: {
    cosa(){
      console.log(this.table);
    },
     async sendEdit() {
      console.log(this.table);
      this.table.section.forEach(section => {
        section.tables.forEach((value,key) => {
          console.log("mesa "+key+"valor"+value.order)
          value.order = key+1;
        });
      });
      let result = await this.$store.dispatch(
        tablesTypes.actions.updateTableByIdStablisment,
        this.table
      );
      console.error('Resultado ', result)
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
    add: function() {
      this.list.push({ name: id + 1, id: id++ });
    },
    add2: function() {
      this.list2.push({ name: id2 + 1, id2: id2++ });
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
    },
    
  },
  async beforeCreate() {
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
    this.list = this.table.section[0].tables.toAr
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
.activa{
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
.mibtn{
  cursor: pointer;
  background: none;
  border: none;
}
</style>