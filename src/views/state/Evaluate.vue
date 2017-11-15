<template lang="html">
  <!-- 评价成功 -->
  <section class="full-fixed evaluate">
    <div class="main">
      <i class="icon-order"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-pingjia"></use></svg></i>
      <p class="order-text">评价成功</p>
      <button class="waves-effect waves-button home-order" type="button" @click="_back">返回订单</button>
    </div>
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
    methods: {
      _back() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/sass/variable";
  @import "../../common/sass/mixin";

  .evaluate {
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
