<template>
  <header class="the-header">
    <div class="header">
      <h2 class="title">标题</h2>
    </div>
  </header>
</template>

<script>
  export default {
    data() {
      return {}
    },
    created() {},
    mounted() {},
    computed: {},
    methods: {},
    watch: {},
    components: {}
  }
</script>

<style scoped lang="scss">
  @import "../common/sass/mixin";
  .the-header {
    height: 1.2rem /* 90/75 */;
    @include border-b-1px(0);
    .header {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 2;
      width: 100%;
      line-height: 1.2rem /* 90/75 */;
      background-color: #fff;
    }
    .title {
      text-align: center;
      font-size: .48rem /* 36/75 */;
    }
  }
</style>
