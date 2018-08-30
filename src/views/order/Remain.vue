<template lang="html">
  <!-- 待评价 -->
  <section class="remain">
    <list-commodity-order :list-data="listData"></list-commodity-order>
    <empty v-if="listData.length === 0"></empty>
  </section>
</template>

<script>
  import ListCommodityOrder from '@/components/ListCommodityOrder'
  import Empty from '@/components/Empty'

  export default {
    data() {
      return {
        listData: []    // 数据
      }
    },
    created() {
      this._getData()
    },
    methods: {
      _getData() {  // 获取首页列表数据
        let order = this.localStorage.get('order') || [];
        let listData = order.splice(-2, 1);

        listData.forEach(item => {
          item.store = 2;
          item.storeText = '交易成功';
        });
        this.listData = listData;
        console.log(this.listData)

        // this.axios.get('/api/my/order')
        //   .then((res) => {
        //     console.log(res.data.remain)
        //     this.listData = res.data.remain
        //     this.$emit('scrolls', true)
        //   })
        //   .catch((error) => {
        //     console.log(error)
        //   })
      }
    },
    components: {
      ListCommodityOrder,
      Empty,
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/sass/variable";
  @import "../../common/sass/mixin";

  .remain {
    // padding-bottom: 1.47rem /* 55/37.5 */;
  }
</style>
