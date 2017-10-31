<template lang="html">
  <transition name="list">
    <section class="full-fixed list-detail-form">
      <div class="top">
        <span class="back" @click="back">跳转</span>
        <h2 class="title">这是一个标题</h2>
      </div>
      <div class="main">
      </div>
    </section>
  </transition>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">


  // 页面过渡
  .list-enter-active,
  .list-leave-active{
    transition: .3s all ease;
  }
  .list-enter,
  .list-leave-to{
    transform: translate3d(100%, 0, 0);
  }
</style>
