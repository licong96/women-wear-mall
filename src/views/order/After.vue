<template lang="html">
  <!-- 售后 -->
  <section class="after">
    <list-commodity-order :list-data="afterData"></list-commodity-order>
  </section>
</template>

<script>
  import ListCommodityOrder from '@/components/ListCommodityOrder'

  export default {
    data() {
      return {
        afterData: []    // 数据
      }
    },
    created() {
      this._getData()
    },
    methods: {
      _getData() {  // 获取首页列表数据
        this.axios.get('/api/my/order')
          .then((res) => {
            console.log(res.data.after)
            this.afterData = res.data.after
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

  .after {
    padding-bottom: 1.47rem /* 55/37.5 */;
  }
</style>
