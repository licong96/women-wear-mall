<template lang="html">
  <!-- 公用头部 -->
  <section class="header">
    <i class="header__back" v-if="back" @click="callBack">
      <svg class="icon" aria-hidden="true"><use xlink:href="#icon-fanhui"></use></svg>
    </i>
    <h2 class="header__title">{{title}}</h2>
    <i class="header__icon" v-if="icon" @click="callIcon">
      <svg class="icon" aria-hidden="true"><use :xlink:href="'#' + icon"></use></svg>
    </i>
  </section>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: '标题'
      },
      back: {
        type: Boolean,
        default: true
      },
      icon: {
        type: String,
        default: ''
      }
    },
    methods: {
      callBack() {
        this.$emit('callBack')
      },
      callIcon() {
        this.$emit('callIcon');
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../common/sass/variable";
  @import "../common/sass/mixin";

  .header {
    @include border-b-1px(0);
    z-index: 2;
    width: 100%;
    height: 1.2rem /* 45/37.5 */;
    line-height: 1.2rem /* 45/37.5 */;
    background-color: #fff;
  }
  .header__back,
  .header__icon {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 1.2rem /* 45/37.5 */;
    height: 1.2rem /* 45/37.5 */;
    text-align: center;
    .icon {
      font-size: .53rem /* 20/37.5 */;
      color: $color-theme;
    }
  }
  .header__title {
    font-size: .43rem /* 16/37.5 */;
    color: #333;
    text-align: center;
  }
  .header__icon {
    left: auto;
    right: 0;
  }

</style>
