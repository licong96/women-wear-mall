<template lang="html">
  <!-- 全部订单 -->
  <section class="all">
    <list-commodity-order v-if="listData.length > 0" :list-data="listData"></list-commodity-order>
    <empty :isShow="listData.length === 0" text="暂无订单"></empty>
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
        let listData = this.localStorage.get('order') || [];
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

  .all {
    // padding-bottom: 1.47rem /* 55/37.5 */;
  }
</style>
