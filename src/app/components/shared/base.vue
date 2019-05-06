<template>
  <div id="pcoded" class="pcoded">
    <Loader/>
    <div class="pcoded-overlay-box"></div>
    <div class="pcoded-container navbar-wrapper">
      <HeaderComponent/>
      <div class="pcoded-main-container">
        <div class="pcoded-wrapper">
          <NavComponent/>
          <div class="pcoded-content">
            <div class="pcoded-inner-content">
              <div class="main-body">
                <div class="page-wrapper">
                  <div class="page-body">
                    <div class="row">
                      <slot>

                      </slot>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// import vartical from "../../assets/js/vartical-layout.min.js";
// import jquerymin from "../../assets/js/jquery.min.js";
// import jqueryui from "../../assets/js/jquery-ui.min.js";
// import customSo from "../../assets/js/sortable-custom.js";
// import boostrap from "../../assets/js/bootstrap.min.js";
// import jquerySlim from "../../assets/js/jquery.slimscroll.js";
// import modernz from "../../assets/js/modernizr.js";
// import chart from "../../assets/js/Chart.js";
// // import customdashboard from  "../../assets/js/custom-dashboard.js";
// import scriptmin from  "../../assets/js/script.min.js";

import Loader from "@/components/shared/loader";
import HeaderComponent from "@/components/shared/header";
import NavComponent from "@/components/shared/nav";
export default {
  name: "app",
  data() {
    return {
      
    }
  },
  components: {
    HeaderComponent,
    NavComponent,
    Loader
  }
};

window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());

gtag("config", "UA-23581568-13");
</script>

<style lang="scss" scoped>
@import "../../assets/styles/feather.css";
/**  =====================
      Draggable css start
==========================  **/

#draggableMultiple .sortable-moves {
    cursor: move;
    margin-bottom: 0;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.14);
    margin-bottom: 20px;
    padding: 15px 0 15px 60px;
}

.sortable-moves {
    font-size: 14px;
    line-height: 1.55556em;
    list-style-type: none;
    margin-bottom: 15px;
    min-height: 3.55556em;
    padding-left: 5.11111em;
    position: relative;
    cursor: move;
    img {
        position: absolute;
        height: 40px;
        left: 10px;
        border-radius: 5px;
        top: 15px;
    }
    h6 {
        font-weight: 600;
    }
}

.card-sub {
    cursor: move;
    border: none;
    box-shadow: 0 0 1px 2px rgba(0, 0, 0, 0.05), 0 -2px 1px -2px rgba(0, 0, 0, 0.04), 0 0 0 -1px rgba(0, 0, 0, 0.05);
    &:hover {
        box-shadow: 0 0 25px -5px #9e9c9e;
        transition: all 180ms linear;
    }
}


/**====== Draggable css end ======**/

</style>