<template>
  <baseComponent>
    <div>
      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Submit Your Name"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            :state="nameState"
            label="Name"
            label-for="name-input"
            invalid-feedback="Name is required"
          >
            <b-form-input id="name-input" v-model="name" :state="nameState" required></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
    </div>
    <div class="col-12">
      <div class="form-group">
        <div class="form-check">
          <input id="disabled" type="checkbox" v-model="enabled" class="form-check-input">
          <label class="form-check-label" for="disabled">DnD enabled</label>
        </div>
      </div>
    </div>

    <div class="col-11">
      <h3>Mesas</h3>
      <div class="btn-group-vertical buttons" role="group" aria-label="Basic example">
        <button class="btn btn-secondary" @click="add">Add</button>
        <!-- <button class="btn btn-secondary" @click="replace">Replace</button> -->
      </div>
      <draggable
        :list="list"
        :disabled="!enabled"
        class="list-group mesas"
        ghost-class="ghost"
        @start="dragging = true"
        @end="dragging = false"
      >
        <div class="list-group-item col-md-2" v-for="element in list" :key="element.name">
          <b-button v-b-modal.modal-prevent-closing>{{ element.name }}</b-button>
        </div>
      </draggable>
    </div>
    <div class="col-11">
      <h3>Mesas</h3>
      <div class="btn-group-vertical buttons" role="group" aria-label="Basic example">
        <button class="btn btn-secondary" @click="add2">Add</button>
        <!-- <button class="btn btn-secondary" @click="replace">Replace</button> -->
      </div>
      <draggable
        :list="list"
        :disabled="!enabled"
        class="list-group mesas"
        ghost-class="ghost"
        @start="dragging = true"
        @end="dragging = false"
      >
        <div
          class="list-group-item col-md-2"
          v-for="element in list2"
          :key="element.name"
        >{{ element.name }}</div>
      </draggable>
    </div>
  </baseComponent>
</template>
 
<script>
import baseComponent from "../shared/base";
import draggable from "../../util/vuedraggable";
let id = 3;
let id2 = 3;
export default {
  components: {
    baseComponent,
    draggable
  },
  data() {
    return {
      name: "",
      nameState: null,
      submittedNames: [],
      enabled: true,
      list: [{ name: "1", id: 0 }, { name: "2", id: 1 }, { name: "3", id: 2 }],
      list2: [
        { name: "1", id2: 0 },
        { name: "2", id2: 1 },
        { name: "3", id2: 2 }
      ],
      dragging: false
    };
  },
  computed: {
    draggingInfo() {
      return this.dragging ? "under drag" : "";
    }
  },
  methods: {
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
    replace: function() {
      this.list = [{ name: "Edgard", id: id++ }];
    }
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

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>