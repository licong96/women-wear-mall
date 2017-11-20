<template lang="html">
  <!-- svg，全屏加载中 -->
  <section class="loading">
    <div class="mikepad-loading">
      <div class="binding"></div>
      <div class="pad">
        <div class="line line1"></div>
        <div class="line line2"></div>
        <div class="line line3"></div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
  }
</script>

<style scoped lang="scss">
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 30;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Loading CSS 样式 */
  .mikepad-loading {
    transform: scale(1.2);
  }

  .mikepad-loading .binding {
    content : '';
    box-sizing: content-box;
    width : 27px;
    height : 4px;
    border : 2px solid #E15958;
    margin : 0 auto;
  }

  .mikepad-loading .pad {
    box-sizing: content-box;
    width : 15px;
    height : 18px;
    border : 2px solid #E15958;
    border-top : 0;
    padding : 6px;
    margin : 0 auto;
  }

  .mikepad-loading .line {
    width : 15px;
    margin-top : 4px;
    border-top : 2px solid #E15958;
    opacity : 0;
    animation : writeline 2s infinite ease-in;
  }

  .mikepad-loading .line:first-child {
    margin-top : 0;
  }
  .mikepad-loading .line.line1 {
    animation-delay: 0s;
  }
  .mikepad-loading .line.line2 {
    animation-delay: 0.5s;
  }
  .mikepad-loading .line.line3 {
    animation-delay : 1s;
  }

  @keyframes writeline {
    0% { width : 0px; opacity: 0; }
    33% { width : 15px; opacity : 1; }
    70% { opacity : 1; }
    100% {opacity : 0; }
  }
</style>
