<template lang="html">
  <!-- 首页 -->
  <section class="home">
    <!-- 滚动 -->
    <div class="home _effect">
      <scroll :data="commodity" ref="listview">
        <!--空div用来装载滚动，不能删掉 -->
        <div>
          <!-- 轮播图组件 -->
          <section class="swiper" ref="swiperEL">
            <swiper :swiper-data="swiperData" :loop="loop"></swiper>
          </section>
          <!-- 分类 -->
          <section class="classify" ref="classifyEL">
            <ul class="classify-wrap">
              <li class="classify-list waves-effect" v-for="item in screens" :key="item.fcid" @click="_openClassify(item.fcid)">
                <i class="classify-i" :style="_classifyBg(item.image)"></i>
                <p class="classify-p">{{item.title}}</p>
              </li>
            </ul>
          </section>
          <section class="hot-title">
            <i class="line"></i>
            <span class="text">热门推荐</span>
            <i class="line"></i>
          </section>
          <!-- 商品列表 -->
          <section class="commodity">
            <list-home :data="commodity" @page="openDetail" @refresh="refreshs"></list-home>
          </section>
        </div>
      </scroll>
    </div>
    <!-- 详细页 -->
    <transition :name="transition">
      <router-view name="detail"></router-view>
    </transition>
    <router-view name="store"></router-view>
    <!-- <transition name="transX">
    </transition> -->
    <!-- 店铺 -->
    <!-- <keep-alive>
    </keep-alive> -->
  </section>
</template>

<script>
  import Swiper from '@/components/Swiper'
  import Scroll from '@/components/Scroll'
  import ListHome from '@/components/ListHome'
  import {mapMutations, mapGetters} from 'vuex'
  import {getHome, getList} from '@/api/list'
  import {getQueryString} from '@/common/js/dom'

  export default {
    data() {
      return {
        swiperData: [],  // 轮播图数据
        screens: [],    // 筛选
        commodity: []  // 商品
      }
    },
    beforeRouteUpdate(to, from, next) {
      // 在当前路由改变，但是该组件被复用时调用
      if (from.name === 'list') {
      }
      next()
    },
    created() {
      this.loop = true    // 轮播图组件是否可以循环
      this._getHome()
      this._getList()
    },
    mounted() {
      setTimeout(() => {
      }, 20)
    },
    computed: {
      transition() {
        return this.routerAnim ? 'transX' : ''
      },
      ...mapGetters([
        'routerAnim'
      ])
    },
    methods: {
      openDetail(item) {    // 打开详细页
        this.setRouterAnim(true)      // 路由动画
        this.$router.push({
          path: `/list/detail/${item.iid}`
        })
        this.setListDetail(item)
      },
      _openClassify(id) {   // 打开分类列表页
        this.setRouterAnim(true)
        this.$router.push({
          path: `/list/classify/${id}`
        })
      },
      destroy(msg) {
        console.log('list：' + msg)
      },
      refreshs() {    // 重新计算滑动
        this.$refs.listview.refresh()
      },
      _getHome() {  // 首页数据
        getHome().then((res) => {
          // console.log(res)
          let swiperScr = res.data[51822].list      // 轮播
          swiperScr.forEach((item) => {   // 手动添加scr
            item.src = item.image_800
            this.swiperData.push(item)
          })
          // this.screens = res.data[51836].list      // 筛选
          let fcidArr = res.data[51836].list
          fcidArr.forEach((item) => {    // 手动添加 fcid筛选
            item.fcid = getQueryString(item.link, 'fcid')
            this.screens.push(item)
          })
        })
      },
      _getList() {    // 首页列表数据
        getList().then((res) => {
          console.log(res)
          this.commodity = res.result.wall.docs
        })
      },
      _classifyBg(img) {  // 分类背景图片
        return `background-image: url(${img})`
      },
      ...mapMutations({             // 设置
        setListDetail: 'SET_LIST_DETAIL',
        setRouterAnim: 'SET_ROUTER_ANIM'
      })
    },
    watch: {
      routerAnim(newValue) {
        console.log('页面过渡routerA', newValue)
      }
    },
    components: {
      Scroll,
      Swiper,
      // CommodityText,
      ListHome
    }
  }
</script>

<style scoped lang="scss">
  @import "../common/sass/variable";
  @import "../common/sass/mixin";

  .home {
    height: 100%;
    background-color: $color-background-e;
  }
  // 轮播组件高度
  .swiper {
    overflow: hidden;
    position: relative;
    height: 4.53rem /* 170/37.5 */;
  }
  // 分类
  .classify {
    @include border-b-1px(0);
    // padding: 0 .27rem /* 10/37.5 */;
    background-color: #fff;
    .classify-wrap {
      display: flex;
      flex-wrap: wrap;
      padding: .16rem /* 6/37.5 */ 0;
      .classify-list {
        width: 25%;
        padding: .27rem /* 10/37.5 */;
        font-size: 0;
        text-align: center;
        .classify-i {
          display: inline-block;
          width: 1.36rem /* 51/37.5 */;
          height: 1.36rem /* 51/37.5 */;
          background-repeat: no-repeat;
          background-size: cover;
        }
        .classify-p {
          margin-top: .13rem /* 5/37.5 */;
          font-size: .43rem /* 16/37.5 */;
          color: $color-text-d;
        }
      }
    }
  }
  .hot-title {
    display: flex;
    align-items: center;
    width: 80%;
    margin: .53rem /* 20/37.5 */ auto;
    .line {
      flex: 1;
      @include border-b-1px(0);
    }
    .text {
      padding: 0 .21rem /* 8/37.5 */;
      font-weight: 700;
      font-size: .37rem /* 14/37.5 */;
      color: $color-text-6;
    }
  }
  .commodity {
    padding-bottom: 1.6rem /* 60/37.5 */;
  }
  // 分类筛选过渡
  .classify-enter-active,
  .classify-leave-active {
    transition: .3s all ease;
  }
  .classify-enter,
  .classify-leave-to {
    transform: translate3d(0, -100%, 0);
  }
</style>
