<template lang="html">
  <!-- 商品订单和购物车布局 -->
  <section class="order" v-if="listData.length">
    <div class="content" :class="{'checkbox-wrap': checkbox}">
      <!-- 头部 -->
      <div class="top" v-if="isShowTop">
        <p class="top-l" v-if="listData[0].shopSeller">
          <i class="icon-l"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-dianpu-copy"></use></svg></i><span>{{listData[0].shopSeller}}</span>
        </p>
        <p class="top-r" @click="_openInfo">
          <i class="icon-r"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-icon1"></use></svg></i><span>联系商家</span>
        </p>
      </div>
      <!-- 列表 -->
      <div class="order-body" v-for="(item, index) in listData" :key="index" @click="_openList(item)">
        <!-- 选择框，购物车组件才用的到 -->
        <input type="checkbox" name="order" class="checkout-all" :value="item.tradeItemId" v-model="checkArr" v-show="checkbox" :class="{'checked': item.checked}" @click.stop>
        <div class="order-img-wrap">
          <img class="loadimg order-img" v-lazy="item.img"/>
        </div>
        <div class="order-text-wrap">
          <p class="order-text">{{item.title}}</p>
          <div class="order-parameter">
            颜色：<span class="order-pd">{{item.color}}</span>
            尺码：<span class="order-pd">{{item.size}}</span>
            <span class="order-quantity">x{{item.value}}</span>
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
      listData: {       // 数据
        type: Array,
        default: []
      },
      checkbox: {   // 是否显示选框，购物车才用的到
        type: Boolean,
        default: false
      },
      click: {
        type: Boolean,    // 是否可以点击打开详细页
        default: true
      },
      isShowTop: {    // 是否显示头部
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        checkArr: [],     // 当前选中的项
      }
    },
    created() {
      // console.log(this.data)
    },
    methods: {
      // 选中事件
      bindChecked(item) {
        console.log(item)
      },
      _openInfo() {   // 联系商家
        this.$emit('clickInfo')
      },
      _openList(item) {   // 打开列表
        if (!this.click) {
          return
        }
        this.$emit('clickItem', item);
      },
      // 全选
      toggleAll() {
        let listData = this.listData;
        let arr = [];

        listData.forEach(item => {
          arr.push(item.tradeItemId);
        });
        this.checkArr = arr;
      },
      // 取消全选
      cancelToggleAll() {
        this.checkArr = [];
      }
    },
    watch: {
      // 选中的商品
      checkArr(newValue) {
        let listData = this.listData;

        for (let i in listData) {
          if (newValue.indexOf(listData[i].tradeItemId) !== -1) {
            listData[i].checked = true;
          } else {
            listData[i].checked = false;
          }
        }
        this.$emit('checkout', newValue);
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
      &:before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 1.23rem /* 46/37.5 */;
      }
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
