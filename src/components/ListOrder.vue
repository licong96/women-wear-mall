<template lang="html">
  <!-- 商品订单和购物车布局 -->
  <section class="order">
    <div class="content" :class="{'checkbox-wrap': checkbox}">
      <!-- 头部 -->
      <div class="top">
        <!-- 选择框，购物车组件才用的到 -->
        <input type="checkbox" name="c-all" v-model="checkAll" class="checkout-all" v-show="checkbox" :class="{'checked': checkAll}" @click.stop>
        <p class="top-l">
          <i class="icon-l"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-dianpu-copy"></use></svg></i><span>初见小店</span>
        </p>
        <p class="top-r" @click="_openInfo(1)">
          <i class="icon-r"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-icon1"></use></svg></i><span>联系商家</span>
        </p>
      </div>
      <!-- 列表 -->
      <div class="order-body" v-for="item in data" @click="_openList(0)">
        <!-- 选择框，购物车组件才用的到 -->
        <input type="checkbox" name="c-all" class="checkout-all" value="id0" v-model="checkAll" v-show="checkbox" :class="{'checked': checkAll}" @click.stop>
        <div class="order-img-wrap">
          <img class="loadimg order-img" v-lazy="item.img"/>
        </div>
        <div class="order-text-wrap">
          <p class="order-text">{{item.title}}</p>
          <div class="order-parameter">
            颜色：<span class="order-pd">{{item.select.color}}</span>
            尺码：<span class="order-pd">{{item.select.size}}</span>
            <span class="order-quantity">x{{item.select.value}}</span>
          </div>
        </div>
        <div class="order-money">
          <span class="member"><i class="member-icon"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-renminbi"></use></svg></i>{{item.price}}</span>
          <s class="original"><i><svg class="icon" aria-hidden="true"><use xlink:href="#icon-renminbi"></use></svg></i>{{item.orgPrice}}</s>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    props: {
      data: {       // 数据
        type: Array,
        default: []
      },
      checkbox: {   // 是否显示选框，购物车才用的到
        type: Boolean,
        default: false
      },
      toggleAll: {    // 是否全选
        type: Boolean,
        default: false
      },
      click: {
        type: Boolean,    // 是否可以点击打开详细页
        default: true
      }
    },
    data() {
      return {
        checkAll: false,   // 全选
        cheack: [],       // 当前选中的
        checkData: []
      }
    },
    created() {
      console.log(this.data)
    },
    methods: {
      checkOne(id) {    // 当前选中
        console.log(id)
      },
      _openInfo(id) {   // 联系商家
        this.$router.push({
          path: `/list/detail/${id}/submit/info`
        })
      },
      _openList(id) {   // 打开列表
        if (!this.click) {
          return
        }
        this.$router.push({
          path: `/list/detail/${id}`
        })
      }
    },
    watch: {
      toggleAll(newValue) {
        this.checkAll = newValue
        // console.log('check:', newValue)
        // console.log('check.length:', newValue.length)
        // if (newValue.length === 2) {
        //   this.checkAll = true
        // } else {
        //   this.checkAll = false
        // }
      },
      checkAll(newValue) {
        console.log(newValue)
        this.$emit('order-all', newValue)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../common/sass/variable";
  @import "../common/sass/mixin";

  .order {
    .content {
      background-color: #fff;
      margin-bottom: .27rem /* 10/37.5 */;
    }
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      @include border-b-1px(0);
      padding: 0 .43rem /* 16/37.5 */;
      height: 1.33rem /* 50/37.5 */;
      font-size: .37rem /* 14/37.5 */;
      line-height: 1.33rem /* 50/37.5 */;
      color: $color-text;
      .top-l {
        flex: 1;
      }
      .icon-l {
        padding-right: .11rem /* 4/37.5 */;
        font-size: .43rem /* 16/37.5 */;
        color: $color-theme;
      }
      .icon-r {
        padding-right: .11rem /* 4/37.5 */;
        font-size: .43rem /* 16/37.5 */;
        color: $color-theme;
      }
    }
    .order-body {
      display: flex;
      padding: .43rem /* 16/37.5 */;
      @include border-b-1px(0);
      .order-img-wrap {
        overflow: hidden;
        width: 2.13rem /* 80/37.5 */;
        max-height: 2.93rem /* 110/37.5 */;
        .order-img {
          vertical-align: top;
          width: 100%;
        }
      }
      .order-text-wrap {
        flex: 1;
        padding: 0 .27rem /* 10/37.5 */;
        .order-text {
          font-size: .37rem /* 14/37.5 */;
          line-height: 1.4;
          color: $color-text-d;
        }
        .order-parameter {
          display: flex;
          align-items: center;
          padding-top: .27rem /* 10/37.5 */;
          font-size: .32rem /* 12/37.5 */;
          color: $color-text-9;
        }
        .order-pd {
          padding-right: .27rem /* 10/37.5 */;
        }
        .order-quantity {
          margin-left: auto;
        }
      }
      .order-money {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-end;
        font-size: .37rem /* 14/37.5 */;
        .original {
          padding-top: .27rem /* 10/37.5 */;
          font-size: .32rem /* 12/37.5 */;
          color: $color-text-9;
        }
        .member {
          font-size: .43rem /* 16/37.5 */;
          color: $color-theme;
        }
        .member-icon {
          font-size: .37rem /* 14/37.5 */;
        }
        .quantity {
          padding-top: .27rem /* 10/37.5 */;
          color: $color-text-6;
        }
      }
    }
    .checkout-all {
      display: block;
      // padding: .11rem /* 4/37.5 */;
      width: .53rem /* 20/37.5 */;
      height: .53rem /* 20/37.5 */;
      background: url('../common/img/checkbox.png') 0 100% no-repeat;
      background-size: .53rem /* 20/37.5 */;
      border: none;
      @include extend-click();
      &.checked {
        background-position: 0 0;
      }
    }
  }

  // 购物车组件
  .checkbox-wrap {
    // display: flex;
    .top-l {
      padding-left: .37rem /* 14/37.5 */;
    }
    .order-body {
      .order-img-wrap {
        margin-left: .37rem /* 14/37.5 */;
      }
      .checkout-all {
        align-self: center;
      }
    }
  }
</style>
