<template lang="html">
  <!-- 保证金 -->
  <section class="full-fixed my-cash">
    <div class="cash-top">
      <i class="icon-cash"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-zongzichan"></use></svg></i>
      <p class="cash-top-title">我的余额</p>
      <p class="cash-top-money"><i class="icon-renminbi"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-renminbi"></use></svg></i>{{money}}</p>
    </div>
    <div class="cash-body">
      <p>规则说明</p>
    </div>
      <div class="cash-footer">
        <transition name="transY">
          <div class="c-f-pay" @click="_pay" v-show="!money">支付</div>
        </transition>
        <div class="waves-effect waves-block c-f-withdraw" @click="_withdraw" v-show="money">邀请好友</div>
      </div>
  </section>
</template>

<script>
  import {mapMutations} from 'vuex'

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
        money: 0
      }
    },
    methods: {
      _pay() {    // 支付
        this.setAlertHint({
          lsattr: true,
          text: '支付完成'
        })
        this.money = 1500
      },
      _withdraw() {   // 提现
      },
      ...mapMutations({
        setAlertHint: 'SET_ALERT_HINT'
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/sass/variable";
  @import "../../common/sass/mixin";

  .my-cash {
    background-color: #fff;
  }
  // 顶部样式
  .cash-top {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: .8rem /* 30/37.5 */ 0;
    background: linear-gradient(360deg, #FF3355, #ff7459);
    box-shadow: 0 2px 4px rgba(228, 57, 60, .4);
    color: #fff;
    .icon-cash {
      font-size: 2.13rem /* 80/37.5 */;
    }
    .cash-top-title {
      margin-top: .43rem /* 16/37.5 */;
      font-size: .37rem /* 14/37.5 */;
    }
    .cash-top-money {
      margin-top: .43rem /* 16/37.5 */;
      font-size: .91rem /* 34/37.5 */;
      font-weight: bold;
      .icon-renminbi {
        font-size: .48rem /* 18/37.5 */;
      }
    }
  }
  // 中间样式
  .cash-body {
    padding: .43rem /* 16/37.5 */;
  }
  // 底部样式
  .cash-footer {
    @include border-b-1px(100%);
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1.33rem /* 50/37.5 */;
    line-height: 1.33rem /* 50/37.5 */;
    text-align: center;
    .c-f-pay {
      width: 100%;
      height: 100%;
      font-size: .48rem /* 18/37.5 */;
      color: #fff;
      background: linear-gradient(90deg, #FF3355, #ff7459);
    }
    .c-f-withdraw {
      width: 100%;
      height: 100%;
      font-size: .43rem /* 16/37.5 */;
      color: $color-theme;
    }
  }
</style>
