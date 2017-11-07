<template lang="html">
  <!-- 订单成功 -->
  <transition name="transX">
    <section class="full-fixed state-order" v-show="stateOrder">
      <i class="icon-order"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-tijiaodingdan"></use></svg></i>
      <p class="order-text">订单已提交，等待商家确认</p>
      <button class="waves-effect waves-button waves-light look-order" type="button" name="button">查看订单</button>
      <button class="waves-effect waves-button home-order" type="button" @click="_home">返回首页</button>
    </section>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'stateOrder'
      ])
    },
    methods: {
      _home() {
        this.$router.push({
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
</style>
