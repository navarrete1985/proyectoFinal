<template>
  <div id="pcoded" class="pcoded">
    <div class="pcoded-overlay-box"></div>
    <div class="pcoded-container navbar-wrapper">
      <HeaderComponent/>
      <div class="pcoded-main-container">
        <div class="pcoded-wrapper">
          <NavComponent/>
          <main>cosas</main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "./header";
import NavComponent from "./nav";

export default {
  name: "app",
  components: {
    HeaderComponent,
    NavComponent
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
</style>