<template lang="html">
  <!-- 评论 -->
  <div>
    <section class="comment" v-for="(item, itemIndex) in commentData" :key="itemIndex">
      <div class="title">
        <img class="comment-img" src="../common/img/user-img.png" alt="">
        <span class="name">{{item.username}}</span>
        <time class="time">{{item.times}}</time>
      </div>
      <div class="star">
        <span class="star-light" :style="{'width': _starLight(item.start)}"></span>
      </div>
      <div class="text">
        我特意买大一码，看评论说会缩水，关注左很久了，太贵一直没下手，挺舒服的，也很漂亮，是我喜欢的款式
      </div>
      <div class="size">
        <span class="empty">颜色：黑色</span>
        <span>尺寸：M</span>
      </div>
      <div class="img-group" v-show="item.minisrc.length">
        <span class="box-flex-center" v-for="(img, imgIndex) in item.minisrc" :key="imgIndex" @click="_swiperFullShow(itemIndex, imgIndex)">
          <img class="mini-img" :src="img.src" alt="">
        </span>
      </div>
    </section>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'

  export default {
    props: {
      commentData: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
      }
    },
    computed: {
    },
    methods: {
      _starLight(num) {   // 评分，多少星
        return num * 20 + '%'
      },
      _swiperFullShow(fIndex, zIndex) {   // 显示全屏预览轮播图
        let father = this.commentData[fIndex].minisrc
        this.setSwiperFull(father)
        this.setSwiperFullIndex(zIndex)
      },
      ...mapMutations({
        setSwiperFull: 'SET_SWIPER_FULL',
        setSwiperFullIndex: 'SET_SWIPER_FULL_INDEX'
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "../common/sass/variable";
  @import "../common/sass/mixin";

  .comment {
    padding: .27rem /* 10/37.5 */;
    @include border-b-1px(0);
    .title {
      display: flex;
      align-items: center;
      padding-bottom: .27rem /* 10/37.5 */;
      @include border-b-1px(0);
      .comment-img {
        width: .8rem /* 30/37.5 */;
        height: .8rem /* 30/37.5 */;
        border-radius: 50%;
      }
      .name {
        flex: 1;
        padding-left: .27rem /* 10/37.5 */;
        font-size: .32rem /* 12/37.5 */;
        color: $color-text;
      }
      .time {
        font-size: .32rem /* 12/37.5 */;
        color: $color-text-9;
      }
    }
    .star {
      position: relative;
      margin: .16rem /* 6/37.5 */ 0;
      width: 3.31rem /* 124/37.5 */;
      height: .59rem /* 22/37.5 */;
      background: url("../common/img/star.png") no-repeat;
      background-size: 3.31rem /* 124/37.5 */;
      .star-light {
        position: absolute;
        top: 0;
        left: 0;
        width: 80%;   // 控制宽度，操作评分
        height: 100%;
        background: url("../common/img/star.png") no-repeat;
        background-size: 3.31rem /* 124/37.5 */;
        background-position: 0 -.59rem /* 22/37.5 */;
      }
    }
    .text {
      line-height: 1.5;
      font-size: .32rem /* 12/37.5 */;
      color: $color-text;
    }
    .size {
      padding-top: .16rem /* 6/37.5 */;
      font-size: .32rem /* 12/37.5 */;
      color: $color-text-9;
      .empty {
        padding-right: .11rem /* 4/37.5 */;
      }
    }
    .img-group {
      display: flex;
      flex-wrap: wrap;
      margin-top: .21rem /* 8/37.5 */;
      .box-flex-center {
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: .21rem /* 8/37.5 */;
        margin-bottom: .21rem /* 8/37.5 */;
        border-radius: .11rem /* 4/37.5 */;
        width: 2.11rem /* 79/37.5 */;
        height: 2.11rem /* 79/37.5 */;
      }
      .mini-img {
        width: 100%;
      }
    }
  }
</style>
