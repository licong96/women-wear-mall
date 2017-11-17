<template lang="html">
  <!-- 列表分类 -->
  <section class="full-fixed list-classify">
    <!-- 列表 -->
    <scroll :data="commodity" ref="listview">
      <!-- <div> -->
      <div class="commodity clearfix">
        <div class="commodity-list" v-for="item in commodity" :key="item.itemId" @click="openDetail(item.itemId)">
          <img class="commodity-img" :src="item.img" alt="" @load="refreshs">
          <div class="commodity-text">
            <commodity-text :data="item"></commodity-text>
          </div>
        </div>
      </div>
    <!-- </div> -->
    </scroll>
  </section>
</template>

<script>
  import CommodityText from '@/components/CommodityText'
  import Scroll from '@/components/Scroll'
  import {getListClassify} from '@/api/listClassify'

  export default {
    data() {
      return {
        commodity: []   // 列表数据
      }
    },
    created() {
      console.log(this.$route.params.id)
      this.id = this.$route.params.id
      this._getListClassify()   // 分类列表数据
    },
    methods: {
      _getListClassify() {
        getListClassify(this.id).then((res) => {
          console.log(res)
          this.commodity = res.result.wall.docs
        })
      },
      refreshs() {    // 重新计算滚动，只执行一次
        if (this.refreshTime) {
          clearTimeout(this.refreshTime)
        }
        this.refreshTime = setTimeout(() => {
          this.$refs.listview.refresh()
        }, 20)
      }
    },
    components: {
      CommodityText,
      Scroll
    }
  }
</script>

<style scoped lang="scss">
  .list-classify {
    overflow: hidden;
    background-color: #fff;
  }
  // 列表
  .commodity {
  }
  .commodity-list {
    overflow: hidden;
    float: left;
    position: relative;
    padding: 0 .05rem /* 2/37.5 */;
    margin: .05rem /* 2/37.5 */ 0;
    width: 50%;
    height: 7.33rem /* 275/37.5 */;
    .commodity-img {
      display: block;
      width: 100%;
    }
    .commodity-text {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: .21rem /* 8/37.5 */ .16rem /* 6/37.5 */;
      width: 100%;
      background-color: rgba(255, 255, 255, .7);
    }
  }
</style>
