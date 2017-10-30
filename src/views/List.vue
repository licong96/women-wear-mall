<template lang="html">
  <!-- 首页 -->
  <section class="home">
    <!-- 浮动的小型分类筛选 -->
    <transition name="classify">
      <section class="classify classify-fixed" v-show="classifysShow">
        <ul class="classify-wrap">
          <li class="classify-list waves-effect" v-for="item in screens" :key="item.id" @click="_classifysFixed(item.id)">
            <i class="classify-i" :class="_classifyCls(item.id)"></i>
            <p class="classify-p" :class="{'active': classifyP===item.id}">{{item.text}}</p>
          </li>
        </ul>
      </section>
    </transition>
    <!-- 滚动 -->
    <scroll :data="swiperData" :probe-type="probeType" :listem-scroll="listemScroll" @scroll="scroll" ref="listview">
      <div class="_effect" :class="{'_effect-30': decline}">
        <!-- 轮播图组件 -->
        <section ref="swiperEL">
          <swiper :swiper-data="swiperData"></swiper>
        </section>
        <!-- 分类 -->
        <section class="classify" ref="classifyEL" :style="{'padding-bottom': classifyStance + 'rem'}">
          <ul class="classify-wrap">
            <li class="classify-list waves-effect" v-for="item in screens" :key="item.id" @click="_classifys(item.id)">
              <i class="classify-i" :class="_classifyCls(item.id)"></i>
              <p class="classify-p" :class="{'active': classifyP===item.id}">{{item.text}}</p>
            </li>
          </ul>
        </section>
        <transition name="classify-stance">
          <!-- <div class="classify-stance" v-show="classifyStance"></div> -->
        </transition>
        <!-- 列表 -->
        <div class="commodity clearfix">
          <div class="commodity-list" v-for="item in commodity" :key="item.id" @click="openDetail(item.id)">
              <img class="commodity-img" :src="item.src" alt="">
              <div class="commodity-text">
                <p class="title text-over">标题</p>
                <div class="multi">
                  <span class="member"><em class="member-em">会员价</em></span>
                  <span class="money">
                    <i class="iconfont">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-renminbi"></use>
                      </svg>
                    </i>
                    <em class="money-em">500</em>
                  </span>
                  <s class="original">
                    <i class="iconfont icon-renminbi">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-renminbi"></use>
                      </svg>
                    </i>700
                  </s>
                </div>
              </div>
          </div>
        </div>
      </div>
    </scroll>
    <!-- 详细页 -->
    <transition name="transX">
      <router-view @destroy="destroy"></router-view>
    </transition>
  </section>
</template>

<script>
  import Swiper from '@/components/Swiper'
  import Scroll from '@/components/Scroll'
  import {mapMutations} from 'vuex'

  export default {
    data() {
      return {
        swiperData: [],  // 轮播图数据
        screens: [],    // 筛选
        classifyP: 0,   // 筛选选择颜色
        classifysShow: false,
        classifyStance: 0,
        commodity: [],  // 商品
        probeType: 3,
        listemScroll: true,
        decline: false    // 页面滑动效果 class
      }
    },
    beforeRouteUpdate(to, from, next) {
      // 在当前路由改变，但是该组件被复用时调用
      // if (from.name)
      console.log(from.name)
      if (from.name === 'list') {
        this.decline = true
        this.setRouterAnim(this.decline)    // 路由过渡状态保存到 vuex
      }
      next()
    },
    created() {
      this.classifyCls = ['classify-a', 'classify-s', 'classify-k', 'classify-q', 'classify-x']
      this._getListData()
    },
    mounted() {
      setTimeout(() => {
      }, 20)
    },
    computed: {
    },
    methods: {
      destroy(msg) {
        console.log('list：' + msg)
        this.decline = false
        this.setRouterAnim(this.decline)    // 路由过渡状态保存到 vuex
      },
      scroll(pos) {
        console.log(-pos.y)
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
      },
      openDetail(id) {    // 打开详细页
        this.$router.push({
          path: `/list/detail/${id}`
        })
      },
      ...mapMutations({             // 设置
        setRouterAnim: 'SET_ROUTER_ANIM'
      })
    },
    components: {
      Scroll,
      Swiper
    }
  }
</script>

<style scoped lang="scss">
  @import "../common/sass/variable";
  @import "../common/sass/mixin";
  .home {
    height: 100%;
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
    padding: .05rem /* 2/37.5 */;
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
      .title {
        font-size: .37rem /* 14/37.5 */;
        color: $color-text;
      }
      .multi {
        display: flex;
        align-items: center;
        margin-top: .21rem /* 8/37.5 */;
        font-size: 0;
        .member-em {
          display: inline-block;
          padding: .05rem /* 2/37.5 */ .11rem /* 4/37.5 */;
          border: 1px solid $color-theme;
          border-radius: .08rem /* 3/37.5 */;
          font-size: 10px;
          font-style: normal;
          color: $color-theme;
        }
        .money {
          display: flex;
          align-items: center;
          flex: 1;
          padding-left: .16rem /* 6/37.5 */;
          color: $color-theme;
          .iconfont {
            font-size: .43rem /* 16/37.5 */;
          }
          .money-em {
            font-size: .48rem /* 18/37.5 */;
            font-weight: bold;
            font-style: normal;
          }
          .icon {
            vertical-align: 0;
          }
        }
        .original {
          display: inline-block;
          margin-left: auto;
          color: $color-text;
          font-size: .37rem /* 14/37.5 */;
          .iconfont {
            font-size: .32rem /* 12/37.5 */;
          }
        }
      }
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
  // // 占位符过渡
  // .classify-stance-enter-active,
  // .classify-stance-leave-active {
  //   transition: .1s all;
  // }
  // .classify-stance-enter,
  // .classify-stance-leave-to {
  //   height: 0;
  // }

  // 子页面过渡
  .transX-enter-active,
  .transX-leave-active{
    transition: .3s all ease;
  }
  .transX-enter,
  .transX-leave-to{
    transform: translate3d(100%, 0, 0);
  }
</style>
