<template lang="html">
  <!-- 等待审核 -->
  <section class="full-fixed state-order">
    <div class="main _effect" :class="{'_effect-50': decline}">
      <i class="icon-order"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-dengdai"></use></svg></i>
      <p class="order-text">等待审核</p>
      <button class="waves-effect waves-button waves-light look-order" type="button" @click="_openOrder">查看详情</button>
      <button class="waves-effect waves-button home-order" type="button" @click="_home">返回订单</button>
    </div>
    <transition name="transX">
      <router-view @destroy="destroy"></router-view>
    </transition>
  </section>
</template>

<script>
  export default {
    beforeRouteEnter (to, from, next) {   // 页面切换效果，进入是 true
      next(vm => {
        vm.$emit('destroy', true)
      })
    },
    beforeRouteLeave(to, from, next) {  // 离开是 false
      this.$emit('destroy', false)
      next()
    },
    data() {
      return {
        decline: false,
        tradeItemId: '',
      }
    },
    computed: {
    },
    created() {
      this.tradeItemId = this.$route.query.tradeItemId;
    },
    methods: {
      destroy(booleans) {   // 页面过渡
        setTimeout(() => {
          this.decline = booleans
        }, 30)
      },
      _openOrder() {
        this.$router.replace({
          path: `/mycenter/orderbox/return/audit/afterdetails`,
          query: {
            tradeItemId: this.tradeItemId
          }
        })
      },
      _home() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/sass/variable";
  @import "../../common/sass/mixin";

  .state-order {
    background-color: #fff;
  }
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon-order {
      margin-top: 2.67rem /* 100/37.5 */;
      font-size: 3.47rem /* 130/37.5 */;
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
