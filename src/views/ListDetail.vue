<template lang="html">
  <!-- 首页 -->
  <section class="full-fixed list-detail">
    <transition name="list-header">
      <header class="max-center list-header" v-show="titleShow">
        <div class="top">
          <i class="iconfont"></i>
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
    <scroll class="recommend-content" :data="commentData" :probe-type="probeType" :listem-scroll="listemScroll"  @scroll="scroll" ref="listview">
      <!-- 空标签是滑动容器，删掉就完蛋 -->
      <section>
        <div class="basic" ref="basic">
          <!-- 轮播组件 -->
          <div class="swiper">
            <img :src="listDetail.img" style="width: 100%;" alt="">
          </div>
          <!-- 商品标题和价格 -->
          <div class="commodity-text">
            <!-- <commodity-text :title-style="titleStyle" :data="listDetail"></commodity-text> -->
            <h3 class="title">{{listDetail.title}}</h3>
            <div class="tags">
              <span class="title-tag" v-for="tag in listDetail.props">{{tag}}</span>
            </div>
            <div class="price-wrap">
              <span class="price">
                <i class="icon-renminbi"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-renminbi"></use></svg></i>{{listDetail.price}}
              </span>
              <s class="orgPrice">
                <i class="icon-renminbi"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-renminbi"></use></svg></i>{{listDetail.orgPrice}}
              </s>
            </div>
            <div class="food-text">
              <span class="freight">快递：免运费</span>
              <span class="freight">月销量 {{listDetail.sale}}</span>
            </div>
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
              <li class="parameter-list bad">详细页数据有签名限制，抓取不到，只能模拟</li>
              <li class="parameter-list" v-for="(item, index) in parameterData" :key="index">
                <span class="parameter-title">{{item.title}}</span>
                <span class="parameter-desc">{{item.desc}}</span>
              </li>
            </ul>
          </div>
          <!-- 图片详情 -->
          <div class="list-conster particulars" ref="listGroup1">
            <div class="hr-10"></div>
            <img class="particulars-img" :src="item" :key="index" v-for="(item, index) in particularsData" @load="_srcollRefresh">
          </div>
          <!-- 用户评论 -->
          <div class="list-conster comment-border" ref="listGroup2">
            <div class="hr-10"></div>
            <comments :comment-data="commentData"></comments>
            <div class="comment-more">
              <span class="waves-effect waves-button more-btn" @click="_openPage('comment')">查看更多评论</span>
            </div>
          </div>
        </div>
      </section>
    </scroll>
    <!-- 底部操作按钮 -->
    <section class="max-center footer-bar">
      <ul class="bar-wrap">
        <li class="bar-list" @click="_collect">
          <i class="iconfont" v-show="!iconCollect"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-shoucang1"></use></svg></i>
          <i class="iconfont" v-show="iconCollect"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-shoucang"></use></svg></i>
          <p class="bar-text">收藏</p>
        </li>
        <li class="bar-list" @click="_openPageStore">
          <i class="iconfont">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-dianpu-copy"></use>
            </svg>
          </i>
          <p class="bar-text">店铺</p>
        </li>
        <li class="bar-list" @click="_openPage('info')">
          <i class="iconfont">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-icon1"></use>
            </svg>
          </i>
          <p class="bar-text">客服</p>
        </li>
        <li class="bar-list-add bar-yellow">
          <p class="bar-add-text" @click="_addCart">加入购物车</p>
        </li>
        <li class="bar-list-add bar-red">
          <p class="bar-add-text" @click="_addMember">加入会员</p>
        </li>
      </ul>
    </section>
    <!-- 子页面路由 -->
    <transition name="transX">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
  import Scroll from '@/components/Scroll'
  import Swiper from '@/components/Swiper'
  import CommodityText from '@/components/CommodityText'
  import Comments from '@/components/Comment'
  import {mapMutations, mapGetters} from 'vuex'

  export default {
    beforeRouteEnter (to, from, next) {   // 页面切换效果，进入是 true
      next(vm => {
        // vm.$emit('destroy', true)
      })
    },
    beforeRouteUpdate(to, from, next) {
      // 如果用户打开了图片全屏预览，但是糊涂了，不知道怎么的点了返回键，那也要关闭图片预览
      if (this.swiperFull.length) {
        this.setSwiperFull([])
        this.setSwiperFullIndex(0)
      }
      next()
    },
    beforeRouteLeave(to, from, next) {  // 离开是 false
      // 和上面是一个道理，为的是防止用户点击返回也能关闭图片预览
      if (this.swiperFull.length) {
        this.setSwiperFull([])
        this.setSwiperFullIndex(0)
      }
      this.setSelectSizeColor(false)    // 页面关闭的话，关闭选择器
      // this.$emit('destroy', false)
      next()
    },
    data() {
      return {
        discList: [],
        specificationData: {},  // 选择商品规格
        parameterData: [],    // 参数数据
        particularsData: [],  // 详情数据
        commentData: [],  // 评论数据
        listNav: ['参数', '详情', '评价'],
        titleShow: false,   // 头部显示隐藏切换
        listHeight: [],
        scrollY: 0,
        currentIndex: 0,
        decline: false,
        path: 0,
        iconCollect: false     // 收藏图标
      }
    },
    created() {
      console.log('created')
      if (!this.listDetail.img) {   // 没有数据 返回上一页
        // this.$router.back()
        this.$router.replace({
          path: '/list'
        })
      } else {
        this._getListData()
      }
      this.probeType = 3        // 滚动参数
      this.listemScroll = true
      this.autoplay = 0   // 轮播自动滚动
      this.titleStyle = true    // 控制商品标题价格颜色
      this.path = this.$route.params.id   // 当前商品 id
      console.log('path:', this.path)
    },
    mounted() {
    },
    activated() {   // router-view 用了缓存，在这里更新数据
      console.log('listDetail更新数据')
    },
    computed: {
      ...mapGetters([
        'listDetail',
        'swiperFull',
        'selectSpecification'
      ])
    },
    methods: {
      _getListData() {  // 获取首页列表数据
        this.axios.get('/api/listDetail')
          .then(function(response) {
            console.log(response.data)
            // this.discList = response.data.discList
            this.specificationData = response.data.discList.specification
            this.specificationData.img = this.listDetail.img   // 选择参数里面，添加一张图片
            this.specificationData.price = this.listDetail.price   // 选择参数里面，加入价格

            this.parameterData = response.data.parameterData
            // this.particularsData = response.data.particularsData
            this.commentData = response.data.commentData
            this._particularsData()   // 模拟详细页图片
            setTimeout(() => {
              if (this.$refs.listview) {
                this.$refs.listview.refresh()
              }
              if (this._calculateHeight) {
                this._calculateHeight()
              }
              this.topHeight = this.$refs.topHeight.clientHeight  // 因为 header 是浮动的，变相区一个相同高度
            }, 20)
          }.bind(this))
          .catch(function(error) {
            console.log(error)
          })
      },
      _particularsData() {    // 模拟详细页图片
        let img = this.listDetail.img
        for (let i = 0; i < 3; i++) {
          this.particularsData.push(img)
        }
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
      _srcollRefresh() {    // 更新滚动高度
        if (this.loadimgTime) {
          clearTimeout(this.loadimgTime)
        }
        this.loadimgTime = setTimeout(() => {
          if (this.$refs.listview) {
            this.$refs.listview.refresh()
          }
          if (this._calculateHeight) {
            this._calculateHeight()
          }
        }, 30)
      },
      _selectShow() {   // 显示商品选择颜色尺寸，并传入数据
        this.setSpecificationData(this.specificationData)
        this.setSelectSizeColor(true)
      },
      _addCart() {    // 加入购物车
        let select = this.selectSpecification
        if (!select.color || !select.size) {
          this.setSpecificationData(this.specificationData)
          console.log(this.specificationData)
          this.setSelectSizeColor(true)     // 显示选择
        } else {
          this.setAlertHint({
            lsattr: true,
            text: '成功加入购物车',
            time: 2000
          })
        }
      },
      _addMember() {    // 加入会员
        // 判断是否选择了颜色和尺寸
        let select = this.selectSpecification
        if (!select.color || !select.size) {
          this.setSpecificationData(this.specificationData)
          this.setSelectSizeColor(true)     // 显示选择
        } else {
          this.setSelectSizeColor(false)
          this.$router.push({
            path: `/list/detail/${this.path}/submit`
          })
        }
      },
      _collect() {    // 收藏
        this.iconCollect = !this.iconCollect
        if (this.iconCollect) {
          this.setAlertHint({
            lsattr: true,
            text: '收藏成功',
            time: 1500
          })
        } else {
          this.setAlertHint({
            lsattr: true,
            text: '取消收藏',
            time: 1500
          })
        }
      },
      _openPageStore() {     // 打开店铺
        this.setRouterAnim(false)
        this.$router.push({
          path: `/list/store`
        })
      },
      _openPage(path) {   // 开发子页面
        this.$router.push({
          path: `/list/detail/${this.path}/${path}`
        })
      },
      ...mapMutations({
        setSelectSizeColor: 'SET_SELECT_SIZE_COLOR',
        setSpecificationData: 'SET_SPECIFICATION_DATA',
        setSwiperFull: 'SET_SWIPER_FULL',
        setSwiperFullIndex: 'SET_SWIPER_FULL_INDEX',
        setAlertHint: 'SET_ALERT_HINT',
        setRouterAnim: 'SET_ROUTER_ANIM'
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
    overflow: hidden;
    background-color: #fff;
  }
  // 头部
  .list-header {
    position: fixed;
    top: 0;
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
    background-color: #fff;
    padding: .32rem /* 12/37.5 */ .43rem /* 16/37.5 */;
    .title {
      font-size: .43rem /* 16/37.5 */;
      line-height: 1.4;
      color: $color-text-d;
    }
    .tags {
      overflow: hidden;
      padding-top: .27rem /* 10/37.5 */;
      .title-tag {
        display: inline-block;
        padding: 0 .08rem /* 3/37.5 */;
        margin: 0 .08rem /* 3/37.5 */ .08rem /* 3/37.5 */ 0;
        height: .43rem /* 16/37.5 */;
        line-height: .43rem /* 16/37.5 */;
        font-size: .27rem /* 10/37.5 */;
        color: #6d7d86;
        background-color: #eff3f6;
      }
    }
    .price-wrap {
      display: flex;
      align-items: center;
      padding-top: .27rem /* 10/37.5 */;
      .price {
        font-size: .59rem /* 22/37.5 */;
        color: $color-theme;
        .icon-renminbi {
          font-size: .32rem /* 12/37.5 */;
        }
      }
      .orgPrice {
        padding-left: .08rem /* 3/37.5 */;
        font-size: .32rem /* 12/37.5 */;
        color: $color-text-9;
      }
      .sale {
        font-size: .37rem /* 14/37.5 */;
        color: $color-text-9;
      }
    }
    .food-text {
      padding-top: .27rem /* 10/37.5 */;
      display: flex;
      align-items: center;
    }
    .freight{
      padding-right: .53rem /* 20/37.5 */;
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
    .bad {
      text-align: center;
      color: $color-theme;
    }
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
    .particulars-img {
      margin-top: .21rem /* 8/37.5 */;
      width: 100%;
    }
  }
  // 评论
  .comment-border {
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
    bottom: -1px;
    z-index: 9;
    width: 100%;
    height: 1.36rem /* 51/37.5 */;
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
        line-height: 1.36rem /* 51/37.5 */;
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
  }
  .list-detail-enter,
  .list-detail-leave-to{
    transform: translate3d(100%, 0, 0);
  }
</style>
