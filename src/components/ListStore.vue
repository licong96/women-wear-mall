<template lang="html">
  <!-- 店铺、友圈列表 -->
  <section class="l-store" :class="{'show-time': time}">
    <div class="l-s-wrap" v-for="(item, index) in data">
      <div class="l-s-img-wrap">
        <img :src="item.src" class="l-s-img" alt="">
      </div>
      <div class="l-s-text">
        <div class="l-s-title">
          <h3 class="title-h3">{{item.title}}</h3>
          <!-- 信息页用到时间 -->
          <span class="time">{{item.time}}</span>
        </div>
        <p class="l-s-collect" :class="{'color-red': item.store===0}">{{item.desc}}</p>
      </div>
      <!-- 信息页没有删除图标 -->
      <div class="l-s-lajixiang">
        <i class="icon-lajixiang"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-lajixiang"></use></svg></i>
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
      },
      time: {   // 是否显示时间，信息页使用
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../common/sass/variable";
  @import "../common/sass/mixin";

  .l-store {
  }
  .l-s-wrap {
    display: flex;
    align-items: center;
    padding: .43rem /* 16/37.5 */;
    @include border-b-1px(0);
    .l-s-img-wrap {
      width: 1.07rem /* 40/37.5 */;
      .l-s-img {
        vertical-align: top;
        border-radius: 50%;
        width: 100%;
      }
    }
    .l-s-text {
      flex: 1;
      padding-left: .27rem /* 10/37.5 */;
      .l-s-title {
        font-size: .37rem /* 14/37.5 */;
        .title-h3 {
          color: $color-text;
        }
        .time {
          display: none;
          color: $color-text-9;
        }
      }
      .l-s-collect {
        padding-top: .16rem /* 6/37.5 */;
        font-size: .32rem /* 12/37.5 */;
        color: $color-text-9;
        &.color-red {
          color: $color-theme;
        }
      }
    }
    .l-s-lajixiang {
      @include extend-click();
      .icon-lajixiang {
        font-size: .43rem /* 16/37.5 */;
        color: $color-text-9;
      }
    }
  }

  // 信息页
  .show-time {
    .l-s-wrap {
      .l-s-text {
        .l-s-title {
          display: flex;
          justify-content: space-between;
        }
        .time {
          display: block;
        }
      }
    }
    .l-s-lajixiang {
      display: none;
    }
  }

</style>
