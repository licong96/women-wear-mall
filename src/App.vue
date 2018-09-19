<template>
  <div id="app">
    <!-- 修改微信title -->
    <div v-wechat-title="$route.meta.title"></div>
    <!-- <the-header></the-header> -->
    <div class="main">
      <!-- 用了缓存记得在 activated 更新数据 -->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <!-- 底部导航 -->
    <the-nav></the-nav>
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
  import TheNav from '@/components/TheNav'
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
    },
    mounted() {},
    computed: {
      ...mapGetters([
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
      TheNav,
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
