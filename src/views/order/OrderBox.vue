<template lang="html">
  <!-- 我的订单容器 -->
  <section class="full-fixed order-box">
    <ul class="nav">
      <li class="list" :class="{'active': currentIndex===0}" @click="_openCut('all', 0)">全部</li>
      <li class="list" :class="{'active': currentIndex===1}" @click="_openCut('deliver', 1)">待发货</li>
      <li class="list" :class="{'active': currentIndex===2}" @click="_openCut('take', 2)">待收货</li>
      <li class="list" :class="{'active': currentIndex===3}" @click="_openCut('remain', 3)">待评价</li>
      <li class="list" :class="{'active': currentIndex===4}" @click="_openCut('after', 4)">售后</li>
    </ul>
    <div class="main">
      <scroll ref="scroll">
        <div>
          <keep-alive>
            <router-view @scrolls="scrolls"></router-view>
          </keep-alive>
        </div>
      </scroll>
    </div>
  </section>
</template>

<script>
  import Scroll from '@/components/Scroll'

  export default {
    beforeRouteLeave(to, from, next) {  // 离开是 false
      this.$emit('destroy', false)
      next()
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    created() {
      this._cutActive()
    },
    methods: {
      scrolls() {
        setTimeout(() => {
          this.$refs.scroll.refresh()
        }, 20)
      },
      _cutActive() {    // 切换当前选中的状态
        const pathName = this.$route.name
        switch (pathName) {
          case 'all':
            this.currentIndex = 0
            break
          case 'deliver':
            this.currentIndex = 1
            break
          case 'take':
            this.currentIndex = 2
            break
          case 'remain':
            this.currentIndex = 3
            break
          case 'after':
            this.currentIndex = 4
            break
          default:
            this.currentIndex = 0
        }
      },
      _openCut(cut, index) {    // 切换
        this.currentIndex = index
        this.$router.replace({
          path: `/mycenter/orderbox/${cut}`
        })
        this.scrolls()
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/sass/variable";
  @import "../../common/sass/mixin";

  .order-box {
    overflow: hidden;
    background-color: $color-background-e;
    .nav {
      @include border-b-1px(0);
      position: relative;
      z-index: 8;
      display: flex;
      align-items: center;
      height: 1.2rem /* 45/37.5 */;
      background-color: #fff;
      .list {
        flex: 1;
        font-size: .43rem /* 16/37.5 */;
        line-height: 1.2rem /* 45/37.5 */;
        text-align: center;
        &.active {
          color: $color-theme;
        }
      }
    }
    .main {
      position: absolute;
      top: 1.47rem /* 55/37.5 */;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>
