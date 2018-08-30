<template lang="html">
  <!-- 订单列表 -->
  <section class="list-order-wrap" v-if="listData.length">
    <div class="list-commodity-order" :class="_cutButton(item.store)" v-for="(item, index) in listData" :key="index">
      <div class="title">
        <span class="title-name">
          <i class="icon-dianpu"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-dianpu-copy"></use></svg></i>{{item.shopSeller || '品牌女装'}}
        </span>
        <span class="store">{{item.storeText}}</span>
      </div>
      <section class="list-comm" @click="_openList(index)">
        <div class="l-c-img-wrap">
          <img :src="item.img" class="l-c-img" alt="">
        </div>
        <div class="l-c-text">
          <h3 class="l-c-title">{{item.title}}</h3>
          <div class="l-c-spec">
            <span class="pd-r-10">颜色：{{item.color}}</span>
            <span class="pd-r-10">尺码：{{item.size}}</span>
            <span class="pd-r-10">数量：{{item.value}}</span>
          </div>
          <div class="l-c-money">
            <span class="l-c-new"><i class="icon-renminbi"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-renminbi"></use></svg></i>{{item.price}}</span>
            <s class="l-c-old"><i class="icon-renminbi"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-renminbi"></use></svg></i>{{item.orgPrice}}</s>
          </div>
        </div>
      </section>
      <!-- 操作按钮 -->
      <div class="l-btn">
        <button type="button" class="waves-button deliver take" @click="_openPage('return')">退货</button>
        <button type="button" class="waves-button remain" @click="_openPage('return')">申请售后</button>
        <!-- <button type="button">提醒发货</button> -->
        <button type="button" class="waves-button">查看物流</button>
        <button type="button" class="waves-button color-1 take" @click="_openPage('succeed')">确认收货</button>
        <button type="button" class="waves-button color-1 remain" @click="_openPage('succeed/evaluate')">评价</button>
        <button type="button" class="waves-button color-1 after" @click="_openPage('return/audit/afterdetails')">退货详情</button>
      </div>
    </div>
  </section>
</template>

<script>
  import {mapMutations} from 'vuex'

  export default {
    props: {
      listData: {
        type: Array,
        default: []
      }
    },
    computed: {
    },
    methods: {
      _openList(id) {   // 打开商品详情页
        this.setRouterAnim(false)
        this.$router.push({
          path: `/list/detail/${id}`
        })
      },
      _openPage(path) {   // 打开操作页
        this.setRouterAnim(true)
        setTimeout(() => {
          this.$router.push({
            path: `/mycenter/orderbox/${path}`
          })
        }, 20)
      },
      _cutButton(num) {
        if (num === 0) {
          return 'btn-deliver'
        } else if (num === 1) {
          return 'btn-take'
        } else if (num === 2) {
          return 'btn-remain'
        } else if (num === 3) {
          return 'btn-after'
        }
      },
      ...mapMutations({
        setRouterAnim: 'SET_ROUTER_ANIM'
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "../common/sass/variable";
  @import "../common/sass/mixin";

  .list-order-wrap {
    overflow: hidden;
  }
  .list-commodity-order {
    margin: .27rem /* 10/37.5 */ 0;
    background-color: #fff;
    // 头部
    .title {
      @include border-b-1px(0);
      display: flex;
      align-content: center;
      justify-content: space-between;
      padding: 0 .43rem /* 16/37.5 */;
      line-height: 1.07rem /* 40/37.5 */;
      .title-name {
        font-size: .37rem /* 14/37.5 */;
        color: $color-text;
        .icon-dianpu {
          padding-right: .11rem /* 4/37.5 */;
          font-size: .43rem /* 16/37.5 */;
          color: $color-theme;
        }
      }
      .store {
        font-size: .37rem /* 14/37.5 */;
        color: $color-yellow;
      }
    }
    // 底部
    .l-btn {
      display: flex;
      justify-content: flex-end;
      padding: .27rem /* 10/37.5 */ .43rem /* 16/37.5 */;
      color: $color-text;
      .waves-button {
        display: none;
        margin-left: .43rem /* 16/37.5 */;
        border: 1px solid rgba(203, 203, 203, 1);
        padding: 0 .27rem /* 10/37.5 */;
        height: .75rem /* 28/37.5 */;
        line-height: .75rem /* 28/37.5 */;
        &.color-1 {
          color: $color-theme;
          border-color: $color-theme;
        }
      }
    }
  }
  // 中间部分
  .list-comm {
    display: flex;
    padding: .43rem /* 16/37.5 */;
    @include border-b-1px(0);
    .l-c-img-wrap {
      overflow: hidden;
      width: 1.87rem /* 70/37.5 */;
      height: 2.67rem /* 100/37.5 */;
      .l-c-img {
        vertical-align: top;
        width: 100%;
      }
    }
    .l-c-text {
      flex: 1;
      padding-left: .27rem /* 10/37.5 */;
      .l-c-title {
        line-height: 1.4;
        font-size: .37rem /* 14/37.5 */;
        color: $color-text;
      }
      .l-c-spec {
        margin-top: .27rem /* 10/37.5 */;
        font-size: .37rem /* 14/37.5 */;
        color: $color-text-9;
      }
      .l-c-money {
        margin-top: .32rem /* 12/37.5 */;
        color: $color-theme;
        .l-c-new {
          font-size: .48rem /* 18/37.5 */;
        }
        .l-c-old {
          font-size: .32rem /* 12/37.5 */;
          color: $color-text-9;
        }
      }
    }
  }

  // 按钮显示
  .btn-deliver {
    .l-btn {
      .deliver {
        display: block;
      }
    }
  }
  .btn-take {
    .l-btn {
      .take {
        display: block;
      }
    }
  }
  .btn-remain {
    .l-btn {
      .remain {
        display: block;
      }
    }
  }
  .btn-after {
    .l-btn {
      .after {
        display: block;
      }
    }
  }
</style>
