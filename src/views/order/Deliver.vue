<template lang="html">
  <!-- 待发货 -->
  <section class="deliver">
    <list-commodity-order v-if="listData.length > 0" :list-data="listData"></list-commodity-order>
    <empty :isShow="listData.length === 0" text="暂无待发货订单"></empty>
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
    activated() {
      this._getData()
    },
    methods: {
      _getData() {  // 获取首页列表数据
        let order = this.localStorage.get('order') || [];
        let listData = order.splice(0, 2);

        listData.forEach(item => {
          item.store = 0;
          item.storeText = '待发货';
        });
        this.listData = listData;
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

  .deliver {
    // padding-bottom: 1.47rem /* 55/37.5 */;
  }
</style>
