<template lang="html">
  <!-- 商品收藏列表 -->
  <div class="wrap">
    <section class="list-comm">
      <div class="l-c-img-wrap">
        <img src="https://img11.360buyimg.com/pop/s120x120_jfs/t11017/262/434772985/136198/74d1179f/59f05a92N2f8fb6f2.jpg" class="l-c-img" alt="">
      </div>
      <div class="l-c-text">
        <h3 class="l-c-title">女装2017秋季新品双面羊毛呢大衣女中长款外套A400013</h3>
        <div class="l-c-spec">
          <span class="pd-r-10">颜色：白色</span>
          <span class="pd-r-10">尺码：M</span>
        </div>
        <div class="l-c-money">
          <span class="l-c-new"><i class="icon-renminbi"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-renminbi"></use></svg></i>500</span>
          <s class="l-c-old"><i class="icon-renminbi"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-renminbi"></use></svg></i>700</s>
        </div>
      </div>
      <!-- 删除按钮，我收藏的商品里面用的到 -->
      <div class="lajixiang" v-show="collectComm">
        <i class="icon-lajixiang"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-lajixiang"></use></svg></i>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    props: {
      collectComm: {    // 是否显示删除按钮
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../common/sass/variable";
  @import "../common/sass/mixin";

  .list-comm {
    position: relative;
    display: flex;
    padding: .43rem /* 16/37.5 */;
    @include border-b-1px(0);
    .l-c-img-wrap {
      width: 2.67rem /* 100/37.5 */;
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
    // 删除
    .lajixiang {
      @include extend-click;
      position: absolute;
      right: .43rem /* 16/37.5 */;
      bottom: .43rem /* 16/37.5 */;
      .icon-lajixiang {
        font-size: .43rem /* 16/37.5 */;
        color: $color-text-9;
      }
    }
  }
</style>
