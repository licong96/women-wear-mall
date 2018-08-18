<template lang="html">
  <!-- 订单成功 -->
  <section class="full-fixed state-order">
    <i class="icon-order"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-tijiaodingdan"></use></svg></i>
    <p class="order-text">订单已提交，等待商家确认</p>
    <button class="waves-effect waves-button waves-light look-order" type="button" @click="_openOrder">查看订单</button>
    <button class="waves-effect waves-button home-order" type="button" @click="_home">返回首页</button>
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
      }
    },
    created() {
    },
    computed: {
    },
    methods: {
      _openOrder() {
        this.$router.replace({
          path: '/mycenter/orderbox/all'
        })
      },
      _home() {
        this.$router.replace({
          path: '/list'
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/sass/variable";
  @import "../../common/sass/mixin";

  .state-order {
    z-index: 99;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
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
