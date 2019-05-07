<template>
  <div>
    <dashboardComponent v-if="user.name != 'Nacho'"></dashboardComponent>
    <superdashboardComponent v-if="user.name == 'Nacho'" ></superdashboardComponent>
  </div>
</template>
 
<script>
const { User } = require("../../util/models.js");
import dashboardComponent from "../admin/dashboard";
import superdashboardComponent from "../super/superdashboard";
import types from "../store/users/type";
import commonTypes from "../store/other/type";
import { console } from "../../util/helper";

let id = 3;
let id2 = 3;

export default {
  components: {
    dashboardComponent,
    superdashboardComponent
  },
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.getters[types.getters.getCurrentUser];
    }
  },
  methods: {
    beforeCreate() {
      setTimeout(() => {
        this.$store.commit(commonTypes.mutations.updateGlobalLoader, false);
        //   console.log('Visible: ', this.$store.getters[commonTypes.getters.getGlobalLoaderState]);
      }, 3000);
    }
  },
  beforeMount() {
    let currentUser = localStorage.__DataUser
      ? JSON.parse(localStorage.__DataUser).user
      : null;
    if (currentUser == null) {
      this.$router.replace("login");
    }
    this.$store.commit(types.mutations.updateCurrentUser, currentUser);
  },
  mounted() {}
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
</style>