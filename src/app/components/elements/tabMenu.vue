<template>
  <!-- tab header start v-for options-->
  <div class="tab-header card">
    <ul class="nav nav-tabs md-tabs tab-timeline" role="tablist" id="mytab">
      <!-- :class="{ 'uk-active' : letter == selectedLetter}"-->
      <li
        class="nav-item"
        v-for="(tab, index) in arrayTabs"
        :value="tab"
        :key="index"
        @click="setOption(index)"
      >
        <a
          class="nav-link"
          :class="{'active':index == position}"
          role="tab"
        >{{tab}}</a>
        <div class="slide" :style="{'width':`calc(100% / ${arrayTabs.length})`}"></div>
      </li>
    </ul>
  </div>
</template>

<script>
import { console } from "../../util/helper";
export default {
    data() {
            return {
                position: 0
            }
        },
        props: {
            arrayTabs: {
                type: Array,
                required: true,
            } //,
            // imageBanner: {
            //     type: String,
            //     default: () => {
            //         return 'http://localhost:3000/src/users/default-bg.jpg';
            //     }
            // }
        },
        methods: {
            setOption(index) {
                this.position = index;
                this.$emit("changeTab", index);
            }
        }
};
</script>

<style lang="scss" scoped>
    .md-tabs .nav-item {
        flex: 1 1 25%;
    }

    li {
        cursor: pointer;
    }
</style>
