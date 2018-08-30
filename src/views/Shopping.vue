<template lang="html">
  <!-- 购物车 -->
  <section class="shopping">
    <lc-header title="我的购物车" :back="false" :icon="headerIcon" @callIcon="bindRemove"></lc-header>
    <div class="shopping-list" v-if="shoppingData.length">
      <scroll>
        <list-order
          ref="checkOrder"
          :listData="shoppingData"
          :checkbox="checkbox"
          :remove="true"
          @clickItem="clickItem"
          @checkout="checkoutItem"
          @removeOrder="removeOrder"
        ></list-order>
      </scroll>
    </div>
    <!-- 结算 -->
    <div class="settle" v-if="shoppingData.length">
      <div class="check-box" @click="_checkAll">
        <input type="checkbox" class="checkout-all" :class="{'checked': checkoutAll}">
        <label for="c-all" class="settle-label">全选（{{checkConst}}）</label>
      </div>
      <div class="check-all">
        <span class="check-total">合计：</span>
        <svg class="icon" aria-hidden="true"><use xlink:href="#icon-renminbi"></use></svg>{{total}}</div>
      <div class="settle-btn" @click="bindOpenSubmit">去结算</div>
    </div>
    <empty :isShow="shoppingData.length === 0" icon="icon-gouwuchexiadan" text="购物车里没东西，去添加吧"></empty>
    <confirm ref="confirm" text="是否清空购物车？" @confirm="bindConfirm"></confirm>
    <transition name="transX">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
  import ListOrder from '@/components/ListOrder'
  import Empty from '@/components/Empty'
  import Scroll from '@/components/vertical-Scroll'
  import LcHeader from '@/components/Header'
  import Confirm from '@/components/Confirm'
  import {mapMutations, mapGetters} from 'vuex'

  export default {
    data() {
      return {
        shoppingData: [],
        checkedData: [],    // 选中的商品
        checkbox: true,     // 组件显示复选框
        toggleAll: false,   // 全选
        checkoutAll: false, // 全选显示状态
        total: 0,   // 合计
        checkConst: 0,  // 共选中多少件
      }
    },
    created() {
      console.log(this.shoppingData)
      this.shoppingData = this.localStorage.get('shoppingData') || [];
    },
    computed: {
      headerIcon() {
        return this.shoppingData.length > 0 ? 'icon-lajixiang' : ''
      }
    },
    mounted() {
      this.checkOrder = this.$refs.checkOrder;
    },
    methods: {
      // 删除单个商品
      removeOrder(data) {
        const tradeItemId = data.tradeItemId;
        let shoppingData = this.shoppingData;
        let newArr = [];

        shoppingData.forEach(item => {
          if (item.tradeItemId !== tradeItemId) {
            newArr.push(item)
          }
        });
        this.shoppingData = newArr;
        this.localStorage.set('shoppingData', newArr);
      },
      // 是否清空购物车
      bindRemove() {
        this.$refs.confirm.show();
      },
      // 清空购物车操作
      bindConfirm() {
        this.shoppingData = [];
        this.localStorage.remove('shoppingData');
      },
      // 去结算
      bindOpenSubmit() {
        if (!this.checkedData.length) {
          this.setAlertHint({
            lsattr: true,
            text: '请先选择商品'
          })
          return false;
        }
        this.setRouterAnim(false);
        this.setListDetail(this.checkedData);
        this.$router.push({
          path: `/list/detail/1/submit`
        })
      },
      // 打开详细页
      clickItem(item) {
        this.setRouterAnim(false);
        this.setListDetail(item);
        this.$router.push({
          path: `/list/detail/${item.tradeItemId}`
        })
      },
      // 选中的商品
      checkoutItem(value) {
        let data = this.shoppingData;
        let total = 0;
        let checked = [];

        data.forEach(item => {
          if (value.indexOf(item.tradeItemId) !== -1) {
            total += Number(item.price);
            checked.push(item);
          }
        });
        this.total = total.toFixed(2);
        this.checkConst = value.length;
        value.length === data.length ? this.checkoutAll = true : this.checkoutAll = false;
        this.checkedData = checked;
      },
      _checkAll() {   // 全选
        this.checkoutAll ? this.checkOrder.cancelToggleAll() : this.checkOrder.toggleAll()
      },
      // 判断数组是否修改了
      compareArray(oldVal, newVal) {
        if (oldVal.length != newVal.length) {
          return false;
        }
        for (let i = 0; i < newVal.length; i++) {
          if (oldVal[i].tradeItemId !== newVal[i].tradeItemId) {
            return false
          }
        }
        return true
      },
      ...mapMutations({
        setListDetail: 'SET_LIST_DETAIL',
        setRouterAnim: 'SET_ROUTER_ANIM',
        setAlertHint: 'SET_ALERT_HINT'
      })
    },
    watch: {
    },
    components: {
      ListOrder,
      Empty,
      Scroll,
      LcHeader,
      Confirm,
    }
  }
</script>

<style scoped lang="scss">
  @import "../common/sass/variable";
  @import "../common/sass/mixin";

  .shopping-list {
    position: absolute;
    top: 1.2rem /* 45/37.5 */;
    right: 0;
    bottom: 95px;
    left: 0;
    z-index: 1;
  }

  .settle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 1.33rem /* 50/37.5 */;
    z-index: 2;
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
