<template lang="html">
  <!-- 弹出提示 -->
  <transition name="alert-hint">
    <section class="alert-hint" v-show="alertHint.lsattr">
      <div class="alert-box">
        {{alertHint.text}}
      </div>
    </section>
  </transition>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters([
        'alertHint'
      ])
    },
    methods: {
      ...mapMutations({   // alertHint 要有两个字段 1.lsattr 2.text 3.time
        setAlertHint: 'SET_ALERT_HINT'
      })
    },
    watch: {
      alertHint(newVal) {
        if (newVal.lsattr) {
          if (!newVal.time) {   // 默认延迟时间 1500
            newVal.time = 1500
          }
          clearTimeout(this.alertTime)
          this.alertTime = setTimeout(() => {      // 自动隐藏
            this.setAlertHint({
              lsattr: false,
              text: newVal.text,
              time: newVal.time
            })
          }, newVal.time)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .alert-hint {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    z-index: 99;
    .alert-box {
      padding: .27rem /* 10/37.5 */ .37rem /* 14/37.5 */;
      border-radius: .11rem /* 4/37.5 */;
      font-size: .37rem /* 14/37.5 */;
      color: #fff;
      background-color: rgba(255, 51, 85, .9);
      // background-color: rgba(0, 0, 0, .7);
    }
  }
  .alert-hint-enter-active,
  .alert-hint-leave-active {
    transition: .3s all ease;
  }
  .alert-hint-enter,
  .alert-hint-leave-to {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
</style>
