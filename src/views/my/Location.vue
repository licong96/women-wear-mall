<template lang="html">
  <!-- 收货地址 -->
  <section class="full-fixed location">
    <div class="list">
      <div class="title">
        <span class="name">张飞</span>
        <span class="ipone">13699531996</span>
      </div>
      <div class="text">江西省南昌市红谷滩新区卧龙路999号</div>
      <div class="button">
        <div class="check-box" @click="_checkDefault">
          <input type="checkbox" name="c-all" value="0" v-model="kDefault" class="checkout-all" :class="{'checked': kDefault}">
          <label for="c-all" class="settle-label">设为默认</label>
        </div>
        <div class="oper">
          <span class="edit"><i class="icon-daipingjia"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-daipingjia"></use></svg></i>编辑</span>
          <span class="delete"><i class="icon-lajixiang"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-lajixiang"></use></svg></i>编辑</span>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="title">
        <span class="name">张飞</span>
        <span class="ipone">13699531996</span>
      </div>
      <div class="text">江西省南昌市红谷滩新区卧龙路999号</div>
      <div class="button">
        <div class="check-box" @click="_checkDefault">
          <input type="checkbox" name="c-all" value="0" v-model="kDefault" class="checkout-all" :class="{'checked': kDefault}">
          <label for="c-all" class="settle-label">设为默认</label>
        </div>
        <div class="oper">
          <span class="edit"><i class="icon-daipingjia"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-daipingjia"></use></svg></i>编辑</span>
          <span class="delete"><i class="icon-lajixiang"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-lajixiang"></use></svg></i>编辑</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    beforeRouteLeave(to, from, next) {  // 离开是 false
      this.$emit('destroy', false)
      next()
    },
    data() {
      return {
        kDefault: false
      }
    },
    methods: {
      _checkDefault() {
        this.kDefault = !this.kDefault
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/sass/variable";
  @import "../../common/sass/mixin";

  .location {
    background-color: $color-background-e;
    .list {
      margin-top: .27rem /* 10/37.5 */;
      padding: 0 .43rem /* 16/37.5 */;
      background: #fff;
      .title {
        display: flex;
        justify-content: space-between;
        line-height: 1.07rem /* 40/37.5 */;
        font-size: .37rem /* 14/37.5 */;
        color: $color-text-6;
      }
      .text {
        padding-bottom: .27rem /* 10/37.5 */;
        @include border-b-1px(0);
        line-height: 1.4;
        font-size: .37rem /* 14/37.5 */;
        color: $color-text-6;
      }
      .button {
        display: flex;
        height: 1.07rem /* 40/37.5 */;
        align-items: center;
        justify-content: space-between;
      }
      .check-box {
        display: flex;
        align-items: center;
        line-height: 1.07rem /* 40/37.5 */;
        .checkout-all {
          display: block;
          width: .53rem /* 20/37.5 */;
          height: .56rem /* 21/37.5 */;
          background: url('../../common/img/checkbox.png') 0 100% no-repeat;
          background-size: .53rem /* 20/37.5 */;
          border: none;
          &.checked {
            background-position: 0 0;
          }
        }
        .settle-label {
          padding-left: .16rem /* 6/37.5 */;
          font-size: .37rem /* 14/37.5 */;
          color: $color-text;
        }
      }
      .oper {
        font-size: .37rem /* 14/37.5 */;
        color: $color-text;
        .edit,
        .delete {
          padding-left: .27rem /* 10/37.5 */;
          line-height: 1.07rem /* 40/37.5 */;
        }
        .icon-daipingjia {
          padding-right: .11rem /* 4/37.5 */;
          font-size: .43rem /* 16/37.5 */;
        }
        .icon-lajixiang {
          padding-right: .11rem /* 4/37.5 */;
          font-size: .43rem /* 16/37.5 */;
        }
      }
    }
  }
</style>
