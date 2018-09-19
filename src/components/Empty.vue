<template lang="html">
  <!-- 暂无信息 -->
  <section class="empty" v-if="isShow">
    <svg class="icon" :class="icon" aria-hidden="true"><use :xlink:href="'#' + icon"></use></svg>
    <p class="empty-text">{{text}}</p>
  </section>
</template>

<script>
  export default {
    props: {
      isShow: {
        type: Boolean,
        default: false
      },
      icon: {
        type: String,
        default: 'icon-kong'
      },
      text: {
        type: String,
        default: '暂无信息'
      }
    }
  }
</script>

<style scoped lang="scss">
  .empty {
    margin-top: 2.67rem /* 100/37.5 */;
    text-align: center;
    .icon {
      font-size: 100px;
    }
    .icon-kong {
      color: #999;
    }
  }
  .empty-text {
    margin-top: .27rem /* 10/37.5 */;
    font-size: 14px;
    color: #666;
  }
</style>
