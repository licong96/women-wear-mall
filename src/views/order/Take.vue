<template lang="html">
  <!-- 待收货 -->
  <section class="take">
    <list-commodity-order :list-data="takeData"></list-commodity-order>
  </section>
</template>

<script>
  import ListCommodityOrder from '@/components/ListCommodityOrder'

  export default {
    data() {
      return {
        takeData: []    // 数据
      }
    },
    created() {
      this._getData()
    },
    methods: {
      _getData() {  // 获取首页列表数据
        this.axios.get('/api/my/order')
          .then((res) => {
            console.log(res.data.take)
            this.takeData = res.data.take
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

  .take {
    padding-bottom: 1.47rem /* 55/37.5 */;
  }
</style>
