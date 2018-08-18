<template lang="html">
  <!-- 首页商品列表 -->
  <section class="list-home">
    <div class="h-list" v-for="item in data" :key="item.itemId" @click="openDetail(item)">
      <div class="img-wrap">
        <img class="loadimg img" v-lazy="item.img" v-if="item.img" />
        <img class="loadimg img" v-lazy="item.showLarge.img" v-else/>
      </div>
      <div class="text">
        <h3 class="text-over title">{{item.title}}</h3>
        <div class="tags">
          <span class="title-tag" v-for="tag in item.props">{{tag}}</span>
        </div>
        <div class="price-wrap">
          <span class="price">
            <i class="icon-renminbi"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-renminbi"></use></svg></i>{{item.price}}
          </span>
          <span class="sale">月销量{{item.sale}}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    methods: {
      openDetail(item) {
        this.$emit('page', item)
      },
      refreshs() {    // 重新计算滚动，只执行一次
        if (this.refreshTime) {
          clearTimeout(this.refreshTime)
        }
        this.refreshTime = setTimeout(() => {
          this.$emit('refresh', true)
        }, 30)
      }
    }
  }
</script>

<style scoped lang="scss">
  // @import "../common/sass/mixin";
  @import "../common/sass/variable";

  .list-home {
    overflow: hidden;
    width: 100%;
    .h-list {
      overflow: hidden;
      float: left;
      margin: 2% 0 0 2%;
      width: 47%;
      height: 8.93rem /* 335/37.5 */;
      background-color: #fff;
      // box-shadow: 1px 1px 1px 3px #ddd;
      .img-wrap {
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 6.27rem /* 235/37.5 */;
        .img {
          vertical-align: top;
          width: 100%;
        }
      }
    }
    .text {
      padding: .21rem /* 8/37.5 */;
      .title {
        font-size: .37rem /* 14/37.5 */;
        color: $color-text-d;
      }
      .tags {
        overflow: hidden;
        height: 1.23rem /* 46/37.5 */;
        padding-top: .21rem /* 8/37.5 */;
        .title-tag {
          display: inline-block;
          padding: 0 .08rem /* 3/37.5 */;
          margin: 0 .08rem /* 3/37.5 */ .08rem /* 3/37.5 */ 0;
          height: .43rem /* 16/37.5 */;
          line-height: .43rem /* 16/37.5 */;
          font-size: .27rem /* 10/37.5 */;
          color: #6d7d86;
          background-color: #eff3f6;
        }
      }
      .price-wrap {
        height: .64rem /* 24/37.5 */;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        padding-top: .21rem /* 8/37.5 */;
        .price {
          font-size: .43rem /* 16/37.5 */;
          color: $color-theme;
          .icon-renminbi {
            font-size: .32rem /* 12/37.5 */;
          }
        }
        .sale {
          font-size: .37rem /* 14/37.5 */;
          color: $color-text-9;
        }
      }
    }
  }
</style>
