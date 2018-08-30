<template lang="html">
  <!-- 退货 -->
  <section class="full-fixed return">
    <lc-header title="退货" @callBack="back"></lc-header>
    <div class="main _effect" :class="{'_effect-50': decline}">
      <list-order :listData="listData"></list-order>
      <div class="select-refund">
        <div class="refund-l" :class="{'active': currentIndex===0}" @click="_refund(0)">
          <h4 class="title">仅退款</h4>
          <p class="desc">未收到货（包含未签收） 或卖家协商同意前提下</p>
        </div>
        <div class="refund-r" :class="{'active': currentIndex===1}" @click="_refund(1)">
          <h4 class="title">退货退款</h4>
          <p class="desc">已收到货，需要退换已收 到的货物</p>
        </div>
      </div>
      <div class="status">
        <span class="title">物流状态</span>
        <span class="desc">请选择<i class="icon-jiantou"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-jiantou-copy-copy"></use></svg></i></span>
      </div>
      <div class="status">
        <span class="title">退货原因</span>
        <span class="desc">请选择<i class="icon-jiantou"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-jiantou-copy-copy"></use></svg></i></span>
      </div>
      <div class="explain">
        <span class="title">退货说明</span>
        <textarea class="textarea" rows="3" cols="6"></textarea>
      </div>
      <div class="upload">
        <p class="title">上传凭证</p>
        <div class="upload-wrap">
          <ul class="list-group">
            <li class="flex-center list">
              <i class="icon-jia1"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-jia1"></use></svg></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <footer class="btn waves-effect waves-light _effect" :class="{'_effect-50': decline}" @click="_submit">提交</footer>
    <transition name="transX">
      <router-view @destroy="destroy"></router-view>
    </transition>
  </section>
</template>

<script>
  import ListOrder from '@/components/ListOrder'
  import LcHeader from '@/components/Header'
  import {mapMutations} from 'vuex'

  export default {
    data() {
      return {
        tradeItemId: '',    // 商品ID
        decline: false,
        currentIndex: 1,
        listData: [],
      }
    },
    created() {
      this.tradeItemId = this.$route.query.tradeItemId;
      this.getOrderData();    // 获取订单数据
    },
    methods: {
      // 获取订单数据
      getOrderData() {
        let order = this.localStorage.get('order') || [];
        let tradeItemId = this.tradeItemId;
        let arr = [];

        for (let i = 0, leng = order.length; i < leng; i++) {
          if (order[i].tradeItemId === tradeItemId) {
            arr.push(order[i]);
            break;
          }
        };
        this.listData = arr;
      },
      destroy(booleans) {   // 页面过渡
        setTimeout(() => {
          this.decline = booleans
        }, 30)
      },
      _submit() {
        this.$router.replace({
          path: `/mycenter/orderbox/return/audit`,
          query: {
            tradeItemId: this.tradeItemId
          }
        })
      },
      _refund(n) {
        this.currentIndex = n
      },
      // 返回
      back() {
        this.$router.back();
      },
      ...mapMutations({
        setRouterAnim: 'SET_ROUTER_ANIM'
      })
    },
    components: {
      ListOrder,
      LcHeader
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/sass/variable";
  @import "../../common/sass/mixin";

  .return {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    .main {
      overflow: auto;
      flex: 1;
      padding-bottom: .53rem /* 20/37.5 */;
    }
    .btn {
      width: 100%;
      height: 1.33rem /* 50/37.5 */;
      line-height: 1.33rem /* 50/37.5 */;
      font-size: .43rem /* 16/37.5 */;
      color: #fff;
      background-color: $color-theme;
      text-align: center;
    }
    .select-refund {
      display: flex;
      justify-content: space-between;
      @include border-b-1px(0);
      padding: .27rem /* 10/37.5 */ .43rem /* 16/37.5 */ .53rem /* 20/37.5 */;
      .refund-l {
        margin-right: 20px;
      }
      .refund-l,
      .refund-r {
        flex: 1;
        border: 1px solid $color-theme;
        border-radius: .11rem /* 4/37.5 */;
        padding: .16rem /* 6/37.5 */ .29rem /* 11/37.5 */;
        .title {
          padding-bottom: .21rem /* 8/37.5 */;
          font-size: .48rem /* 18/37.5 */;
          color: $color-text-d;
          text-align: center;
        }
        .desc {
          font-size: .32rem /* 12/37.5 */;
          line-height: 1.4;
          color: $color-text-9;
        }
        &.active {
          background-color: $color-theme;
          .title {
            color: #fff;
          }
          .desc {
            color: #fff;
          }
        }
      }
    }
    .status {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 .43rem /* 16/37.5 */;
      @include border-b-1px(0);
      height: 1.33rem /* 50/37.5 */;
      line-height: 1.33rem /* 50/37.5 */;
      .title {
        font-size: .43rem /* 16/37.5 */;
        color: $color-text;
      }
      .desc {
        font-size: .43rem /* 16/37.5 */;
        color: $color-text-9;
        .icon-jiantou {
          padding-left: .16rem /* 6/37.5 */;
        }
      }
    }
    .explain {
      display: flex;
      justify-content: space-between;
      padding: .43rem /* 16/37.5 */;
      @include border-b-1px(0);
      .title {
        font-size: .43rem /* 16/37.5 */;
        color: $color-text;
      }
      .textarea {
        flex: 1;
        padding: 0 .32rem /* 12/37.5 */;
        height: .8rem /* 30/37.5 */;
        font-size: .37rem /* 14/37.5 */;
        color: $color-text;
        line-height: 1.4;
        border: none;
        outline: none;
        resize: none;
      }
    }
    .upload {
      // padding: .43rem /* 16/37.5 */;
      padding-top: .43rem /* 16/37.5 */;
      padding-left: .43rem /* 16/37.5 */;
      .title {
        padding-bottom: .43rem /* 16/37.5 */;
        font-size: .37rem /* 14/37.5 */;
        color: $color-text;
      }
      .list-group {
        display: flex;
        // justify-content: space-between;
        flex-wrap: wrap;
        .list {
          margin-right: .43rem /* 16/37.5 */;
          width: 1.92rem /* 72/37.5 */;
          height: 1.92rem /* 72/37.5 */;
          border: 1px solid rgba(203, 203, 203, .6);
          .icon-jia1 {
            font-size: .64rem /* 24/37.5 */;
            color: rgba(203, 203, 203, 1);
          }
        }
      }
    }
  }
</style>
