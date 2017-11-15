<template lang="html">
  <!-- 友圈 -->
  <section class="full-fixed firend">
    <list-store :data="friendData" :time="time"></list-store>
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
        friendData: []    // 数据
      }
    },
    created() {
      this.time = true      // 列表组件显示时间
      this._getFriendData()
    },
    methods: {
      _getFriendData() {  // 获取首页列表数据
        this.axios.get('/api/my/friend')
          .then((res) => {
            console.log(res)
            this.friendData = res.data.friend
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
  .firend {
    background-color: #fff;
  }
</style>
