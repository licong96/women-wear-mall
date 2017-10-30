<template lang="html">
  <swiper :options="swiperOption" class="swiper">
    <swiper-slide v-for="item in swiperData" :key="item.id">
      <a href="#" class="swiper-a">
        <img class="swiper-img" :src="item.src" alt="">
      </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    props: {
      swiperData: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        swiperOption: {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          loop: true
        }
      }
    },
    watch: {
      swiperData(news) {
        // console.log(news)
      }
    },
    components: {
      swiper,
      swiperSlide
    }
  }
</script>

<style scoped lang="scss">
  @import "../common/sass/variable";

  .swiper {
    overflow: hidden;
    height: 4.8rem /* 180/37.5 */;
  }
  .swiper-a {
    display: block;
    .swiper-img {
      max-width: 100%;
      width: 100%;
      display: block;
    }
  }
</style>
