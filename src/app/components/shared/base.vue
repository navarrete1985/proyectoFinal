<template>
  <div id="pcoded" class="pcoded">
    <div class="pcoded-overlay-box"></div>
    <div class="pcoded-container navbar-wrapper">
      <HeaderComponent />
      <main>
        cosas
      </main>
      
    </div>
  </div>
</template>

<script>
import HeaderComponent from "./header";

export default {
  name:'app',
  components: {
    HeaderComponent
  }
};
</script>

<style lang="scss" scoped>
</style>