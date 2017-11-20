<template lang="html">
  <!-- 购物车 -->
  <section class="shopping">
    <list-order :checkbox="checkbox" :toggle-all="toggleAll" @order-all="orderAll"></list-order>
    <!-- 结算 -->
    <div class="settle">
      <div class="check-box" @click="_checkAll">
        <input type="checkbox" name="c-all" value="0" v-model="toggleAll" class="checkout-all" :class="{'checked': toggleAll}">
        <label for="c-all" class="settle-label">全选（1）</label>
      </div>
      <div class="check-all">
        <span class="check-total">合计：</span>
        <svg class="icon" aria-hidden="true"><use xlink:href="#icon-renminbi"></use></svg>500</div>
      <div class="settle-btn">
        去结算
      </div>
    </div>
  </section>
</template>

<script>
  import ListOrder from '@/components/ListOrder'

  export default {
    data() {
      return {
        checkbox: true,     // 组件显示复选框
        toggleAll: false   // 全选
      }
    },
    created() {
    },
    methods: {
      _checkAll() {
        this.toggleAll = !this.toggleAll
      },
      orderAll(val) {
        console.log(val)
        this.toggleAll = val
      }
    },
    components: {
      ListOrder
    }
  }
</script>

<style scoped lang="scss">
  @import "../common/sass/variable";
  @import "../common/sass/mixin";

  .settle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 1.33rem /* 50/37.5 */;
    margin: 0 auto;
    max-width: 600px;
    width: 100%;
    height: 1.2rem /* 45/37.5 */;
    background-color: #fff;
    .check-box {
      display: flex;
      align-items: center;
      padding-left: .43rem /* 16/37.5 */;
      .checkout-all {
        display: block;
        width: .53rem /* 20/37.5 */;
        height: .56rem /* 21/37.5 */;
        background: url('../common/img/checkbox.png') 0 100% no-repeat;
        background-size: .53rem /* 20/37.5 */;
        border: none;
        &.checked {
          background-position: 0 0;
        }
      }
      .settle-label {
        padding-left: .16rem /* 6/37.5 */;
        font-size: .37rem /* 14/37.5 */;
        color: $color-text;
      }
    }
    .check-all {
      flex: 1;
      padding-right: .32rem /* 12/37.5 */;
      font-size: .43rem /* 16/37.5 */;
      color: $color-theme;
      text-align: right;
      .check-total {
        font-size: .37rem /* 14/37.5 */;
        color: $color-text;
      }
    }
    .settle-btn {
      width: 3.2rem /* 120/37.5 */;
      height: 1.2rem /* 45/37.5 */;
      line-height: 1.2rem /* 45/37.5 */;
      text-align: center;
      font-size: .43rem /* 16/37.5 */;
      color: #fff;
      background-color: $color-theme;
    }
  }
</style>
