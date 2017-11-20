<template lang="html">
  <!-- 分类列表 -->
  <section class="full-fixed list-classify">
    <scroll :data="commodity" ref="listview">
      <!-- <div> -->
      <section class="commodity">
        <list-home :data="commodity" @page="_openDetail" @refresh="refreshs"></list-home>
      </section>
    <!-- </div> -->
    </scroll>
    <transition name="transX">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
  import ListHome from '@/components/ListHome'
  import Scroll from '@/components/Scroll'
  import {getListClassify} from '@/api/listClassify'
  import {mapMutations} from 'vuex'
  import {getQueryString} from '@/common/js/dom'

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
      _openDetail(item) {
        // this.setRouterAnim(true)      // 路由动画
        this.$router.push({
          path: `/list/classify/${this.id}/detail/${item.itemId}`
        })
        this.setListDetail(item)
      },
      _getListClassify() {
        getListClassify(this.id).then((res) => {
          console.log(res)
          let arr = []
          res.result.wall.docs.forEach((item) => {
            item.itemId = getQueryString(item.link, 'itemId')   // 添加一个属性加 itemid
            arr.push(item)
          })
          this.commodity = arr
        })
      },
      refreshs() {    // 重新计算滚动，只执行一次
        this.$refs.listview.refresh()
      },
      ...mapMutations({
        setListDetail: 'SET_LIST_DETAIL'
      })
    },
    components: {
      ListHome,
      Scroll
    }
  }
</script>

<style scoped lang="scss">
  @import "../common/sass/variable";

  .list-classify {
    overflow: hidden;
    background-color: $color-background-e;
  }
  // 列表
  .commodity {
    padding-bottom: .21rem /* 8/37.5 */;
  }
</style>
