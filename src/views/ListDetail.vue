<template lang="html">
  <!-- 首页 -->
  <section class="full-fixed list-detail">
    <header class="list-header ">
      <div class="top">
        <span @click="back">返回</span>
        <h2 class="title _effect-2" :class="{'_effect-50-o': decline}">标题{{$route.params.id}}</h2>
      </div>
      <!-- 导航 -->
      <div class="_effect" :class="{'_effect-50': decline}">
        <ul class="list-nav">
          <li class="list-li" v-for="(item, index) in listNav" @click="_scrollTo(index, $event)" :class="{'current':currentIndex===index}" ref="menuList">{{item}}{{currentIndex}}</li>
        </ul>
      </div>
    </header>
    <!-- 滚动内容 -->
    <scroll class="recommend-content" :data="discList" :probe-type="probeType" :listem-scroll="listemScroll" @scroll="scroll" ref="listview">
      <section class="_effect">
        <div @click="path" class="bottom _effect" :class="{'_effect-30': decline}">
          <div class="list-conster" v-for="item in 3" ref="listGroup">
            <p v-for="iten in 50">商品参数</p>
          </div>
        </div>
      </section>
    </scroll>
    <transition name="transX">
    </transition>
    <router-view @destroy="destroy"></router-view>
  </section>
</template>

<script>
  import Scroll from '@/components/Scroll'

  export default {
    data() {
      return {
        discList: [],
        listNav: ['商品参数', '图片详情', '评价'],
        listHeight: [],
        scrollY: 0,
        currentIndex: 0,
        decline: false
      }
    },
    beforeRouteUpdate(to, from, next) {
      // 在当前路由改变，但是该组件被复用时调用
      console.log(from.name)
      if (from.name === 'listdetail') {
        this.decline = true
      }
      next()
    },
    beforeRouteLeave(to, from, next) {  // 离开是 false
      // 导航离开该组件的对应路由时调用
      this.$emit('destroy', false)
      next()
    },
    created() {
      this.probeType = 3
      this.listemScroll = true
    },
    mounted() {
      this.$nextTick(function() {
        this._calculateHeight()
      })
    },
    computed: {
    },
    methods: {
      scroll(pos) {   // 接收滑动位置
        // console.log(pos.y)
        this.scrollY = pos.y
      },
      _calculateHeight() {    // 计算高度
        this.listHeight = []
        this.listGroup = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < this.listGroup.length; i++) {
          let item = this.listGroup[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      _scrollTo(index) {    // 滚动到目标位置
        this.$refs.listview.scrollToElement(this.listGroup[index], 300)
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
      }
    },
    watch: {
      scrollY(newY) {
        const listHeight = this.listHeight
        // 当滚动到顶部，newY>0
        if (newY > 0) {
          this.currentIndex = 0
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
      Scroll
    }
  }
</script>

<style scoped lang="scss">
  .list-detail {
    background-color: #fff;
    font-size: .53rem /* 40/75 */;
  }
  // 头部
  .list-header {
    position: relative;
    z-index: 100;
    background: #fff;
    .top {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ddd;
      line-height: 1.2rem /* 90/75 */;
      .title {
        flex: 1;
        text-align: center;
      }
    }
    .list-nav {
      display: flex;
      line-height: 1.2rem /* 90/75 */;
      box-shadow: 0 1px 2px #ddd;
      .list-li {
        &.current {
          color: red;
        }
        flex: 1;
        text-align: center;
      }
    }
  }

  .recommend-content {
    height: 100%;
    .list-conster {
      border-bottom: 1px solid red;
      padding-bottom: 10px;
    }
    .bottom {
      padding-bottom: 2.4rem /* 180/75 */;
    }
  }

  .transX-enter-active,
  .transX-leave-active{
    transition: .3s all ease;
  }
</style>
