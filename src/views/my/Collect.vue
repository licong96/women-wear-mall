<template lang="html">
  <!-- 收藏 -->
  <section class="full-fixed my-collect">
    <!-- 头部导航 -->
    <nav class="c-top-nav">
      <li class="c-top-li" :class="{'active': comste}" @click="_navCommodity">商品</li>
      <li class="c-top-li" :class="{'active': !comste}" @click="_navStore">店铺</li>
    </nav>
    <div class="c-content">
      <!-- 收藏的商品 -->
      <div class="c-commodity">
        <list-commodity :collect-comm="collectComm" v-show="comste"></list-commodity>
      </div>
      <!-- 收藏的店铺 -->
      <div class="c-store">
        <list-store :data="storeData" v-show="!comste"></list-store>
      </div>
    </div>
  </section>
</template>

<script>
  import ListCommodity from '@/components/ListCommodity'
  import ListStore from '@/components/ListStore'

  export default {
    beforeRouteLeave(to, from, next) {  // 离开是 false
      this.$emit('destroy', false)
      next()
    },
    data() {
      return {
        comste: true,     // 切换
        storeData: []    // 店铺数据
      }
    },
    created() {
      this.collectComm = true   // 列表组件显示删除按钮
      this._getListData()
    },
    methods: {
      _getListData() {  // 获取首页列表数据
        this.axios.get('/api/my/collect')
          .then((res) => {
            console.log(res)
            this.storeData = res.data.storeData
          })
          .catch((error) => {
            console.log(error)
          })
      },
      _navCommodity() {
        this.comste = true
      },
      _navStore() {
        this.comste = false
      }
    },
    components: {
      ListCommodity,
      ListStore
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/sass/variable";
  @import "../../common/sass/mixin";

  .my-collect {
    background-color: #fff;
  }
  // 头部导航
  .c-top-nav {
    display: flex;
    align-items: center;
    height: 1.2rem /* 45/37.5 */;
    @include border-b-1px(0);
    .c-top-li {
      flex: 1;
      font-size: .43rem /* 16/37.5 */;
      color: $color-text;
      text-align: center;
      &.active {
        color: $color-theme;
      }
    }
  }
</style>
