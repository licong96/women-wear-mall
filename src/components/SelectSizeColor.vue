<template lang="html">
  <transition name="transY">
    <section class="select-wrap">
      <div class="mack" @click="_selectHide"></div>
      <div class="sel-content">
        <!-- 上面一部分 -->
        <div class="sel-header">
          <div class="sel-img-wrap">
            <img class="sel-img" src="https://s2.mogucdn.com/mlcdn/c45406/171019_45i2j10h7e27554a5hi1d942i63ll_640x960.jpg" alt="">
          </div>
          <div class="sel-text">
            <h3 class="sel-money">
              <i class="iconfont">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-renminbi"></use>
                </svg>
              </i><span>199.00</span>
            </h3>
            <p class="sel-inventory">库存10件</p>
            <p class="sel-color-size">
              请选择：<span class="sel-color">颜色</span><span class="sel-size">尺码</span>
            </p>
          </div>
          <i class="iconfont icon-close" @click="_selectHide">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-guanbi"></use>
            </svg>
          </i>
        </div>
        <!-- 中间选择 -->
        <div class="sel-body">
          <!-- 颜色 -->
          <div class="sel-b-color">
            <p class="sel-b-title">颜色：</p>
            <span class="sel-b-item">白色</span>
            <span class="sel-b-item">黑色</span>
            <span class="sel-b-item">粉色</span>
          </div>
          <!-- 尺码 -->
          <div class="sel-b-color">
            <p class="sel-b-title">尺码：</p>
            <span class="sel-b-item">S</span>
            <span class="sel-b-item">M</span>
            <span class="sel-b-item">L</span>
          </div>
          <!-- 数量 -->
          <div class="sel-b-color">
            <p class="sel-b-title">数量：</p>
            <div class="sel-b-num-box">
              <span class="sel-b-num">-</span>
              <span class="sel-b-num-val">1</span>
              <span class="sel-b-num">+</span>
            </div>
          </div>
        </div>
        <!-- 底部按钮 -->
        <div class="footer-bar">
          <p class="bar-yellow">加入购物车</p>
          <p class="bar-red">加入会员</p>
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
  import {mapMutations} from 'vuex'

  export default {
    methods: {
      _selectHide() {   // 隐藏商品选择颜色尺寸
        this.setSelectSizeColor(false)
      },
      ...mapMutations({
        setSelectSizeColor: 'SET_SELECT_SIZE_COLOR'
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "../common/sass/variable";
  @import "../common/sass/mixin";

  .select-wrap {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 20;
    .mack {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      background-color: rgba(0, 0, 0, .4);
    }
    .sel-content {
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 2;
      width: 100%;
      background-color: #fff;
    }
    // 上面的样式
    .sel-header {
      display: flex;
      align-items: flex-end;
      @include border-b-1px(0);
      padding: .43rem /* 16/37.5 */;
      height: 2.67rem /* 100/37.5 */;
      .sel-img-wrap {
        position: relative;
        width: 2.67rem /* 100/37.5 */;
        .sel-img {
          vertical-align: top;
          width: 100%;
        }
      }
      .sel-text {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: .43rem /* 16/37.5 */;
        height: 100%;
        .sel-money {
          font-size: .53rem /* 20/37.5 */;
          color: $color-theme;
          .iconfont {
            font-size: .43rem /* 16/37.5 */;
          }
        }
        .sel-inventory {
          font-size: .37rem /* 14/37.5 */;
          color: $color-text-6;
        }
        .sel-color-size {
          font-size: .37rem /* 14/37.5 */;
          color: $color-text;
        }
      }
      .icon-close {
        position: absolute;
        top: .16rem /* 6/37.5 */;
        right: .16rem /* 6/37.5 */;
        padding: .27rem /* 10/37.5 */;
        font-size: .53rem /* 20/37.5 */;
        color: $color-text-9;
      }
    }
    // 中间选择颜色尺寸
    .sel-body {
      padding: .43rem /* 16/37.5 */;
      .sel-b-color {
        padding-bottom: .21rem /* 8/37.5 */;
      }
      .sel-b-title {
        padding-bottom: .16rem /* 6/37.5 */;
        font-size: .32rem /* 12/37.5 */;
        color: $color-text;
      }
      .sel-b-item {
        display: inline-block;
        padding: 0 .4rem /* 15/37.5 */;
        border: 1px solid #bbb;
        border-radius: .08rem /* 3/37.5 */;
        margin-right: .27rem /* 10/37.5 */;
        margin-bottom: .27rem /* 10/37.5 */;
        line-height: .69rem /* 26/37.5 */;
        font-size: .37rem /* 14/37.5 */;
        color: #5e5e5e;
        white-space: nowrap;
        text-align: center;
      }
      // 数量
      .sel-b-num-box {
        display: flex;
        border: 1px solid #bbb;
        border-radius: .08rem /* 3/37.5 */;
        width: 2.67rem /* 100/37.5 */;
        .sel-b-num {
          width: .8rem /* 30/37.5 */;
          height: .8rem /* 30/37.5 */;
          line-height: .8rem /* 30/37.5 */;
          text-align: center;
        }
        .sel-b-num-val {
          flex: 1;
          border-left: 1px solid #bbb;
          border-right: 1px solid #bbb;
          line-height: .8rem /* 30/37.5 */;
          text-align: center;
        }
      }
    }
    // 底部按钮
    .footer-bar {
      display: flex;
      font-size: .43rem /* 16/37.5 */;
      color: #fff;
      line-height: 1.33rem /* 50/37.5 */;
      text-align: center;
      .bar-yellow {
        flex: 1;
        background-color: #FF9800;
      }
      .bar-red {
        flex: 1;
        background-color: #FF3355;
      }
    }
  }
  // 页面过渡
  .transY-enter-active,
  .transY-leave-active{
    transition: .3s all ease;
    .sel-content,
    .mack {
      transition: .3s all ease;
    }
  }
  .transY-enter,
  .transY-leave-to{
    .mack {
      opacity: 0;
    }
    .sel-content {
      transform: translate3d(0, 120%, 0);
    }
  }
</style>
