<template lang="html">
  <!-- 全部订单 -->
  <section class="all">
    <list-commodity-order :list-data="allData"></list-commodity-order>
  </section>
</template>

<script>
  import ListCommodityOrder from '@/components/ListCommodityOrder'

  export default {
    data() {
      return {
        allData: []    // 数据
      }
    },
    created() {
      this._getData()
    },
    methods: {
      _getData() {  // 获取首页列表数据
        this.axios.get('/api/my/order')
          .then((res) => {
            console.log(res.data.deliver)
            this.allData = res.data.all
            this.$emit('scrolls', true)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    components: {
      ListCommodityOrder
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/sass/variable";
  @import "../../common/sass/mixin";

  .all {
    padding-bottom: 1.47rem /* 55/37.5 */;
  }
</style>
