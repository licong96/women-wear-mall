<template>
  <!-- 首页底部导航 -->
  <footer class="the-nav">
    <div class="footer _effect" :class="{'_effect-50': routerAnim}">
      <ul class="nav-box">
        <router-link to="/list" tag="li" class="nav-li">
          <i class="iconfont">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-icon"></use>
            </svg>
          </i>
          <p class="desc">首页</p>
        </router-link>
        <router-link to="/shopping" tag="li" class="nav-li">
          <i class="iconfont">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-gouwuche"></use>
            </svg>
          </i>
          <p class="desc">购物车</p>
        </router-link>
        <router-link to="/mycenter" tag="li" class="nav-li">
          <i class="iconfont">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-wode"></use>
            </svg>
          </i>
          <p class="desc">个人中心</p>
        </router-link>
      </ul>
    </div>
    </div>
  </footer>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {}
    },
    created() {},
    mounted() {},
    computed: {
      ...mapGetters([
        'routerAnim'
      ])
    },
    methods: {},
    watch: {},
    components: {}
  }
</script>

<style scoped lang="scss">
  @import "../common/sass/mixin";
  @import "../common/sass/variable";

  .the-nav {
    // height: 1.33rem /* 50/37.5 */;
    .footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 5;
      width: 100%;
      height: 1.33rem /* 50/37.5 */;
      background-color: #fff;
      .nav-box {
        display: flex;
        @include border-b-1px(100%);
        height: 100%;
        color: $color-sub-theme;
      }
      .nav-li {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        line-height: 1;
        font-size: 0;
        text-align: center;
        &.router-link-active {
          color: $color-theme;
        }
        .iconfont {
          font-size: .59rem /* 22/37.5 */;
        }
        .desc {
          margin-top: .11rem /* 4/37.5 */;
          font-size: .32rem /* 12/37.5 */;
        }
      }
    }
  }
</style>
