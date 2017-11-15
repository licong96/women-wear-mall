<template lang="html">
  <!-- 店铺 -->
  <section class="full-fixed store">
    <!-- 背景图片 -->
    <div class="bg-wrap" ref="bgImg">
      <div class="bg-img" ref="bgImgS"></div>
    </div>
    <scroll :data="commodity" :probe-type="probeType" :listem-scroll="listemScroll" @scroll="scroll" ref="listview">
    <!--空div用来装载滚动，不能删掉 -->
    <div>
      <!-- 顶部 -->
      <div class="top">
        <div class="content flex-center">
          <div class="img-wrap">
            <img class="img" src="http://s3.mogucdn.com/p2/161104/upload_8ff8g0d2784ecfg2l042bkc223li2_320x320.jpg" alt="">
          </div>
          <h3 class="title">牛牛衣舍</h3>
          <p class="desc">
            <span class="sales">销量：958</span>*<span class="collect">收藏：164</span>
          </p>
          <div class="btn">
            <button class="waves-effect waves-button waves-light relation-btn" type="button" @click="_openPageInfo(123)"><i class="icon-daipingjia"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-icon1"></use></svg></i>联系商家</button>
            <button class="waves-effect waves-button waves-light collect-btn" type="button" @click="_collect">
              <i class="icon-daipingjia" v-show="!iconCollect"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-shoucang1"></use></svg></i><i class="icon-daipingjia" v-show="iconCollect"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-shoucang"></use></svg></i>收藏商家</button>
          </div>
        </div>
      </div>
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
  </section>
</template>

<script>
  import CommodityText from '@/components/CommodityText'
  import Scroll from '@/components/Scroll'
  import {prefixStyle} from '@/common/js/dom'
  import {mapMutations} from 'vuex'

  const transform = prefixStyle('transform')    // 浏览器前缀

  export default {
    data() {
      return {
        commodity: [],  // 商品
        scrollY: 0,     // 滚动距离
        iconCollect: false
      }
    },
    created() {
      this.probeType = 3  // 滚动不截流
      this.listemScroll = true  // 滚动返回值
      this._getListData()
    },
    mounted() {
      setTimeout(() => {
        this.imageHeight = this.$refs.bgImg.clientHeight
      }, 20)
    },
    methods: {
      scroll(pos) {   // 监听滚动
        // console.log(pos.y)
        this.scrollY = pos.y
      },
      openDetail(id) {      // 打开信息页
        this.$router.push({
          path: `/list/detail/${id}`
        })
      },
      _collect() {
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
      _getListData() {  // 获取首页列表数据
        this.axios.get('/api/list')
          .then((response) => {
            this.commodity = response.data.commodity
            setTimeout(() => {
              // this.$refs.listview.refresh()
            }, 20)
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      _openPageInfo(id) {
        this.$router.push({
          path: `/list/detail/${id}/info`
        })
      },
      ...mapMutations({
        setAlertHint: 'SET_ALERT_HINT'
      })
    },
    watch: {
      scrollY(newY) {
        let scale = 1
        let top = 0
        let percent = Math.abs(newY / this.imageHeight)
        if (newY > 0) {
          scale = 1 + percent
        } else {
          top = Math.max(-this.imageHeight, -(percent * 180))
          this.$refs.bgImgS.style[transform] = `translate3d(0, ${top}px, 0)`
        }
        this.$refs.bgImg.style[transform] = `scale(${scale})`
      }
    },
    components: {
      CommodityText,
      Scroll
    }
  }
</script>

<style scoped lang="scss">
  @import "../common/sass/variable";
  @import "../common/sass/mixin";

  .store {
    background-color: #fff;
    .bg-wrap {
      overflow: hidden;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      padding-top: 86%;
      width: 100%;
      transform-origin: top;
      .bg-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url('http://s10.mogucdn.com/p1/161109/idid_ifrdezrqgu4dezrrmmzdambqmeyde_640x999.png');
        background-repeat: no-repeat;
        background-size: cover;
        &:after {
          content: " ";
          display: block;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background-image: linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,.7));
        }
      }
    }
    .top {
      overflow: hidden;
      position: relative;
      z-index: 2;
      padding-top: 86%;
      width: 100%;
      .content {
        flex-direction: column;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 2;
        color: #fff;
        .img-wrap {
          width: 2.13rem /* 80/37.5 */;
          .img {
            width: 100%;
          }
        }
        .title {
          margin-top: .53rem /* 20/37.5 */;
          padding-bottom: .27rem /* 10/37.5 */;
          @include border-b-1px(0);
          font-size: .53rem /* 20/37.5 */;
          font-weight: 500;
          &:after {
            border-bottom: 1px solid rgba(255, 255, 255, 0.8);
          }
        }
        .desc {
          margin-top: .43rem /* 16/37.5 */;
          font-size: .37rem /* 14/37.5 */;
          .sales {
            padding-right: .16rem /* 6/37.5 */;
          }
          .collect {
            padding-left: .16rem /* 6/37.5 */;
          }
        }
        .btn {
          padding-top: .43rem /* 16/37.5 */;
          font-size: .43rem /* 16/37.5 */;
          .relation-btn {
            margin-right: .43rem /* 16/37.5 */;
            border: .01rem solid hsla(0,0%,100%,.5);
          }
          .collect-btn {
            border: .01rem solid hsla(0,0%,100%,.5);
          }
          .icon-daipingjia {
            padding-right: .05rem /* 2/37.5 */;
            font-size: .48rem /* 18/37.5 */;
          }
        }
      }
    }
    // 列表
    .commodity {
      padding-top: .27rem /* 10/37.5 */;
      background: #fff;
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
  }
</style>
