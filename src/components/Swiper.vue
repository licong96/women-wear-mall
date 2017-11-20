<template lang="html">
  <!-- 轮播图组件 -->
  <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
    <swiper-slide v-for="(item, index) in swiperData" :key="index">
      <img class="swiper-img" :src="item.src" alt="">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    props: {
      swiperData: {   // 轮播数据
        type: Array,
        default: []
      },
      loop: {   // 是否循环
        type: Boolean,
        default: false
      },
      autoplay: {   // 自动播放
        type: Number,
        default: 3500
      },
      initialSlide: {   // 索引，从第几张图开始
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        notNextTick: true,
        swiperOption: {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          loop: this.loop,
          autoplay: this.autoplay
        }
      }
    },
    created() {
      this.updateTime = true
    },
    mounted() {
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    methods: {
    },
    watch: {
      initialSlide(newInde) {
        setTimeout(() => {
          this.swiper.params.initialSlide = this.initialSlide   // 设置点击的索引，从第几张图开始
          this.swiper.init()    // 初始化
        }, 20)
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
  .swiper-a {
    display: block;
  }
  .swiper-img {
    max-width: 100%;
    max-height: 100%;
    display: block;
  }
</style>
