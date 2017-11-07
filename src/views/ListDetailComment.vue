<template lang="html">
  <!-- 商品评论 -->
  <section class="full-fixed de-comment">
    <!-- <scroll ref="listview"> -->
    <!-- div是scroll的容器，不能去掉 -->
    <!-- <div> -->
      <!-- 综合评分 -->
      <div class="de-top">
        <div class="de-top-t">
          <p class="text">综合评分：</p>
          <div class="star">
            <span class="star-light"></span>
          </div>
          <p class="minute">4分</p>
        </div>
      </div>
      <!-- 详细评论 -->
      <div class="de-body">
        <comments :comment-data="commentData"></comments>
      </div>
    <!-- </div> -->
    <!-- </scroll> -->
  </section>
</template>

<script>
  import Scroll from '@/components/Scroll'
  import Comments from '@/components/Comment'

  export default {
    data() {
      return {
        commentData: []
      }
    },
    created() {
      this._getListData()
    },
    methods: {
      _getListData() {  // 获取首页列表数据
        this.axios.get('/api/listDetail')
          .then(function(response) {
            this.commentData = response.data.commentData
            console.log(response.data.commentData)
            setTimeout(() => {
              this.$refs.listview.refresh()
            }, 20)
          }.bind(this))
          .catch(function(error) {
            console.log(error)
          })
      }
    },
    components: {
      Scroll,
      Comments
    }
  }
</script>

<style scoped lang="scss">
  @import "../common/sass/variable";
  @import "../common/sass/mixin";

  .de-comment {
    overflow-y: auto;
    -webkit-overflow-scrolling:touch;
    z-index: 10;
    background: #fff;
  }
  .de-top {
    @include border-b-1px(0);
    .de-top-t {
      display: flex;
      align-items: center;
      padding: .27rem /* 10/37.5 */;
      .text {
        padding-right: .27rem /* 10/37.5 */;
        font-size: .37rem /* 14/37.5 */;
        color: $color-text;
      }
      .minute {
        padding-left: .27rem /* 10/37.5 */;
        font-size: .37rem /* 14/37.5 */;
        color: $color-theme;
      }
      .star {
        position: relative;
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
    }
  }
</style>
