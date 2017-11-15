<template lang="html">
  <section class="loader">
    <span class="loader loader-quart"></span>
    加载中
  </section>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
  @import "../common/sass/variable";

  .loader {
    display: inline-block;
    vertical-align: middle;
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 20;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
  }

  .loader-quart {
    border-radius: 50px;
    border: 6px solid rgba(255, 255, 255, 0.4);
    // border: 6px solid rgba(255, 51, 85, 0.4);
  }

  .loader-quart:after {
    content: '';
    position: absolute;
    top: -6px;
    left: -6px;
    bottom: -6px;
    right: -6px;
    border-radius: 50px;
    border: 6px solid transparent;
    // border-top-color: #FFF;
    border-top-color: $color-theme;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
