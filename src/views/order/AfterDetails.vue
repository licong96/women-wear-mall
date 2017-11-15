<template lang="html">
  <!-- 退货详情 -->
  <section class="full-fixed after-details">
    <scroll>
      <div>
      <div class="title">退货商品</div>
      <list-order></list-order>
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

  export default {
    beforeRouteEnter (to, from, next) {   // 页面切换效果，进入是 true
      next(vm => {
        vm.$emit('destroy', true)
      })
    },
    beforeRouteLeave(to, from, next) {  // 离开是 false
      this.$emit('destroy', false)
      next()
    },
    components: {
      ListOrder,
      Scroll
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/sass/variable";
  @import "../../common/sass/mixin";

  .after-details {
    overflow: hidden;
    padding-bottom: .27rem /* 10/37.5 */;
    background: $color-background-e;
    .title {
      padding: 0 .43rem /* 16/37.5 */;
      @include border-b-1px(0);
      font-size: .43rem /* 16/37.5 */;
      line-height:1.07rem /* 40/37.5 */;
      color: $color-text-d;
      background-color: #fff;
    }
    .state {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: .27rem /* 10/37.5 */;
      @include border-b-1px(0);
      padding: 0 .43rem /* 16/37.5 */;
      height: 1.33rem /* 50/37.5 */;
      font-size: .43rem /* 16/37.5 */;
      background-color: #fff;
      .text-l {
        padding-right: .53rem /* 20/37.5 */;
        color: rgb(95, 183, 83);
      }
      .text-r {
        font-size: .53rem /* 20/37.5 */;
        color: $color-theme;
      }
      .being {
        color: $color-yellow;
        .icon-dengdai {
          padding: .11rem /* 4/37.5 */;
          padding-right: .16rem /* 6/37.5 */;
          font-size: .53rem /* 20/37.5 */;
          line-height: 1.5;
        }
      }
    }
    .issue {
      margin-bottom: .27rem /* 10/37.5 */;
      padding: 0 .43rem /* 16/37.5 */;
      background-color: #fff;
      .title {
        padding: 0;
        @include border-b-1px(0);
      }
      .explain {
        padding: .32rem /* 12/37.5 */ 0;
      }
      .character {
        font-size: .37rem /* 14/37.5 */;
        line-height: 1.4;
        color: $color-text-6;
      }
      .time {
        display: block;
        padding-top: .27rem /* 10/37.5 */;
        font-size: .32rem /* 12/37.5 */;
        color: $color-text-9;
      }
    }
    .list-wrap {
      padding: .32rem /* 12/37.5 */ .43rem /* 16/37.5 */ .05rem /* 2/37.5 */;
      background-color: #fff;
      .list {
        display: flex;
        padding-bottom: .27rem /* 10/37.5 */;
        .ceph {
          min-width: 2.03rem /* 76/37.5 */;
          font-size: .37rem /* 14/37.5 */;
          line-height: 1.4;
          color: $color-text-6;
        }
        .desc {
          font-size: .37rem /* 14/37.5 */;
          line-height: 1.4;
          color: $color-text;
        }
      }
    }
  }
</style>
