<template lang="html">
  <!-- 确认订单 -->
  <div class="full-fixed list-submit-wrap">
    <lc-header title="确认订单" @callBack="back"></lc-header>
    <section class="list-submit _effect" :class="{'_effect-30': decline}">
      <scroll>
        <div class="mini-height">
          <list-order
            :click="clickNO"
            :isShowTop="true"
            :listData="listOrderDetail"
            @clickInfo="clickInfo"
          ></list-order>
          <div class="leave-msg">
            <textarea class="leave-textarea" cols="30" rows="1" placeholder="给商家留言"></textarea>
          </div>
        </div>
      </scroll>
    </section>
    <div class="submit-footer">
      <div class="total">
        共<span class="total-num">{{piece}}</span>件商品，总金额：<i class="total-icon"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-renminbi"></use></svg></i><span class="total-money">{{price}}</span>
      </div>
      <div class="select-btn">
        <p class="waves-effect waves-light deliver" @click="_deliver">快递发货</p>
        <p class="waves-effect waves-light pickup" @click="_pickup">店内提货</p>
      </div>
    </div>
    <!-- 快递地址 -->
    <transition name="deliver">
      <div class="deliver-wrap" v-show="deliverShow">
        <div class="full-fixed deliver-mask" @click="_deliverHide"></div>
        <div class="foot-deliver">
          <div class="bg-line"></div>
          <div class="deliver-title">
            <span>收货人：张飞</span>
            <span>13699531996</span>
          </div>
          <div class="deliver-body waves-effect waves-block" @click="_openLocation">
            <i class="d-icon-dizhi"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-dizhi"></use></svg></i>
            <p class="d-body-text">江西省南昌市红谷滩新区卧龙路999号</p>
            <i class="d-icon-jiantou"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-jiantou-copy-copy"></use></svg></i>
          </div>
          <div class="waves-effect waves-block waves-light deliver-btn" @click="_deliverSite">确定</div>
        </div>
      </div>
    </transition>
    <transition name="transX">
      <router-view @destroy="destroy"></router-view>
    </transition>
  </div>
</template>

<script>
  import ListOrder from '@/components/ListOrder'
  import LcHeader from '@/components/Header'
  import Scroll from '@/components/vertical-Scroll'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        deliverShow: false,     // 打开快递发货地址
        decline: false,
        fullPath: '',     // 完整路径
      }
    },
    created() {
      this.clickNO = false    // 不允许点击打开详细页
      this.fullPath = this.$route.fullPath;
      console.log(this.listOrderDetail)
    },
    computed: {
      listOrderDetail() {   // 组件接收的是一个数据
        if (Array.isArray(this.listDetail)) {
          return this.listDetail
        }
        return [this.listDetail]
      },
      // 一共多少件
      piece() {
        let listDetail = this.listOrderDetail;
        let piece = 0;
        listDetail.forEach(item => {
          piece += item.value
        });
        return piece;
      },
      // 总金额
      price() {
        let listDetail = this.listOrderDetail;
        let price = 0;
        listDetail.forEach(item => {
          price += Number(item.price)
        });
        return price;
      },
      ...mapGetters([
        'listDetail',
      ]),
    },
    methods: {
      destroy(booleans) {   // 页面过渡
        setTimeout(() => {
          this.decline = booleans
        }, 30)
      },
      _pickup() {   // 店内提货
        this.$router.replace({
          path: `${this.fullPath}/submitorder`
        })
        // 订单提交后，用本地存储保存起来
        this.orderStore()
      },
      orderStore() {
        let order = this.localStorage.get('order') || [];     // 先获取，后存储
        let shoppingData = this.localStorage.get('shoppingData') || [];
        let listDetail = this.listOrderDetail;
        let mapList = listDetail.map(item => item.tradeItemId);
        let newShoppingData = [];

        this.localStorage.set('order', [ ...listDetail, ...order]);

        // 购买成功后清空对应的商品
        newShoppingData = shoppingData.filter(item => mapList.indexOf(item.tradeItemId) === -1);
        this.localStorage.set('shoppingData', newShoppingData);
      },
      // 联系商家
      clickInfo() {
        this.$router.push({
          path: this.fullPath + '/info'
        })
      },
      _openLocation() {   // 打开收货地址
        this.$router.push({
          path: `/mycenter/location`
        })
      },
      _deliverSite() {    // 判断是否填写快递地址
        this.deliverShow = false
        this._pickup()
      },
      _deliverHide() {  // 关闭快递发货地址
        this.deliverShow = false
      },
      _deliver() {    // 快递
        this.deliverShow = true
      },
      // 返回
      back() {
        this.$router.back();
      }
    },
    components: {
      ListOrder,
      LcHeader,
      Scroll
    }
  }
</script>

<style scoped lang="scss">
  @import "../common/sass/variable";
  @import "../common/sass/mixin";

  .full-fixed {
    overflow: hidden;
    z-index: 10;
  }
  .list-submit-wrap {
    background: $color-background-e;
  }
  .mini-height {
    // min-height: 100%;
    flex: 1;
  }
  .list-submit {
    position: absolute;
    top: 1.2rem /* 45/37.5 */;
    left: 0;
    bottom: 2.27rem /* 85/37.5 */;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    -webkit-overflow-scrolling:touch;
    z-index: 12;
    background: $color-background-e;
    .leave-msg {
      padding: .43rem /* 16/37.5 */;
      @include border-b-1px(0);
      width: 100%;
      background-color: #fff;
      .leave-textarea {
        padding: 0 .11rem /* 4/37.5 */;
        border: 0;
        width: 100%;
        height: .85rem /* 32/37.5 */;
        line-height: .85rem /* 32/37.5 */;
        background-color: #f5f5f5;
        font-size: .37rem /* 14/37.5 */;
        color: $color-text-d;
        outline: none;
      }
    }
  }
  .submit-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    .total {
      display: flex;
      align-items: center;
      padding: .27rem /* 10/37.5 */ .43rem /* 16/37.5 */;
      background: #fff;
      font-size: .37rem /* 14/37.5 */;
      .total-num {
        padding: 0 .05rem /* 2/37.5 */;
        font-size: .37rem /* 14/37.5 */;
        color: $color-theme;
      }
      .total-icon {
        color: $color-theme;
      }
      .total-money {
        font-size: .43rem /* 16/37.5 */;
        color: $color-theme;
      }
    }
    .select-btn {
      display: flex;
      width: 100%;
      font-size: 0.43rem;
      color: #fff;
      line-height: 1.33rem;
      text-align: center;
      .deliver {
        flex: 1;
        background-color: $color-yellow;
      }
      .pickup {
        flex: 1;
        background-color: $color-theme;
      }
    }
  }
  // 收货地址
  .deliver-mask {
    z-index: 22;
    background-color: $color-background-0;
    backdrop-filter: blur(2px);
  }
  .foot-deliver {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 23;
    width: 100%;
    background-color: #fff;
    .bg-line {
      position: absolute;
      top: 0;
      left: 0;
      width: 150%;
      height: .13rem /* 5/37.5 */;
      background: url('../common/img/line.png') repeat-x;
      background-size: 10%;
      animation: line 20s linear infinite alternate;
    }
    .deliver-title {
      display: flex;
      justify-content: space-between;
      padding: .43rem /* 16/37.5 */;
      padding-top: .56rem /* 21/37.5 */;
      @include border-b-1px(0);
      color: $color-text;
      font-size: 14px;
    }
    .deliver-body {
      display: flex;
      align-items: center;
      padding: .43rem /* 16/37.5 */;
      @include border-b-1px(0);
      .d-icon-dizhi {
        font-size: .48rem /* 18/37.5 */;
        padding: .05rem /* 2/37.5 */;
      }
      .d-body-text {
        flex: 1;
        padding: 0 .43rem /* 16/37.5 */ 0 .27rem /* 10/37.5 */;
        font-size: 14px;
        color: $color-text;
        line-height: 1.4;
      }
      .d-icon-jiantou {
        font-size: .37rem /* 14/37.5 */;
        color: $color-text-9;
      }
    }
    .deliver-btn {
      margin-top: .53rem /* 20/37.5 */;
      height: 1.33rem /* 50/37.5 */;
      line-height: 1.33rem /* 50/37.5 */;
      font-size: .43rem /* 16/37.5 */;
      background-color: $color-theme;
      color: #fff;
      text-align: center;
    }
  }

  .deliver-enter-active,
  .deliver-leave-active {
    transition: .3s all ease;
    .deliver-mask,
    .foot-deliver {
      transition: .2s all ease;
    }
  }
  .deliver-enter,
  .deliver-leave-to {
    .deliver-mask {
      opacity: 0;
    }
    .foot-deliver {
      transform: translate3d(0, 100%, 0);
    }
  }

  @keyframes line {
    0% {
      transform: translate3d(0, 0 , 0);
    }
    100% {
      transform: translate3d(-30%, 0, 0);
    }
  }
</style>
