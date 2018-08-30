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
      <scroll
        ref='scroll'
        :pullDownRefresh="pullDownRefreshObj"
        :pullUpLoad="pullUpLoadObj"
        @pullingDown="onPullingDown"
        @pullingUp="onPullingUp"
      >
        <div>
          <router-view name="main"></router-view>
          <transition :name="transition">
          </transition>
        </div>
      </scroll>
    </div>
    <!-- 其他操作路由 -->
    <div class="else">
      <transition name="transX">
        <router-view name="else"></router-view>
      </transition>
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
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    beforeRouteEnter (to, from, next) {   // 页面切换效果，进入是 true
      next(vm => {
        vm._cutActive()
        vm.$emit('destroy', true)
      })
    },
    beforeRouteLeave(to, from, next) {  // 离开是 false
      if (to.name === 'submitorder') {    // 如果离开到订单页去，就去掉动画，个人中心进入，动画冲突
        this.setRouterAnim(false)
      }
      this.$emit('destroy', false)
      next()
    },
    data() {
      return {
        currentIndex: 0,
        pullDownRefreshObj: {
          threshold: 50,
          stop: 50
        },
        pullUpLoadObj: {
          threshold: 50
        },
      }
    },
    created() {
      this._cutActive()
    },
    computed: {
      transition() {
        return this.routerAnim ? 'transXL' : ''
      },
      ...mapGetters([
        'routerAnim'
      ])
    },
    methods: {
      // 模拟更新数据
      onPullingDown() {
        this.$refs.scroll.forceUpdate();
      },
      // 下滑加载更多
      onPullingUp() {
        this.$refs.scroll.forceUpdate();
      },
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
        this.setRouterAnim(false)
        this.currentIndex = index
        this.$router.replace({
          path: `/mycenter/orderbox/${cut}`
        });
        this.$refs.scroll.scrollTo(0, 0, 30);
      },
      ...mapMutations({
        'setRouterAnim': 'SET_ROUTER_ANIM'
      })
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
      position: absolute;
      top: 1.2rem /* 45/37.5 */;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>
