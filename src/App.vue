<template>
  <div id="app">
    <!-- <the-header></the-header> -->
    <div class="main">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <the-nav></the-nav>
  </div>
  </div>
</template>

<script>
  // import TheHeader from '@/components/TheHeader'
  import TheNav from '@/components/TheNav'

  export default {
    name: 'app',
    props: {
      // value: {
      //   type: Array,
      //   default: []
      // }
    },
    data() {
      return {}
    },
    created() {},
    mounted() {},
    computed: {},
    methods: {},
    watch: {},
    components: {
      // TheHeader,
      TheNav
    }
  }
</script>

<style scoped lang="scss">
  #app,
  .main {
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
</style>
