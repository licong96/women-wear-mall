<template lang="html">
  <!-- 待发货 -->
  <section class="deliver">
    <list-commodity-order :list-data="deliverData"></list-commodity-order>
  </section>
</template>

<script>
  import ListCommodityOrder from '@/components/ListCommodityOrder'

  export default {
    data() {
      return {
        deliverData: []    // 数据
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
            this.deliverData = res.data.deliver
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

  .deliver {
    padding-bottom: 1.47rem /* 55/37.5 */;
  }
</style>
