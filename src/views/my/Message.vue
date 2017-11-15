<template lang="html">
  <!-- 信息 -->
  <section class="full-fixed message">
    <list-store :data="messageData" :time="time"></list-store>
  </section>
</template>

<script>
  import ListStore from '@/components/ListStore'

  export default {
    beforeRouteEnter (to, from, next) {   // 页面切换效果，进入是 true
      next(vm => {
        vm.$emit('destroy', true)
      })
    },
    beforeRouteLeave(to, from, next) {  // 离开是 false
      this.$emit('destroy', false)
      next()
    },
    data() {
      return {
        messageData: []    // 列表数据
      }
    },
    created() {
      this.time = true      // 列表组件显示时间
      this._getListData()
    },
    methods: {
      _getListData() {  // 获取首页列表数据
        this.axios.get('/api/my/message')
          .then((res) => {
            console.log(res)
            this.messageData = res.data.message
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    components: {
      ListStore
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/sass/variable";
  @import "../../common/sass/mixin";

  .message {
    background-color: $color-background;
  }
</style>
