<template lang="html">
  <!-- 我的个人中心 -->
  <section class="my-center">
    <div class="_effect" :class="{'_effect-50': decline}">
      <!-- 用户信息 -->
      <div class="my-head">
        <div class="my-head-wrap">
          <div class="my-img-wrap">
            <img class="my-img" src="https://img11.360buyimg.com/jdphoto/s120x122_jfs/t5683/191/7076936752/5123/834e5571/596dd62bN7a8affc5.png" alt="">
          </div>
          <div class="my-head-text">
            <p class="my-username">用户名</p>
            <p class="my-phone">13699531996</p>
          </div>
          <div class="my-header-cash">
            <p class="my-cash" @click="_openPage('cash')">余额：<i class="icon-renminbi"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-renminbi"></use></svg></i>0</p>
            <p class="my-friend">邀请好友</p>
          </div>
        </div>
      </div>
      <!-- 收藏、信息、友圈 -->
      <div class="my-collect-wrap">
        <ul class="my-collect-ul">
          <li class="my-collect-li" @click="_openPage('collect')">
            <i class="icon-shoucang"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-shoucang"></use></svg></i>
            <p class="collect-text">收藏</p>
          </li>
          <li class="my-collect-li" @click="_openPage('message')">
            <i class="icon-xinxi"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-xinxi"></use></svg></i>
            <p class="collect-text">信息</p>
          </li>
          <li class="my-collect-li" @click="_openPage('friend')">
            <i class="icon-quanyou00"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-quanyou00"></use></svg></i>
            <p class="collect-text">友圈</p>
          </li>
        </ul>
      </div>
      <!-- 订单 -->
      <div class="my-order">
        <div class="my-order-title">
          <span class="my-order-l"><i class="icon-dingdan"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-dingdan"></use></svg></i>我的订单</span>
          <span class="my-order-r" @click="_openPage('orderbox/all')">查看全部订单<i class="icon-jiantou"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-jiantou-copy-copy"></use></svg></i></span>
        </div>
        <div class="my-order-center">
          <ul class="my-order-ul">
            <li class="my-order-li" @click="_openPage('orderbox/deliver')">
              <i class="icon-order-i"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-daifahuo1"></use></svg></i>
              <p class="my-order-text">待发货</p>
            </li>
            <li class="my-order-li" @click="_openPage('orderbox/take')">
              <i class="icon-order-i"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-daishouhuo"></use></svg></i>
              <p class="my-order-text">待收货</p>
            </li>
            <li class="my-order-li" @click="_openPage('orderbox/remain')">
              <i class="icon-order-i"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-daipingjia"></use></svg></i>
              <p class="my-order-text">待评价</p>
            </li>
            <li class="my-order-li" @click="_openPage('orderbox/after')">
              <i class="icon-order-i"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-shouhou1"></use></svg></i>
              <p class="my-order-text">退款/售后</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 收货地址 -->
      <div class="my-shipping">
        <div class="my-shipping-title">
          <span class="my-shipping-l"><i class="icon-shipping"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-dizhi"></use></svg></i>收货地址</span>
          <span class="my-shipping-r" @click="_openPage('location')">修改地址<i class="icon-jiantou"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-jiantou-copy-copy"></use></svg></i></span>
        </div>
        <div class="my-shipping-center" @click="_openPage('location')">
          <span class="my-shipping-text text-over">江西省南昌市红谷滩新区卧龙路999号</span>
          <i class="icon-jiantou"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-jiantou-copy-copy"></use></svg></i>
        </div>
      </div>
    </div>
    <!-- 子页面 -->
    <transition name="transX">
      <router-view @destroy="destroy"></router-view>
    </transition>
  </section>
</template>

<script>
  export default {
    beforeRouteUpdate(to, from, next) {
      next()
      if (from.name === 'mycenter') {
        setTimeout(() => {
          this.decline = true
        }, 100)
      }
    },
    data() {
      return {
        decline: false
      }
    },
    methods: {
      _openPage(page) {   // 打开新页面
        this.$router.push({
          path: `/mycenter/${page}`
        })
      },
      destroy() {   // 页面过渡
        this.decline = false
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../common/sass/variable";
  @import "../common/sass/mixin";

  .my-head {
    position: relative;
    padding: .27rem /* 10/37.5 */;
    background-color: #fff;
  }
  // 顶部用户样式
  .my-head-wrap {
    display: flex;
    align-items: center;
    padding: .53rem /* 20/37.5 */ .27rem /* 10/37.5 */;
    border-radius: .16rem /* 6/37.5 */;
    background: linear-gradient(90deg, #FF3355, #ff7459);
    box-shadow: 0 2px 4px rgba(228, 57, 60, .4);
    color: #fff;
    .my-img-wrap {
      width: 1.87rem /* 70/37.5 */;
      .my-img {
        vertical-align: top;
        width: 100%;
      }
    }
    .my-head-text {
      flex: 1;
      padding-left: .32rem /* 12/37.5 */;
      font-size: .37rem /* 14/37.5 */;
      .my-username {
        margin-bottom: .27rem /* 10/37.5 */;
      }
      .my-phone {
        color: rgba(255, 255, 255, .7);
      }
    }
    .my-cash {
      padding: .16rem /* 6/37.5 */ .53rem /* 20/37.5 */;
      border-radius: .53rem /* 20/37.5 */;
      background-color: rgba(0, 0, 0, .3);
    }
    .my-friend {
      display: inline-block;
      margin-top: .4rem /* 15/37.5 */;
      padding: .16rem /* 6/37.5 */ .53rem /* 20/37.5 */;
      border-radius: .53rem /* 20/37.5 */;
      background-color: rgba(0, 0, 0, .3);
    }
  }
  // 收藏、信息、友圈
  .my-collect-wrap {
    margin-top: .27rem /* 10/37.5 */;
    padding: 0 .43rem /* 16/37.5 */;
    background-color: #fff;
    .my-collect-ul {
      display: flex;
      text-align: center;
      .my-collect-li {
        flex: 1;
        padding: .27rem /* 10/37.5 */ 0;
        .icon-shoucang {
          font-size: .8rem /* 30/37.5 */;
        }
        .icon-xinxi {
          font-size: .8rem /* 30/37.5 */;
          color: #33a0fd;
        }
        .icon-quanyou00 {
          font-size: .8rem /* 30/37.5 */;
          color: #f1c337;
        }
        .collect-text {
          margin-top: .13rem /* 5/37.5 */;
          color: $color-text-d;
        }
      }
    }
  }
  // 我的订单
  .my-order {
    margin-top: .27rem /* 10/37.5 */;
    padding: 0 .43rem /* 16/37.5 */;
    background-color: #fff;
    .my-order-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 1.2rem /* 45/37.5 */;
      @include border-b-1px(0);
      .my-order-l {
        font-size: .37rem /* 14/37.5 */;
        color: $color-text;
      }
      .my-order-r {
        line-height: 1.2rem /* 45/37.5 */;
        font-size: .32rem /* 12/37.5 */;
        color: $color-text-9;
      }
      .icon-dingdan {
        padding-right: .11rem /* 4/37.5 */;
        font-size: .53rem /* 20/37.5 */;
        color: #00BAFF;
      }
      .icon-jiantou {
        padding-left: .11rem /* 4/37.5 */;
        font-size: .32rem /* 12/37.5 */;
        color: $color-text-9;
      }
    }
    .my-order-ul {
      display: flex;
      align-items: center;
      .my-order-li {
        flex: 1;
        padding: .43rem /* 16/37.5 */ 0;
        text-align: center;
      }
      .icon-order-i {
        font-size: .8rem /* 30/37.5 */;
        color: $color-text-6;
      }
      .my-order-text {
        padding-top: .13rem /* 5/37.5 */;
        color: $color-text-6;
      }
    }
  }
  // 收货地址
  .my-shipping {
    margin-top: .27rem /* 10/37.5 */;
    padding: 0 .43rem /* 16/37.5 */;
    background-color: #fff;
    font-size: .37rem /* 14/37.5 */;
    color: $color-text-6;
    .my-shipping-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 1.2rem /* 45/37.5 */;
      @include border-b-1px(0);
      .my-shipping-l {
        font-size: .37rem /* 14/37.5 */;
        color: $color-text;
      }
      .my-shipping-r {
        font-size: .32rem /* 12/37.5 */;
        color: $color-text-9;
      }
    }
    .my-shipping-center {
      display: flex;
      align-items: center;
      padding: .43rem /* 16/37.5 */ 0;
    }
    .my-shipping-text {
      flex: 1;
    }
    .icon-shipping {
      padding: .05rem /* 2/37.5 */;
      margin-right: .08rem /* 3/37.5 */;
      font-size: .48rem /* 18/37.5 */;
    }
    .icon-jiantou {
      color: $color-text-9;
      padding-left: .11rem /* 4/37.5 */;
      font-size: .32rem /* 12/37.5 */;
    }
  }
</style>
