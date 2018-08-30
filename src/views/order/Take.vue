<template lang="html">
  <!-- 待收货 -->
  <section class="take">
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
        let listData = order.splice(2, 3);

        listData.forEach(item => {
          item.store = 1;
          item.storeText = '待收货';
        });
        this.listData = listData;
        console.log(this.listData)

        // this.axios.get('/api/my/order')
        //   .then((res) => {
        //     console.log(res.data.take)
        //     this.listData = res.data.take
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

  .take {
    // padding-bottom: 1.47rem /* 55/37.5 */;
  }
</style>
