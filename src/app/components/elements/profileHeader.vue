<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="cover-profile">
        <div class="profile-bg-img">
          <div
            class="dynamic-bg bg profile-bg-image profile-bg-img img-fluid"
            :style="{'background-image':`url(${imageBanner})`}"
          ></div>
          <!-- <img class="profile-bg-img img-fluid" src="http://localhost:3000/src/users/default-bg.jpg" alt="bg-img"> -->
          <div class="card-block user-info">
            <div class="col-md-12">
              <div class="media-left">
                <a href="#" class="profile-image">
                  <div
                    class="dynamic-bg bg user-img user-image img-radius"
                    :style="{'background-image':`url(${imageProfile})`}"
                    alt="user-image"
                  ></div>
                </a>
              </div>
              <div class="media-body row">
                <div class="col-lg-12">
                  <div class="user-title">
                    <h2>
                      <slot name="title"></slot>
                    </h2>
                    <span class="text-white">
                      <slot name="subtitle"></slot>
                    </span>
                  </div>
                </div>
                <div>
                  <div class="pull-right cover-btn">
                    <slot name="buttons"></slot>
                    <!-- <button type="button" class="btn btn-primary m-r-10 m-b-5"><i class="icofont icofont-plus"></i> Follow</button>
                    <button type="button" class="btn btn-primary"><i class="icofont icofont-ui-messaging"></i> Message</button>-->
                  </div>
                </div>
                <router-link
                  v-if="id != null"
                  :to="{path: `../tables/${id}`}"
                  replace
                  class="btn btn-sm btn-primary rel"
                >Mesas del establecimiento</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageProfile: {
      type: String,
      required: true
    },
    id:{
        type: String,
        default: null
    },
    imageBanner: {
      type: String,
      required: true
    }
  },
  mounted() {
    // document.querySelectorAll('.dynamic-bg').forEach(item => item.style.backgroundImage = `url('${item.dataset.img}')`);
  }
};
</script>

<style lang="scss" scoped>
.bg {
  background-repeat: no-repeat;
  background-position: center;
}

.user-image {
  width: 108px;
  height: 108px;
  background-size: contain;
  border: 4px solid #fff;
  background-color: lightgray;
}

.profile-bg-image {
  width: 100%;
  height: 200px;
  background-size: cover;
}
.rel{
    position: absolute;
    right: 40px;
    bottom: 40px;
}
.card-block.user-info {
  bottom: -10px;

  @media screen and (max-width: 992px) {
    background-color: transparent;
    position: absolute;
    bottom: 0px;
  }
}
</style>