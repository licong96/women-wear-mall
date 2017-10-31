<template lang="html">
  <!-- 商品标题和价格 -->
  <section class="commodity-wrapper">
    <p class="title" :class="{'text-over': !titleStyle, 'title-fonts': titleStyle}">2017秋冬季新款大码女装韩版女士宽松打底针织衫女套头半高领毛衣女外套</p>
    <div class="multi">
      <span class="member"><em class="member-em">会员价</em></span>
      <span class="money">
        <i class="iconfont">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-renminbi"></use>
          </svg>
        </i>
        <em class="money-em">500</em>
      </span>
      <s class="original">
        <i class="iconfont icon-renminbi">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-renminbi"></use>
          </svg>
        </i>700
      </s>
    </div>
  </section>
</template>

<script>
  export default {
    props: {
      titleStyle: {   // 控制 title 样式
        type: Boolean,
        default: false
      }
    },
    computed: {
    }
  }
</script>

<style scoped lang="scss">
  @import "../common/sass/variable";

  .commodity-wrapper {
    .title {
      font-size: .37rem /* 14/37.5 */;
      color: $color-text;
      &.title-fonts {
        padding-bottom: .16rem /* 6/37.5 */;
        font-size: .43rem /* 16/37.5 */;
        line-height: 1.5;
      }
    }
    .multi {
      display: flex;
      align-items: center;
      margin-top: .21rem /* 8/37.5 */;
      font-size: 0;
      .member-em {
        display: inline-block;
        padding: .05rem /* 2/37.5 */ .11rem /* 4/37.5 */;
        border: 1px solid $color-theme;
        border-radius: .08rem /* 3/37.5 */;
        font-size: 10px;
        font-style: normal;
        color: $color-theme;
      }
      .money {
        display: flex;
        align-items: center;
        flex: 1;
        padding-left: .16rem /* 6/37.5 */;
        color: $color-theme;
        .iconfont {
          font-size: .43rem /* 16/37.5 */;
        }
        .money-em {
          font-size: .48rem /* 18/37.5 */;
          font-weight: bold;
          font-style: normal;
        }
        .icon {
          vertical-align: 0;
        }
      }
      .original {
        display: inline-block;
        margin-left: auto;
        color: $color-text;
        font-size: .37rem /* 14/37.5 */;
        .iconfont {
          font-size: .32rem /* 12/37.5 */;
        }
      }
    }
  }
</style>
