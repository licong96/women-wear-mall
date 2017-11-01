<template lang="html">
  <!-- 首页 -->
  <section class="home">
    <!-- 浮动的小型分类筛选 -->
    <transition name="classify">
      <section class="classify classify-fixed _effect" v-show="classifysShow" :class="{'_effect-50': decline}">
        <ul class="classify-wrap">
          <li class="classify-list waves-effect" v-for="item in screens" :key="item.id" @click="_classifysFixed(item.id)">
            <i class="classify-i" :class="_classifyCls(item.id)"></i>
            <p class="classify-p" :class="{'active': classifyP===item.id}">{{item.text}}</p>
          </li>
        </ul>
      </section>
    </transition>
    <!-- 滚动 -->
    <div class="home _effect" :class="{'_effect-30': decline}">
      <scroll :data="swiperData" :probe-type="probeType" :listem-scroll="listemScroll" @scroll="scroll" ref="listview">
        <!--空div用来装载滚动，不能删掉 -->
        <div>
          <!-- 轮播图组件 -->
          <section class="swiper" ref="swiperEL">
            <swiper :swiper-data="swiperData" :loop="loop"></swiper>
          </section>
          <!-- 分类 -->
          <section class="classify" ref="classifyEL" :style="{'padding-bottom': classifyStanceCom}">
            <ul class="classify-wrap">
              <li class="classify-list waves-effect" v-for="item in screens" :key="item.id" @click="_classifys(item.id)">
                <i class="classify-i" :class="_classifyCls(item.id)"></i>
                <p class="classify-p" :class="{'active': classifyP===item.id}">{{item.text}}</p>
              </li>
            </ul>
          </section>
          <!-- 列表 -->
          <div class="commodity clearfix">
            <div class="commodity-list" v-for="item in commodity" :key="item.id" @click="openDetail(item.id)">
              <img class="commodity-img" :src="item.src" alt="">
              <div class="commodity-text">
                <commodity-text></commodity-text>
              </div>
            </div>
          </div>
        </div>
      </scroll>
    </div>
    <!-- 详细页 -->
    <router-view @destroy="destroy"></router-view>
  </section>
</template>

<script>
  import Swiper from '@/components/Swiper'
  import Scroll from '@/components/Scroll'
  import CommodityText from '@/components/CommodityText'
  import {mapMutations} from 'vuex'

  export default {
    data() {
      return {
        swiperData: [],  // 轮播图数据
        screens: [],    // 筛选
        classifyP: 0,   // 筛选被选择的值
        classifysShow: false,   // 浮动筛选显示/隐藏
        classifyStance: 0,
        commodity: [],  // 商品
        decline: false    // 页面滑动效果 class
      }
    },
    beforeRouteUpdate(to, from, next) {
      // 在当前路由改变，但是该组件被复用时调用
      console.log(from.name)
      if (from.name === 'list') {
        this.decline = false
        this.setRouterAnim(this.decline)    // 路由过渡状态保存到 vuex
      }
      next()
    },
    created() {
      this.loop = true    // 轮播图组件是否可以循环
      this.probeType = 3  // 滚动不截流
      this.listemScroll = true  // 滚动返回值
      this.classifyCls = ['classify-a', 'classify-s', 'classify-k', 'classify-q', 'classify-x']   // 筛选图标
      this.scrollRefresh = false   // 是否更新srcoll的开关
      this._getListData()
    },
    mounted() {
      setTimeout(() => {
      }, 20)
    },
    computed: {
      classifyStanceCom() {   // 有助于缓存数据
        return this.classifyStance + 'rem'
      }
    },
    methods: {
      openDetail(id) {    // 打开详细页
        this.decline = false
        this.$router.push({
          path: `/list/detail/${id}`
        })
      },
      destroy(msg) {
        console.log('list：' + msg)
        this.decline = false
        this.setRouterAnim(this.decline)    // 路由过渡状态保存到 vuex
      },
      scroll(pos) {
        // console.log(-pos.y)
        if (-pos.y >= this.classifyTop) {
          this.classifysShow = true
        } else {
          this.classifyStance = 0
          this.classifysShow = false
        }
      },
      _getListData() {  // 获取首页列表数据
        this.axios.get('/api/list')
          .then(function(response) {
            console.log(response.data)
            this.swiperData = response.data.sliderImg
            this.screens = response.data.screens
            this.commodity = response.data.commodity
            setTimeout(() => {
              this.classifyTop = this.$refs.swiperEL.clientHeight + this.$refs.classifyEL.clientHeight  // 浮动列表距离顶部值
              this.$refs.listview.refresh()
            }, 20)
          }.bind(this))
          .catch(function(error) {
            console.log(error)
          })
      },
      _classifyCls(id) {    // 分类图标的class
        return this.classifyCls[id]
      },
      _classifys(id) {      // 分类赛选
        this.classifyP = id
      },
      _classifysFixed(id) {   // 浮动分类筛选
        this.classifyP = id
        this.classifyStance = 1.5
        this.$refs.listview.scrollTo(0, -this.classifyTop, 300)   // 滚动列表位置
        setTimeout(() => {
          this.$refs.listview.refresh()
        }, 20)
        this.scrollRefresh = true
      },
      ...mapMutations({             // 设置
        setRouterAnim: 'SET_ROUTER_ANIM'
      })
    },
    watch: {
      classifysShow(newV) {    // 监听列表分类，判断是否计算
        if (!newV && this.scrollRefresh) {
          setTimeout(() => {
            this.$refs.listview.refresh()
            this.scrollRefresh = false
          }, 20)
        }
      }
    },
    components: {
      Scroll,
      Swiper,
      CommodityText
    }
  }
</script>

<style scoped lang="scss">
  @import "../common/sass/variable";
  @import "../common/sass/mixin";
  .home {
    height: 100%;
  }
  // 轮播组件高度
  .swiper {
    overflow: hidden;
    position: relative;
    height: 4.8rem /* 180/37.5 */;
  }
  // 分类
  .classify {
    @include border-b-1px(0);
    // padding: 0 .27rem /* 10/37.5 */;
    background-color: #fff;
    .classify-wrap {
      display: flex;
      .classify-list {
        flex: 1;
        padding: .43rem /* 16/37.5 */ 0;
        font-size: 0;
        text-align: center;
        .classify-i {
          display: inline-block;
          width: 1.36rem /* 51/37.5 */;
          height: 1.36rem /* 51/37.5 */;
          background-size: 100%;
          &.classify-a {
            @include bg-image("../common/img/shouye_a_");
          }
          &.classify-s {
            @include bg-image("../common/img/shouye_s_");
          }
          &.classify-k {
            @include bg-image("../common/img/shouye_k_");
          }
          &.classify-q {
            @include bg-image("../common/img/shouye_q_");
          }
          &.classify-x {
            @include bg-image("../common/img/shouye_x_");
          }
        }
        .classify-p {
          margin-top: .27rem /* 10/37.5 */;
          font-size: .43rem /* 16/37.5 */;
          color: $color-text-d;
          &.active {
            color: $color-theme;
          }
        }
      }
    }
  }
  // 浮动的小型分类筛选
  .classify-fixed {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    padding: 0 .43rem /* 16/37.5 */;
    width: 100%;
    .classify-wrap {
      .classify-list {
        padding: .13rem /* 5/37.5 */;
        .classify-i {
          width: .8rem /* 30/37.5 */;
          height: .8rem /* 30/37.5 */;
        }
        .classify-p {
          margin-top: .13rem /* 5/37.5 */;
          font-size: .32rem /* 12/37.5 */;
        }
      }
    }
  }
  // 列表
  .commodity {
    padding: .27rem /* 10/37.5 */ 0 1.44rem /* 54/37.5 */ 0;
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
