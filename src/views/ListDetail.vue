<template lang="html">
  <!-- 首页 -->
  <transition name="list-detail">
    <section class="full-fixed list-detail">
      <transition name="list-header">
        <header class="list-header" v-show="titleShow">
          <div class="top">
            <i class="iconfont" @click="back">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fanhui"></use>
              </svg>
            </i>
            <div class="head-wrap">
              <!-- 快速导航 -->
              <div>
                <ul class="list-nav">
                  <li class="list-li" v-for="(item, index) in listNav" @click="_scrollTo(index)" :class="{'current':currentIndex===index}" :key="index" ref="menuList">{{item}}</li>
                </ul>
              </div>
            </div>
            <i class="iconfont waves-effect waves-circle">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gouwuche"></use>
              </svg>
            </i>
          </div>
        </header>
      </transition>
      <!-- 滚动内容 -->
      <scroll class="recommend-content" :data="discList" :probe-type="probeType" :listem-scroll="listemScroll" @scroll="scroll" ref="listview">
        <!-- 空标签是滑动容器，删掉就完蛋 -->
        <section>
          <div class="basic" ref="basic">
            <!-- 轮播组件 -->
            <div class="swiper">
              <swiper :swiper-data="swiperData" :autoplay="autoplay"></swiper>
            </div>
            <!-- 商品标题和价格 -->
            <div class="commodity-text">
              <commodity-text :title-style="titleStyle"></commodity-text>
              <span class="freight">快递：免运费</span>
            </div>
            <div class="hr-10"></div>
          </div>
          <!-- 选择颜色尺寸 -->
          <div class="select" ref="topHeight" @click="_selectShow">
            <span class="select-text">请选择：颜色 尺寸</span>
            <i class="iconfont">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jiantou-copy-copy"></use>
              </svg>
            </i>
          </div>
          <div class="bottom">
            <!-- 商品参数 -->
            <div class="list-conster parameter" ref="listGroup0">
              <div class="hr-10"></div>
              <ul class="parameter-wrap">
                <li class="parameter-list" v-for="(item, index) in parameterData" :key="index">
                  <span class="parameter-title">{{item.title}}</span>
                  <span class="parameter-desc">{{item.desc}}</span>
                </li>
              </ul>
            </div>
            <!-- 图片详情 -->
            <div class="list-conster particulars" ref="listGroup1">
              <div class="hr-10"></div>
              <img class="particulars-img" :src="item.src" :key="index" v-for="(item, index) in particularsData" @load="_srcollRefresh">
            </div>
            <!-- 用户评论 -->
            <div class="list-conster comment-border" ref="listGroup2">
              <div class="hr-10"></div>
              <comments :comment-data="commentData"></comments>
              <div class="comment-more">
                <span class="waves-effect waves-button more-btn" @click="_commentMore">查看更多评论</span>
              </div>
            </div>
          </div>
        </section>
      </scroll>
      <!-- 底部操作按钮 -->
      <section class="footer-bar">
        <ul class="bar-wrap">
          <li class="bar-list">
            <i class="iconfont">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shoucang1"></use>
              </svg>
            </i>
            <p class="bar-text">收藏</p>
          </li>
          <li class="bar-list">
            <i class="iconfont">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-dianpu-copy"></use>
              </svg>
            </i>
            <p class="bar-text">店铺</p>
          </li>
          <li class="bar-list">
            <i class="iconfont">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-icon1"></use>
              </svg>
            </i>
            <p class="bar-text">客服</p>
          </li>
          <li class="bar-list-add bar-yellow">
            <p class="bar-add-text">加入购物车</p>
          </li>
          <li class="bar-list-add bar-red">
            <p class="bar-add-text">加入会员</p>
          </li>
        </ul>
      </section>
      <!-- 子页面路由 -->
      <router-view></router-view>
    </section>
  </transition>
</template>

<script>
  import Scroll from '@/components/Scroll'
  import Swiper from '@/components/Swiper'
  import CommodityText from '@/components/CommodityText'
  import Comments from '@/components/Comment'
  import {mapMutations, mapGetters} from 'vuex'

  export default {
    data() {
      return {
        discList: [],
        swiperData: [],
        parameterData: [],    // 参数数据
        particularsData: [],  // 详情数据
        commentData: [],  // 评论数据
        listNav: ['参数', '详情', '评价'],
        titleShow: false,   // 头部显示隐藏切换
        listHeight: [],
        scrollY: 0,
        currentIndex: 0,
        decline: false
      }
    },
    beforeRouteUpdate(to, from, next) {
      // 如果用户打开了图片全屏预览，但是糊涂了，不知道怎么的点了返回键，那也要关闭图片预览
      if (this.swiperFull.length) {
        this.setSwiperFull([])
        this.setSwiperFullIndex(0)
      }
      console.log(from.name)
      if (from.name === 'listdetail') {
        // this.decline = true
      }
      next()
    },
    beforeRouteLeave(to, from, next) {  // 离开是 false
      // 和上面是一个道理，为的是防止用户点击返回也能关闭图片预览
      if (this.swiperFull.length) {
        this.setSwiperFull([])
        this.setSwiperFullIndex(0)
      }
      // this.$emit('destroy', false)
      next()
    },
    created() {
      this.path = this.$route.params.id   // 当前商品 id
      this.probeType = 3        // 滚动参数
      this.listemScroll = true
      this.autoplay = 0   // 轮播自动滚动
      this.titleStyle = true    // 控制商品标题价格颜色
      this._getListData()
    },
    mounted() {
      this.$nextTick(function() {
      })
    },
    computed: {
      ...mapGetters([
        'swiperFull'
      ])
    },
    methods: {
      _getListData() {  // 获取首页列表数据
        this.axios.get('/api/listDetail')
          .then(function(response) {
            console.log(response.data)
            // this.discList = response.data
            this.swiperData = response.data.swiper
            this.parameterData = response.data.parameterData
            this.particularsData = response.data.particularsData
            this.commentData = response.data.commentData
            setTimeout(() => {
              this.$refs.listview.refresh()
              this._calculateHeight()
              this.topHeight = this.$refs.topHeight.clientHeight  // 因为 header 是浮动的，变相区一个相同高度
            }, 20)
          }.bind(this))
          .catch(function(error) {
            console.log(error)
          })
      },
      destroy(msg) {    // 子页面关闭回调
        console.log('listdetail:' + msg)
        this.decline = false
      },
      path() {
        this.$router.push({
          path: '/list/detail/1/form'
        })
      },
      back() {
        this.$router.back()
      },
      scroll(pos) {   // 接收滑动位置
        // console.log(pos.y)
        this.scrollY = pos.y
      },
      _calculateHeight() {    // 计算高度
        this.listHeight = []
        // 这也是没有办法的办法
        this.listGroup = []
        let listGroup0 = this.$refs.listGroup0
        let listGroup1 = this.$refs.listGroup1
        let listGroup2 = this.$refs.listGroup2
        this.listGroup.push(listGroup0)
        this.listGroup.push(listGroup1)
        this.listGroup.push(listGroup2)
        let height = this.$refs.basic.clientHeight      // 顶部图片和文字介绍以及价格高度
        this.listHeight.push(height)
        for (let i = 0; i < this.listGroup.length; i++) {
          let item = this.listGroup[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      _scrollTo(index) {    // 滚动到目标位置
        this.$refs.listview.scrollToElement(this.listGroup[index], 300, 0, -this.topHeight)   // 偏移
      },
      _srcollRefresh() {
        if (this.loadimgTime) {
          clearTimeout(this.loadimgTime)
        }
        this.loadimgTime = setTimeout(() => {
          this.$refs.listview.refresh()
          this._calculateHeight()
        }, 30)
      },
      _selectShow() {   // 打开商品选择颜色尺寸
        this.setSelectSizeColor(true)
      },
      _commentMore() {    // 打开更多评论页
        this.$router.push({
          path: `/list/detail/${this.path}/comment`
        })
      },
      ...mapMutations({
        setSelectSizeColor: 'SET_SELECT_SIZE_COLOR',
        setSwiperFull: 'SET_SWIPER_FULL',
        setSwiperFullIndex: 'SET_SWIPER_FULL_INDEX'
      })
    },
    watch: {
      scrollY(newY) {
        // console.log(newY)
        let n = Math.ceil(-newY)    // 向上取整
        newY = -n - 1   // + 1 保证都能在范围内
        const listHeight = this.listHeight
        // 当滚动到顶部，newY>0
        if (newY > 0 || -newY < this.listHeight[0]) {
          this.currentIndex = 0
          this.titleShow = false
          return
        }
        this.titleShow = true
        // 当评论页面不满一屏，currentIndex 就是最后一个
        let fullHeight = this.listHeight[this.listHeight.length - 1] - this.listHeight[0] + this.topHeight
        if (-newY >= fullHeight) {
          this.currentIndex = listHeight.length - 2
          return
        }
        // 在中间部分滚动
        for (let i = 0; i < listHeight.length - 1; i++) {
          let height1 = listHeight[i]
          let height2 = listHeight[i + 1]
          if (-newY >= height1 && -newY < height2) {
            this.currentIndex = i
            return
          }
        }
        // 当滚动到底部，且-newY大于最后一个元素的上限
        this.currentIndex = listHeight.length - 2
      }
    },
    components: {
      Scroll,
      Swiper,
      CommodityText,
      Comments
    }
  }
</script>

<style scoped lang="scss">
  @import "../common/sass/variable";
  @import "../common/sass/mixin";

  .list-detail {
    background-color: #fff;
  }
  // 头部
  .list-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    width: 100%;
    height: 1.2rem /* 45/37.5 */;
    background: #fff;
    .top {
      display: flex;
      align-items: center;
      @include border-b-1px(0);
      .iconfont {
        width: 1.2rem /* 45/37.5 */;
        font-size: .48rem /* 18/37.5 */;
        color: $color-text;
        text-align: center;
        line-height: 1.2rem /* 45/37.5 */;
      }
      .head-wrap {
        flex: 1;
        text-align: center;
      }
    }
    .list-nav {
      display: flex;
      padding: 0 .53rem /* 20/37.5 */;
      line-height: 1.2rem /* 90/75 */;
      .list-li {
        flex: 1;
        font-size: .43rem /* 16/37.5 */;
        color: $color-text;
        text-align: center;
        &.current {
          color: red;
        }
      }
    }
  }
  // 滑动容器
  .recommend-content {
    height: 100%;
    .bottom {
      padding-bottom: 1.47rem /* 55/37.5 */;
    }
  }
  // 轮播组件高度
  .swiper {
    overflow: hidden;
    position: relative;
    height: 12rem /* 450/37.5 */;
  }
  .commodity-text {
    padding: .43rem /* 16/37.5 */;
    background-color: #fff;
    .freight {
      display: flex;
      align-items: center;
      padding-top: .27rem /* 10/37.5 */;
      font-size: .32rem /* 12/37.5 */;
      color: $color-text-9;
    }
  }
  // 选择颜色尺寸
  .select {
    display: flex;
    box-sizing: content-box;
    // border-top: .27rem /* 10/37.5 */ solid #eee;
    padding: 0 .43rem /* 16/37.5 */;
    height: 1.2rem /* 45/37.5 */;
    font-size: .37rem /* 14/37.5 */;
    color: $color-text-6;
    line-height: 1.2rem /* 45/37.5 */;
    background-color: #fff;
    .select-text {
      flex: 1;
    }
  }
  // 商品参数
  .parameter {
    // border-top: .27rem /* 10/37.5 */ solid #eee;
    .parameter-wrap {
      padding: 0 .43rem /* 16/37.5 */;
      background-color: #fff;
    }
    .parameter-list {
      @include border-b-1px(0);
      line-height: .91rem /* 34/37.5 */;
      font-size: .37rem /* 14/37.5 */;
      &:last-child {
        &:after {
          border: none;
        }
      }
      .parameter-title {
        display: inline-block;
        width: 2.67rem /* 100/37.5 */;
        color: $color-text-9;
      }
      .parameter-desc {
        // #eb4868;
        color: $color-text;
      }
    }
  }
  // 图片详情
  .particulars {
    font-size: 0;
    // border-top: .27rem /* 10/37.5 */ solid #eee;
    .particulars-img {
      display: block;
      width: 100%;
    }
  }
  // 评论
  .comment-border {
    // border-top: .27rem /* 10/37.5 */ solid #eee;
  }
  // 查看更多评论
  .comment-more {
    margin: .43rem /* 16/37.5 */ 0 .53rem /* 20/37.5 */;
    text-align: center;
    .more-btn {
      font-size: .37rem /* 14/37.5 */;
      border: 1px solid $color-theme;
      color: $color-theme;
    }
  }
  // 底部操作按钮
  .footer-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9;
    width: 100%;
    height: 1.33rem /* 50/37.5 */;
    background-color: #fff;
    .bar-wrap {
      @include border-b-1px(100%);
      display: flex;
      align-items: center;
      height: 100%;
      .bar-list {
        display: flex;
        flex-direction: column;
        justify-content: center;
        @include border-l-1px(100%);
        width: 1.33rem /* 50/37.5 */;
        height: 100%;
        text-align: center;
        .iconfont {
          font-size: .48rem /* 18/37.5 */;
          color: $color-text;
        }
        .bar-text {
          padding-top: .16rem /* 6/37.5 */;
          font-size: .32rem /* 12/37.5 */;
          color: $color-text-9;
        }
      }
      .bar-list-add {
        flex: 1;
        font-size: .43rem /* 16/37.5 */;
        color: #fff;
        line-height: 1.33rem /* 50/37.5 */;
        text-align: center;
        &.bar-yellow {
          background-color: #FF9800;
        }
        &.bar-red {
          background-color: #FF3355;
        }
      }
    }
  }

  // 一条颜色容器
  .hr-10 {
    width: 100%;
    height: .27rem /* 10/37.5 */;
    background: #eee;
  }

  // 页面过渡
  .list-detail-enter-active,
  .list-detail-leave-active{
    transition: .3s all ease;
    .list-header {
      transition: .3s all ease;
    }
  }
  .list-detail-enter,
  .list-detail-leave-to{
    transform: translate3d(100%, 0, 0);
    .list-header {
      transform: translate3d(0, -100%, 0);
    }
  }
  // header过渡
  .list-header-enter-active,
  .list-header-leave-active{
    transition: .3s all ease;
  }
  .list-header-enter,
  .list-header-leave-to{
    transform: translate3d(0, -100%, 0);
  }
</style>
