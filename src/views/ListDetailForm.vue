<template lang="html">
  <transition name="list">
    <section class="full-fixed list-detail-form">
      <div class="top">
        <span class="back" @click="back">跳转</span>
        <h2 class="title">这是一个标题</h2>
      </div>
      <div class="main">
        <p>文字</p>
        <p>文字</p>
        <p>文字</p>
        <p>文字</p>
        <p>文字</p>
        <p>文字</p>
        <p>文字</p>
        <p>文字</p>
        <p>文字</p>
      </div>
    </section>
  </transition>

</template>

<script>
  export default {
    beforeRouteEnter(to, from, next) {    // 通过路由的before钩子解除router-view缓存限制
      next(vm => {
        // 通过 `vm` 访问组件实例
        console.log(to.name, 'true')
      })
    },
    beforeRouteLeave(to, from, next) {  // 离开是 false
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
      this.$emit('destroy', false)
      next()
    },
    methods: {
      back() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped lang="scss">
  .back{
    background: #fff;
  }
  .top {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    line-height: 1.2rem /* 90/75 */;
    .title {
      flex: 1;
      text-align: center;
      background: #fff;
    }
  }
  .main {
    background-color: #fff;
    min-height: 100%;
  }
  .list-detail-form {
    z-index: 111;
  }
  // 定义动画速度
  .list-enter-active, .list-leave-active {
    transition: all .3s;
    .main,
    .top{
      transition: all .3s;
    }
    .title,
    .back  {
      transition: all .2s;
    }
  }
  // 定义动画进入之前和出去的样式
  .list-enter, .list-leave-to{
    .back {
      opacity: 0;
    }
    .title {
      transform: translate3d(50%, 0, 0);
      opacity: 0;
    }
    .main {
      transform: translate3d(100%, 0, 0);
    }
  }
</style>
