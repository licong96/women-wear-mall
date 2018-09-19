<template lang='html'>
  <!-- 首页 -->
  <section class='home'>
    <!-- 加载中 -->
    <transition name='opacity'>
      <loading v-show='!commodity.length'></loading>
    </transition>
    <lc-header title="香菇街" :back="false"></lc-header>
    <!-- 滚动 -->
    <div class='home_effect'>
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
        <!--空div用来装载滚动，不能删掉 -->
        <div>
          <!-- 轮播图组件 -->
          <section class='swiper' ref='swiperEL'>
            <swiper :swiper-data='swiperData' :loop='loop'></swiper>
          </section>
          <!-- 分类 -->
          <section class='classify' ref='classifyEL'>
            <ul class='classify-wrap'>
              <li class='classify-list waves-effect' v-for='(item, index) in screens' :key='index' @click='_openClassify(item, item.title)'>
                <i class='classify-i' :style='_classifyBg(item.image)'></i>
                <p class='classify-p'>{{item.title}}</p>
              </li>
            </ul>
          </section>
          <section class='hot-title'>
            <i class='line'></i>
            <span class='text'>热门推荐</span>
            <i class='line'></i>
          </section>
          <!-- 商品列表 -->
          <section class='commodity'>
            <list-home :data='commodity' @page='openDetail' @refresh='refreshs'></list-home>
          </section>
        </div>
      </scroll>
    </div>
    <!-- 回到顶部 -->
    <transition name="top-in">
      <div class="back-top" v-show="IsBackTop" @click="onBackTop">
        <svg class="icon back-top-icon" aria-hidden="true"><use xlink:href="#icon-fanhui"></use></svg></div>
      </div>
    </transition>
    <!-- 详细页 -->
    <transition name='transX'>
      <router-view name='detail'></router-view>
    </transition>
    <router-view name='store'></router-view>
  </section>
    <!-- <transition name='transX'>
    </transition> -->
    <!-- 店铺 -->
    <!-- <keep-alive>
    </keep-alive> -->
</template>

<script>
  import Loading from '@/components/Loading';
  import Swiper from '@/components/Swiper';
  import Scroll from '@/components/vertical-Scroll'
  import ListHome from '@/components/ListHome';
  import LcHeader from '@/components/Header'
  import { mapMutations, mapGetters } from 'vuex';
  import { getSlide, getList, search, getClassify } from '@/api/list';
  import { getQueryString } from '@/common/js/dom';

  export default {
    data() {
      return {
        page: 1,
        swiperData: [], // 轮播图数据
        screens: [], // 筛选
        commodity: [], // 商品
        pullDownRefreshObj: {
          threshold: 50,
          stop: 50
        },
        pullUpLoadObj: {
          threshold: 50
        },
        IsBackTop: false,
      };
    },
    created() {
      this.winHeight = window.innerHeight || '667';
      this.loop = true; // 轮播图组件是否可以循环
      this._getSlide();
      this._getClassify();
      this._getList();
    },
    activated() {
      this.refreshs();
    },
    mounted() {
      setTimeout(() => {}, 20);
    },
    computed: {
    },
    methods: {
      onPullingDown() {
        // 模拟更新数据
        this._getList();
      },
      // 下滑加载更多
      onPullingUp() {
        this.page++;
        getList(this.page).then(res => {
          if (res.success) {
            this.commodity = [...this.commodity, ...res.result.wall.docs];
          } else {
            alert('糟糕，接口出错了！')
          }
          this.$refs.scroll.forceUpdate();
        });
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
      // 打开详细页
      openDetail(item) {
        this.setListDetail(item);
        this.$router.push({
          path: `/list/detail/${item.tradeItemId}`,
        });
      },
      // 打开分类列表页
      _openClassify(item, title) {
        let query = {
          fcid: getQueryString(item.link, 'fcid'),
          acm: getQueryString(item.link, 'acm'),
          title
        };
        this.$router.push({
          path: `/list/classify`,
          query,
        });
      },
      refreshs() {
        // 重新计算滑动
        this.$refs.scroll.refresh();
      },
      // 获取轮播图
      _getSlide() {
        getSlide().then(res => {
          this.swiperData = res.data[122207].list;
        });
      },
      // 获取分类数据
      _getClassify() {
        getClassify().then(res => {
          if (res.success) {
            this.screens = res.data.list;
          } else {
            alert('糟糕，接口出错了！')
          }
          this.$refs.scroll.forceUpdate()
        })
      },
      // 首页列表数据
      _getList() {
        getList(this.page).then(res => {
          if (res.success) {
            this.commodity = res.result.wall.docs;
          } else {
            alert('糟糕，接口出错了！')
          }
          this.$refs.scroll.forceUpdate()
        });
      },
      _classifyBg(img) {
        // 分类背景图片
        return `background-image: url(${img})`;
      },
      // 返回顶部
      onBackTop() {
        this.$refs.scroll.scrollTo(0, 0, 300);
      },
      // 设置
      ...mapMutations({
        setListDetail: 'SET_LIST_DETAIL',
      })
    },
    components: {
      Loading,
      Scroll,
      Swiper,
      // CommodityText,
      ListHome,
      LcHeader
    }
  };
</script>

<style scoped lang="scss">
  @import "../common/sass/variable";
  @import "../common/sass/mixin";

  .home {
    overflow: hidden;
    margin: 0 auto;
    max-width: 600px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 1.33rem /* 50/37.5 */;
    left: 0;
    background-color: $color-background-e;
  }
  .home_effect {
    height: 100%;
  }
  // 轮播组件高度
  .swiper {
    overflow: hidden;
    position: relative;
    height: 4rem /* 150/37.5 */;
  }
  // 分类
  .classify {
    @include border-b-1px(0);
    // padding: 0 .27rem /* 10/37.5 */;
    background-color: #fff;
    .classify-wrap {
      display: flex;
      flex-wrap: wrap;
      padding: 0.16rem /* 6/37.5 */ 0;
      .classify-list {
        width: 25%;
        padding: 0.27rem /* 10/37.5 */;
        font-size: 0;
        text-align: center;
        .classify-i {
          display: inline-block;
          width: 1.36rem /* 51/37.5 */;
          height: 1.36rem /* 51/37.5 */;
          background-repeat: no-repeat;
          background-size: cover;
          background-image: url('../common/img/load.png');
        }
        .classify-p {
          margin-top: 0.13rem /* 5/37.5 */;
          font-size: 0.43rem /* 16/37.5 */;
          color: $color-text-d;
        }
      }
    }
  }
  .hot-title {
    display: flex;
    align-items: center;
    width: 80%;
    margin: 0.53rem /* 20/37.5 */ auto;
    .line {
      flex: 1;
      @include border-b-1px(0);
    }
    .text {
      padding: 0 0.21rem /* 8/37.5 */;
      font-weight: 700;
      font-size: 0.37rem /* 14/37.5 */;
      color: $color-text-6;
    }
  }
  // .commodity {
  //   padding-bottom: 1.6rem /* 60/37.5 */;
  // }
  // 分类筛选过渡
  .classify-enter-active,
  .classify-leave-active {
    transition: 0.3s all ease;
  }
  .classify-enter,
  .classify-leave-to {
    transform: translate3d(0, -100%, 0);
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
