<template lang="html">
  <!-- 售后 -->
  <section class="after">
    <list-commodity-order :list-data="listData"></list-commodity-order>
  </section>
</template>

<script>
  import ListCommodityOrder from '@/components/ListCommodityOrder'

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
        let listData = order.splice(-1, 1);

        listData.forEach(item => {
          item.store = 3;
          item.storeText = '正在退货';
        });
        this.listData = listData;
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
