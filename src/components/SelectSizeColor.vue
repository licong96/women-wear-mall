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
            <!-- <p class="sel-inventory">库存10件</p> -->
            <div class="sel-color-size">
              <p class="selected" v-show="select.color || select.size">
                <span class="selected-title">已选择：</span>
                <span class="selected-text" v-show="select.color">"{{select.color}}"</span>
                <span class="selected-text" v-show="select.size">"{{select.size}}"</span>
              </p>
              <p v-show="!select.color || !select.size">
                <span>请选择：</span>
                <span class="selectplz-text" v-show="!select.color">颜色</span>
                <span class="selectplz-text" v-show="!select.size">尺码</span>
              </p>
            </div>
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
            <span class="sel-b-item" v-for="(item, index) in specificationData.color" :key="index" @click="_onColor(item, index)" :class="{'color-index': colorIndex===index}">{{item}}</span>
          </div>
          <!-- 尺码 -->
          <div class="sel-b-color">
            <p class="sel-b-title">尺码：</p>
            <span class="sel-b-item" v-for="(item, index) in specificationData.size" :key="index" @click="_onSize(item, index)" :class="{'size-index': sizeIndex===index}">{{item}}</span>
          </div>
          <!-- 数量 -->
          <div class="sel-b-color">
            <p class="sel-b-title">数量：</p>
            <div class="sel-b-num-box">
              <span class="sel-b-num" @click="_subtract">-</span>
              <span class="sel-b-num-val">{{quantity}}</span>
              <span class="sel-b-num add-btn" @click="_add">+</span>
            </div>
          </div>
        </div>
        <!-- 底部按钮 -->
        <div class="footer-bar">
          <p class="bar-yellow" @click="_addCart">加入购物车</p>
          <p class="bar-red" @click="_addMember">加入会员</p>
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
  import {mapMutations} from 'vuex'

  export default {
    props: {
      specificationData: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        select: {},
        colorIndex: -1,    // 当前选择的颜色
        sizeIndex: -1,     // 当前选择的尺寸
        quantity: 1      // 数量
      }
    },
    created() {
      this.select.value = this.quantity   // 这个是数量
      this.path = this.$route.params.id   // 当前商品 id
    },
    computed: {
    },
    methods: {
      _onColor(text, index) { // 选择颜色
        if (this.select.color === text) {
          this.colorIndex = -1
          this.select.color = ''
        } else {
          this.colorIndex = index
          this.select.color = text
          this.setSelectSpecification(this.select)    // 修改后，存到状态管理
        }
      },
      _onSize(text, index) {  // 选择尺寸
        if (this.select.size === text) {
          this.sizeIndex = -1
          this.select.size = ''
        } else {
          this.sizeIndex = index
          this.select.size = text
          this.setSelectSpecification(this.select)
        }
      },
      _subtract() { // 数量减
        if (this.quantity > 1) {
          this.quantity--
        } else {
          this.quantity = 1
        }
        this.select.value = this.quantity
      },
      _add() {
        this.quantity++
        this.select.value = this.quantity
      },
      _selectHide() {   // 隐藏商品选择颜色尺寸
        this.setSelectSizeColor(false)
      },
      _addCart() {
        if (!this.select.color) {
          this.setAlertHint({     // 弹出提示，2000sm后自动隐藏
            lsattr: true,
            text: '请选择颜色'
          })
        } else if (!this.select.size) {
          this.setAlertHint({
            lsattr: true,
            text: '请选择尺码'
          })
        } else {
          this.setAlertHint({
            lsattr: true,
            text: '成功加入购物车'
          })
        }
      },
      _addMember() {  // 加入会员
        if (!this.select.color) {
          this.setAlertHint({     // 弹出提示，2000sm后自动隐藏
            lsattr: true,
            text: '请选择颜色'
          })
        } else if (!this.select.size) {
          this.setAlertHint({
            lsattr: true,
            text: '请选择尺码'
          })
        } else {
          this._selectHide()    // 隐藏掉
          this.$router.push({
            path: `/list/detail/${this.path}/submit`
          })
        }
      },
      ...mapMutations({
        setSelectSizeColor: 'SET_SELECT_SIZE_COLOR',
        setSelectSpecification: 'SET_SELECT_SPECIFICATION',
        setAlertHint: 'SET_ALERT_HINT'
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
        justify-content: space-around;
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
          display: flex;
          align-items: center;
          justify-content: flex-start;
          .selected {
            padding-right: .21rem /* 8/37.5 */;
          }
          .selected-title {
            color: $color-text-9;
          }
          .selected-text {
            padding-right: .11rem /* 4/37.5 */;
            color: $color-theme;
          }
          .selectplz-text {
            padding-right: .11rem /* 4/37.5 */;
          }
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
        &.color-index {
          color: $color-theme;
          border-color: $color-theme;
        }
        &.size-index {
          color: $color-theme;
          border-color: $color-theme;
        }
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
          font-size: .43rem /* 16/37.5 */;
          line-height: .8rem /* 30/37.5 */;
          text-align: center;
          &.add-btn {
            color: $color-theme;
          }
        }
        .sel-b-num-val {
          flex: 1;
          border-left: 1px solid #bbb;
          border-right: 1px solid #bbb;
          line-height: .8rem /* 30/37.5 */;
          font-size: .37rem /* 14/37.5 */;
          text-align: center;
        }
      }
    }
    // 底部按钮
    .footer-bar {
      display: flex;
      margin-top: .43rem /* 16/37.5 */;
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
