<template lang="html">
  <!-- 我的订单容器 -->
  <section class="full-fixed order-box">
    <ul class="nav">
      <li class="list" :class="{'active': currentIndex===0}" @click="_openCut('all', 0)">全部</li>
      <li class="list" :class="{'active': currentIndex===1}" @click="_openCut('deliver', 1)">待发货</li>
      <li class="list" :class="{'active': currentIndex===2}" @click="_openCut('take', 2)">待收货</li>
      <li class="list" :class="{'active': currentIndex===3}" @click="_openCut('remain', 3)">待评价</li>
      <li class="list" :class="{'active': currentIndex===4}" @click="_openCut('after', 4)">售后</li>
    </ul>
    <div class="main">
      <scroll ref='scroll'>
        <router-view name="main"></router-view>
      </scroll>
    </div>
    <!-- 其他操作路由 -->
    <div class="else">
      <router-view name="else"></router-view>
    </div>
  </section>
</template>

<script>
  /**
  * 订单放在本地存储
  * 不同的状态有不同的字段，每个订单添加一个 state
  * state: 0 待发货
  * state: 1 待收货
  * state: 2 待评价
  * state: 3 售后
  **/
  import Scroll from '@/components/vertical-Scroll'

  export default {
    data() {
      return {
        currentIndex: 0,
      }
    },
    created() {
      this._cutActive()
    },
    computed: {
    },
    methods: {
      _cutActive() {    // 切换当前选中的状态
        const pathName = this.$route.name
        switch (pathName) {
          case 'all':
            this.currentIndex = 0
            break
          case 'deliver':
            this.currentIndex = 1
            break
          case 'take':
            this.currentIndex = 2
            break
          case 'remain':
            this.currentIndex = 3
            break
          case 'after':
            this.currentIndex = 4
            break
          default:
            this.currentIndex = 0
        }
      },
      _openCut(cut, index) {    // 切换
        this.currentIndex = index
        this.$router.replace({
          path: `/mycenter/orderbox/${cut}`
        });
        // this.$refs.scroll.scrollTo(0, 0, 0);
        // this.$refs.scroll.forceUpdate();
        setTimeout(() => {
          this.$refs.scroll.scrollTo(0, 0, 0);
        }, 30);
      },
    },
    components: {
      Scroll
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/sass/variable";
  @import "../../common/sass/mixin";

  .order-box {
    overflow: hidden;
    background-color: $color-background-e;
    .nav {
      @include border-b-1px(0);
      position: relative;
      z-index: 8;
      display: flex;
      align-items: center;
      height: 1.2rem /* 45/37.5 */;
      background-color: #fff;
      .list {
        flex: 1;
        font-size: .43rem /* 16/37.5 */;
        line-height: 1.2rem /* 45/37.5 */;
        text-align: center;
        &.active {
          color: $color-theme;
        }
      }
    }
    .main {
      overflow: hidden;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      padding-top: 1.2rem /* 45/37.5 */;
    }
  }
</style>
