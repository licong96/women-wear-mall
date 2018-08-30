<template lang="html">
  <!-- 客服，消息 -->
  <section class="full-fixed info">
    <lc-header title="客服" @callBack="back"></lc-header>
    <article class="center" ref="info">
      <transition-group :name="transition" tag="div">
        <div class="msg" :class="{'msg-mine': item.who===1}" v-for="(item, index) in msgData" :key="index">
          <div class="avatar">
            <img class="avatar-img" :src="item.src" alt="">
          </div>
          <div class="msg-context">
            <span class="text">{{item.context}}</span>
          </div>
        </div>
      </transition-group>
    </article>
    <!-- 底部发送按钮 -->
    <div class="foot-btn" ref="btnHeight">
      <i class="icon-picture" @click="_uploadImg"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-picture"></use></svg></i>
      <textarea class="input" v-model="sendText" rows="3" cols="6" @focus="_textarea"></textarea>
      <button class="waves-effect waves-light waves-button send" type="button" @click="_send">发送</button>
    </div>
  </section>
</template>

<script>
  import LcHeader from '@/components/Header'

  export default {
    data() {
      return {
        msgData: [],      // 消息
        sendText: '',
        transition: 'list-left'
      }
    },
    created() {
      this._getMsgData()
    },
    mounted() {
      this.$nextTick(() => {
        this.btnHeight = this.$refs.btnHeight.clientHeight
      })
    },
    methods: {
      _textarea() {
        // 防止键盘遮盖输入框
        setTimeout(function() {
          document.body.scrollTop = document.body.scrollHeight
        }, 300)
      },
      _send() {
        if (!this.sendText || this.sendText === ' ') {
          return
        }
        this.transition = 'list-right'    // 改变过渡方向
        this.msgData.push({
          who: 1,
          src: require('@/common/img/user-1.jpg'),
          context: this.sendText
        })
        this.sendText = ''    // 清除输入框
        // 滚动底部
        this._scrollBottom()
        setTimeout(() => {
          this.transition = 'list-left'    // 改变过渡方向
          this._getMsgLeftData()
        }, 500)
      },
      _scrollBottom() {
        setTimeout(() => {
          this.$refs.info.scrollTop = (this.$refs.info.scrollHeight - this.$refs.info.clientHeight) + this.btnHeight
        }, 20)
      },
      _uploadImg() {
      },
      _getMsgData() {  // 获取首页列表数据
        this.axios.get('/api/msg')
          .then((response) => {
            this.msgData = response.data.msg
          })
          .catch((error) => {
            console.log(error)
          })
      },
      _getMsgLeftData() {     // 获取对方信息
        this.axios.get('/api/msg')
          .then((response) => {
            let data = response.data.msgLeft
            this.msgData.push({
              who: data.who,
              src: data.src,
              context: data.context
            })
            this._scrollBottom()
          })
      },
      // 返回
      back() {
        this.$router.back();
      },
    },
    components: {
      LcHeader
    }
  }
</script>

<style scoped lang="scss">
  @import "../common/sass/variable";
  @import "../common/sass/mixin";

  .info {
    z-index: 12;
    background-color: #fff;
    .center {
      position: absolute;
      top: 1.2rem /* 45/37.5 */;
      right: 0;
      bottom: 0;
      left: 0;
      overflow-x: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      padding: .27rem /* 10/37.5 */ 0 1.6rem /* 60/37.5 */;
    }
    .foot-btn {
      @include border-b-1px(100%);
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 13;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 .43rem /* 16/37.5 */;
      width: 100%;
      height: 1.33rem /* 50/37.5 */;
      background-color: rgba(255, 255, 255, .9);
      .icon-picture {
        font-size: .64rem /* 24/37.5 */;
        color: $color-text-9;
      }
      .input {
        flex: 1;
        margin: 0 .27rem /* 10/37.5 */;
        padding: .16rem /* 6/37.5 */;
        border-radius: .11rem /* 4/37.5 */;
        height: .53rem /* 20/37.5 */;
        line-height: .53rem /* 20/37.5 */;
        font-size: .43rem /* 16/37.5 */;
        color: $color-text-6;
        background-color: $color-background-e;
        border: none;
        outline: none;
        resize: none;
      }
      .send {
        padding: .24rem /* 9/37.5 */ .29rem /* 11/37.5 */;
        font-size: .37rem /* 14/37.5 */;
        color: #fff;
        background-color: $color-theme;
      }
    }
    .avatar {
      display: inline-block;
      overflow: visible;
      position: relative;
      border-radius: 50%;
      height: 1.07rem /* 40/37.5 */;
      width: 1.07rem /* 40/37.5 */;
      vertical-align: middle;
    }
    .msg {
      overflow: hidden;
      position: relative;
      padding: .13rem /* 5/37.5 */;
      .avatar {
        position: absolute;
        top: .13rem /* 5/37.5 */;
        left: .37rem /* 14/37.5 */;
        width: .85rem /* 32/37.5 */;
        height: .85rem /* 32/37.5 */;
        .avatar-img {
          border-radius: 50%;
          width: 100%;
        }
      }
    }
    .msg-context {
      user-select: text;
      position: relative;
      display: inline-block;
      overflow: visible;
      margin: 0 .27rem /* 10/37.5 */ .13rem /* 5/37.5 */ 1.39rem /* 52/37.5 */;
      background: #fff2f6;
      border: 1px solid #ffe5ee;
      padding: .21rem /* 8/37.5 */ .27rem /* 10/37.5 */;
      border-radius: .21rem /* 8/37.5 */;
      max-width: 75%;
      word-wrap: break-word;
      min-height: .85rem /* 32/37.5 */;
      &:before {
        content: "";
        background: #fff2f6;
        display: inline-block;
        transform: rotate(-135deg);
        height: .21rem /* 8/37.5 */;
        width: .21rem /* 8/37.5 */;
        border-width: 1px 1px 0 0;
        border-color: #ffe5ee;
        border-style: solid;
        position: absolute;
        left: -.11rem /* -4/37.5 */;
        top: .32rem /* 12/37.5 */;
      }
      .text {
        font-size: .43rem /* 16/37.5 */;
        line-height: 1.3;
        color: #333;
      }
    }
    // 我
    .msg-mine {
      .avatar {
        left: auto;
        right: .37rem /* 14/37.5 */;
      }
      .msg-context {
        float: right;
        margin: 0 1.39rem /* 52/37.5 */ .13rem /* 5/37.5 */ .27rem /* 10/37.5 */;
        background: #fff;
        border: 1px solid #efefef;
        color: #888;
        &:before {
          left: auto;
          right: -.11rem /* -4/37.5 */;
          background: #fff;
          display: inline-block;
          transform: rotate(45deg);
          height: .21rem /* 8/37.5 */;
          width: .21rem /* 8/37.5 */;
          border-width: 1px 1px 0 0;
          border-color: #efefef;
          border-style: solid;
        }
        .text {
          color: #666;
        }
      }
    }
  }

  .list-right-enter-active,
  .list-right-leave-active,
  .list-left-enter-active,
  .list-left-leave-active {
    transition: all .3s;
  }
  .list-right-enter,
  .list-right-leave-to {
    opacity: 0;
    transform: translateX(30%);
  }
  .list-left-enter,
  .list-left-leave-to {
    opacity: 0;
    transform: translateX(-30%);
  }
</style>
