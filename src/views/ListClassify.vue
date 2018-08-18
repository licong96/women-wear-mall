<template lang="html">
  <!-- 分类列表 -->
  <section class="full-fixed list-classify">
    <!-- <scroll :data="commodity" ref="listview"> -->
    <scroll
      ref='scroll'
      :scrollbar="false"
      :listenScroll="true"
      :pullDownRefresh="pullDownRefreshObj"
      :pullUpLoad="pullUpLoadObj"
      @pullingDown="onPullingDown"
      @pullingUp="onPullingUp"
      @scroll="scrollPos"
    >
      <section class="commodity">
        <list-home :data="commodity" @page="_openDetail" @refresh="refreshs"></list-home>
      </section>
    </scroll>
    <!-- 回到顶部 -->
    <transition name="top-in">
      <div class="back-top" v-show="IsBackTop" @click="onBackTop">
        <svg class="icon back-top-icon" aria-hidden="true"><use xlink:href="#icon-fanhui"></use></svg></div>
      </div>
    </transition>
    <transition name="transX">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
  import ListHome from '@/components/ListHome'
  import Scroll from '@/components/vertical-Scroll'
  import {getListClassify} from '@/api/listClassify'
  import {mapMutations} from 'vuex'
  import {getQueryString} from '@/common/js/dom'

  export default {
    data() {
      return {
        page: 1,
        fcid: '',
        acm: '',
        commodity: [],   // 列表数据
        pullDownRefreshObj: {
          threshold: 50,
          stop: 50
        },
        pullUpLoadObj: {
          threshold: 50
        },
        IsBackTop: false,
      }
    },
    created() {
      let query = this.$route.query;

      this.winHeight = window.innerHeight || '667';
      this.fcid = query.fcid;
      this.acm = query.acm;

      this._getListClassify()   // 分类列表数据
    },
    methods: {
      onPullingDown() {
        // 模拟更新数据
        this._getListClassify();
      },
      // 下滑加载更多
      onPullingUp() {
        this.page++;
        getListClassify(this.page, this.fcid, this.acm).then((res) => {
          if (res.success) {
            this.commodity = [...this.commodity, ...res.result.wall.list];
          } else {
            alert('糟糕，接口出错了！')
          }
          this.$refs.scroll.forceUpdate();
        })
      },
      // 监听滚动
      scrollPos(pos) {
        // 显示隐藏回到顶部按钮
        if (-pos.y > this.winHeight) {
          this.IsBackTop = true
        } else {
          this.IsBackTop = false
        }
      },
      // 返回顶部
      onBackTop() {
        this.$refs.scroll.scrollTo(0, 0, 300);
      },
      _openDetail(item) {
        let tradeItemId = item.tradeItemId || item.iid;

        item.img = item.showLarge.img;
        item.tradeItemId = tradeItemId;
        item.price = item.price.replace(/￥/, '');
        item.orgPrice = item.orgPrice.replace(/￥/, '');

        this.setRouterAnim(false)      // 路由动画
        this.setListDetail(item);
        this.$router.push({
          path: `/list/classify/detail/${tradeItemId}`
        })
      },
      _getListClassify() {
        getListClassify(this.page, this.fcid, this.acm).then((res) => {
          this.commodity = res.result.wall.list;
          this.$refs.scroll.forceUpdate();
        })
      },
      refreshs() {    // 重新计算滚动，只执行一次
        this.$refs.listview.refresh()
      },
      ...mapMutations({
        setListDetail: 'SET_LIST_DETAIL',
        setRouterAnim: 'SET_ROUTER_ANIM'
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
  // 返回顶部
  .back-top {
    position: fixed;
    bottom: 1.47rem /* 55/37.5 */;
    right: .27rem /* 10/37.5 */;
    z-index: 4;
    .back-top-icon {
      border-radius: 50%;
      box-shadow: 0 1px 4px 0px $color-theme;
      padding: .27rem /* 10/37.5 */;
      font-size: .43rem /* 16/37.5 */;
      color: #fff;
      background-color: $color-theme;
      transform: rotate(90deg);
    }
  }
</style>
