<template>
  <div id="app">
    <div v-wechat-title="$route.meta.title" img-set="http://red.tianshic.com/women-wear-mall/logo.png"></div>
    <!-- 修改微信title -->
    <div v-wechat-title="$route.meta.title"></div>
    <!-- <the-header></the-header> -->
    <div class="main">
      <router-view></router-view>
      <!-- <keep-alive>
      慎用缓存
      </keep-alive> -->
    </div>
    <!-- 底部导航 -->
    <the-nav></the-nav>
    <!-- 选择商品颜色尺寸 -->
    <select-size-color v-show="selectSizeColor" :specification-data="specificationData"></select-size-color>
    <!-- 全屏预览一组图片 -->
    <transition name="swiper-opacity">
      <section class="swiper-full" v-show="swiperFull.length" @click="_swiperFullHide">
        <p class="sw-hint"><span class="sw-hint-span">点击任意地方可关闭</span></p>
        <swiper :swiper-data="swiperFull" :autoplay="autoplay" :initial-slide="swiperFullIndex"></swiper>
      </section>
    </transition>
    <!-- 提示信息 -->
    <alert-hint></alert-hint>
  </div>
</template>

<script>
  // import TheHeader from '@/components/TheHeader'
  import TheNav from '@/components/TheNav'
  import SelectSizeColor from '@/components/SelectSizeColor'
  import Swiper from '@/components/Swiper'
  import AlertHint from '@/components/AlertHint'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'app',
    data() {
      return {
      }
    },
    created() {
      this.autoplay = 0     // 取消全屏轮播自动播放
      console.log('%c开发者：黎聪 ', 'background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #FF3355),color-stop(0.75, #22f), color-stop(0.9, #ff7459), color-stop(1, #ff7459) );color:transparent;-webkit-background-clip: text;font-size:24px;')
      console.log('%cGitHub：https://github.com/licong96', 'text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:16px')
    },
    mounted() {},
    computed: {
      ...mapGetters([
        'selectSizeColor',
        'specificationData',
        'swiperFull',
        'swiperFullIndex'
      ])
    },
    methods: {
      _swiperFullHide() {
        this.setSwiperFull([])
        this.setSwiperFullIndex(0)
      },
      ...mapMutations({
        setSwiperFull: 'SET_SWIPER_FULL',
        setSwiperFullIndex: 'SET_SWIPER_FULL_INDEX'
      })
    },
    watch: {},
    components: {
      // TheHeader,
      TheNav,
      SelectSizeColor,
      Swiper,
      AlertHint
    }
  }
</script>

<style scoped lang="scss">
  @import "./common/sass/variable";

  #app,
  .main {
    overflow: hidden;
    margin: 0 auto;
    max-width: 600px;
    width: 100%;
    height: 100%;
    background-color: $color-background-e;
  }
  // 全屏轮播图切换
  .swiper-opacity-enter-active,
  .swiper-opacity-leave-active {
    transition: .3s all ease;
  }
  .swiper-opacity-enter,
  .swiper-opacity-leave-to {
    opacity: 0;
  }
  .swiper-full {
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 20;
    padding: .8rem /* 30/37.5 */ 0;
    background-color: rgba(0, 0, 0, 1);
    .sw-hint {
      position: absolute;
      top: .32rem /* 12/37.5 */;
      left: 0;
      z-index: 21;
      width: 100%;
      color: rgba(255, 255, 255, .8);
      font-size: .32rem /* 12/37.5 */;
      text-align: center;
      animation: swhint .3s 2s linear forwards;
      .sw-hint-span {
        padding: 2px .16rem /* 6/37.5 */;
        border-radius: .53rem /* 20/37.5 */;
        background-color: rgba(0, 0, 0, .6);
      }
    }
  }
  @keyframes swhint {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translate3d(0, -100%, 0);
    }
  }
</style>
