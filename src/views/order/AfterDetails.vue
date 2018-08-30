<template lang="html">
  <!-- 退货详情 -->
  <section class="full-fixed after-details">
    <lc-header title="退货详情" @callBack="back"></lc-header>
    <scroll>
      <div>
        <div class="title">退货商品</div>
        <list-order :listData="listData"></list-order>
        <div class="details">
          <div class="state">
            <!-- <span class="text-l"><i class="icon-caozuochenggong"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-caozuochenggong"></use></svg></i>已退款</span> -->
            <!-- <span class="text-r"><i class="icon-renminbi"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-renminbi"></use></svg></i>500</span> -->
            <span class="being"><i class="icon-dengdai"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-warning"></use></svg></i>订单正在处理中...</span>
          </div>
          <div class="issue">
            <div class="title">退货说明</div>
            <div class="explain">
              <p class="character">衣服的料子很一般，还会起球，不厚实，有点沉，很不喜欢这个衣服的款式，而且还有点小</p>
              <time class="time">2017-11-9 09:28:20</time>
            </div>
          </div>
          <div class="title">订单信息</div>
          <ul class="list-wrap">
            <li class="list">
              <span class="ceph">订单类型：</span>
              <span class="desc">退货退款</span>
            </li>
            <li class="list">
              <span class="ceph">订单号：</span>
              <span class="desc">21569843132485</span>
            </li>
            <li class="list">
              <span class="ceph">物流状态：</span>
              <span class="desc">已收到货</span>
            </li>
            <li class="list">
              <span class="ceph">退货原因：</span>
              <span class="desc">质量问题</span>
            </li>
            <li class="list">
              <span class="ceph">联系人：</span>
              <span class="desc">张飞</span>
            </li>
            <li class="list">
              <span class="ceph">联系电话：</span>
              <span class="desc">13699531996</span>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </section>
</template>

<script>
import ListOrder from '@/components/ListOrder'
import Scroll from '@/components/Scroll'
import LcHeader from '@/components/Header'

export default {
  beforeRouteEnter(to, from, next) { // 页面切换效果，进入是 true
    next(vm => {
      vm.$emit('destroy', true)
    })
  },
  beforeRouteLeave(to, from, next) { // 离开是 false
    this.$emit('destroy', false)
    next()
  },
  data() {
    return {
      tradeItemId: '',    // 商品ID
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
    // 返回
    back() {
      this.$router.back();
    },
  },
  components: {
    ListOrder,
    Scroll,
    LcHeader
  }
}
</script>

<style scoped lang="scss">
@import "../../common/sass/variable";
@import "../../common/sass/mixin";

.after-details {
    overflow: hidden;
    /* 10/37.5 */
    padding-bottom: 0.27rem;
    background: $color-background-e;
    .title {
        /* 16/37.5 */
        padding: 0 0.43rem;
        @include border-b-1px(0);
        /* 16/37.5 */
        font-size: 0.43rem;
        /* 40/37.5 */
        line-height: 1.07rem;
        color: $color-text-d;
        background-color: #fff;
    }
    .state {
        display: flex;
        justify-content: center;
        align-items: center;
        /* 10/37.5 */
        margin-bottom: 0.27rem;
        @include border-b-1px(0);
        /* 16/37.5 */
        padding: 0 0.43rem;
        /* 50/37.5 */
        height: 1.33rem;
        /* 16/37.5 */
        font-size: 0.43rem;
        background-color: #fff;
        .text-l {
            /* 20/37.5 */
            padding-right: 0.53rem;
            color: rgb(95, 183, 83);
        }
        .text-r {
            /* 20/37.5 */
            font-size: 0.53rem;
            color: $color-theme;
        }
        .being {
            color: $color-yellow;
            .icon-dengdai {
                /* 4/37.5 */
                padding: 0.11rem;
                /* 6/37.5 */
                padding-right: 0.16rem;
                /* 20/37.5 */
                font-size: 0.53rem;
                line-height: 1.5;
            }
        }
    }
    .issue {
        /* 10/37.5 */
        margin-bottom: 0.27rem;
        /* 16/37.5 */
        padding: 0 0.43rem;
        background-color: #fff;
        .title {
            padding: 0;
            @include border-b-1px(0);
        }
        .explain {
            padding:.32rem/* 12/37.5 */
            0;
        }
        .character {
            /* 14/37.5 */
            font-size: 0.37rem;
            line-height: 1.4;
            color: $color-text-6;
        }
        .time {
            display: block;
            /* 10/37.5 */
            padding-top: 0.27rem;
            /* 12/37.5 */
            font-size: 0.32rem;
            color: $color-text-9;
        }
    }
    .list-wrap {
        padding:.32rem/* 12/37.5 */
        .43rem/* 16/37.5 */
        /* 2/37.5 */
        .05rem;
        background-color: #fff;
        .list {
            display: flex;
            /* 10/37.5 */
            padding-bottom: 0.27rem;
            .ceph {
                /* 76/37.5 */
                min-width: 2.03rem;
                /* 14/37.5 */
                font-size: 0.37rem;
                line-height: 1.4;
                color: $color-text-6;
            }
            .desc {
                /* 14/37.5 */
                font-size: 0.37rem;
                line-height: 1.4;
                color: $color-text;
            }
        }
    }
}
</style>
