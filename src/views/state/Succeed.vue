<template lang="html">
  <!-- 交易成功 -->
  <section class="full-fixed succeed">
    <div class="main _effect" :class="{'_effect-50': decline}">
      <i class="icon-order"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-jiaoyichenggong"></use></svg></i>
      <p class="order-text">交易成功</p>
      <button class="waves-effect waves-button waves-light look-order" type="button" @click="_openOrder">去评价</button>
      <button class="waves-effect waves-button home-order" type="button" @click="_home">返回订单</button>
    </div>
    <transition name="transX">
      <router-view @destroy="destroy"></router-view>
    </transition>
  </section>
</template>

<script>
  import {mapMutations} from 'vuex'

  export default {
    beforeRouteLeave(to, from, next) {    // 离开是 false
      setTimeout(() => {
        this.setRouterAnim(false)
      }, 20)
      next()
    },
    data() {
      return {
        decline: false
      }
    },
    computed: {
    },
    methods: {
      destroy(booleans) {   // 页面过渡
        setTimeout(() => {
          this.decline = booleans
        }, 30)
      },
      _openOrder() {
        this.$router.replace({
          path: `/mycenter/orderbox/succeed/evaluate`
        })
      },
      _home() {
        this.$router.back()
      },
      ...mapMutations({
        setRouterAnim: 'SET_ROUTER_ANIM'
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/sass/variable";
  @import "../../common/sass/mixin";

  .succeed {
    overflow: hidden;
    background-color: #fff;
  }
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon-order {
      margin-top: 2.67rem /* 100/37.5 */;
      font-size: 3.47rem /* 130/37.5 */;
      color: $color-theme;
    }
    .order-text {
      margin-top: .53rem /* 20/37.5 */;
      font-size: .43rem /* 16/37.5 */;
      color: $color-text-d;
    }
    .look-order {
      margin-top: 2.67rem /* 100/37.5 */;
      width: 5.07rem /* 190/37.5 */;
      font-size: .43rem /* 16/37.5 */;
      color: #fff;
      background-color: $color-theme;
    }
    .home-order {
      margin-top: 1.07rem /* 40/37.5 */;
      width: 5.07rem /* 190/37.5 */;
      font-size: .43rem /* 16/37.5 */;
      border: 1px solid $color-theme;
      color: $color-theme;
    }
  }
  .transXL-enter-active,
  .transXL-leave-active{
    transition: .3s all ease;
  }
  .transXL-enter,
  .transXL-leave-to{
    transform: translate3d(-100%, 0, 0);
  }
</style>
