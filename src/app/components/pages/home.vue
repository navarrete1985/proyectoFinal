<template>
  <baseComponent>
    <div>
      <div class="col-lg-12 col-xl-12">
        <!-- Draggable Without Images card start -->
        <div class="card">
          <div class="card-header">
            <h5 class="card-header-text">Mesas</h5>
          </div>
          <div class="card-block">
            <div class="row" id="draggableWithoutImg">
                 <div class="col-md-2 m-b-20" draggable="false" style>
                <div class="card-sub">
                  <div class="card-block">
                    <h5 class="card-title">1</h5>
                  </div>
                </div>
              </div>
              <div class="col-md-2" draggable="false" style>
                <div class="card-sub m-b-20">
                  <div class="card-block">
                    <h5 class="card-title">2</h5>
                    
                  </div>
                </div>
              </div>
              <div class="col-md-2" draggable="false" style>
                <div class="card-sub m-b-20">
                  <div class="card-block">
                    <h5 class="card-title">3</h5>
                    
                  </div>
                </div>
              </div>
              <div class="col-md-2 m-b-20" draggable="false" style>
                <div class="card-sub">
                  <div class="card-block">
                   <h5 class="card-title">4</h5>
                  </div>
                </div>
              </div>
              <div class="col-md-2" style>
                <div class="card-sub">
                  <div class="card-block">
                   <h5 class="card-title">5</h5>
                  </div>
                </div>
              </div>
              <div class="col-md-2" style>
                <div class="card-sub">
                  <div class="card-block">
                   
                    <h5 class="card-title">6</h5>
                  </div>
                </div>
              </div>
              <div class="col-md-2 m-b-20" draggable="false" style>
                <div class="card-sub">
                  <div class="card-block">
                    <h5 class="card-title">1</h5>
                  </div>
                </div>
              </div>
              <div class="col-md-2" draggable="false" style>
                <div class="card-sub m-b-20">
                  <div class="card-block">
                    <h5 class="card-title">2</h5>
                    
                  </div>
                </div>
              </div>
              <div class="col-md-2" draggable="false" style>
                <div class="card-sub m-b-20">
                  <div class="card-block">
                    <h5 class="card-title">3</h5>
                    
                  </div>
                </div>
              </div>
              <div class="col-md-2 m-b-20" draggable="false" style>
                <div class="card-sub">
                  <div class="card-block">
                   <h5 class="card-title">4</h5>
                  </div>
                </div>
              </div>
              <div class="col-md-2" style>
                <div class="card-sub">
                  <div class="card-block">
                   <h5 class="card-title">5</h5>
                  </div>
                </div>
              </div>
              <div class="col-md-2" style>
                <div class="card-sub ">
                  <div class="card-block">
                   
                    <h5 class="card-title">6</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Draggable Without Images card end -->
      </div>
    </div>
  </baseComponent>
</template>

<script>
import baseComponent from "../shared/base";
export default {
  name: "app",
  components: {
    baseComponent
  }
};
</script>

<style lang="scss" scoped>
.col-md-2{
    flex: 0 0 100px !important;
    max-width: 100px !important;
}
</style>