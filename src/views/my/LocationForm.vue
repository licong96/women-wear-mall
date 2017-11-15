<template lang="html">
  <!-- 添加新地址 -->
  <section class="full-fixed location-form">
    <div class="main">
      <div class="list">
        <span class="title">收货人：</span>
        <input class="input" type="text" value="">
      </div>
      <div class="list">
        <span class="title">联系电话：</span>
        <input class="input" type="tel" value="">
      </div>
      <div class="list">
        <span class="title">所在地区：</span>
        <input class="input" type="text" v-model="selectedText" readonly @click="showPicker">
      </div>
      <div class="list list-textarea">
        <span class="title">详细地址：</span>
        <textarea class="textarea" name="name" rows="3" cols="6"></textarea>
      </div>
      <div class="default">
        <span class="title">设为默认：</span>
        <label class="label-switch">
          <input type="checkbox" class="switch-input">
          <div class="checkbox"></div>
        </label>
      </div>
    </div>
    <div class="footer-btn waves-effect waves-light" @click="_save">保存</div>
    <!-- 城市选择器 -->
    <city-picker
      @select="handleSelect(3,arguments)"
      :data="data"
      :selected-index="selectedIndex"
      ref="picker"
      :title="title"
      :cancelTxt="cancelTxt"
      :confirmTxt="confirmTxt"></city-picker>
  </section>
</template>

<script>
  import CityPicker from '@/components/CityPicker'
  import {provinceList, cityList, areaList} from '../../data/areaData'

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
        data: [provinceList, cityList, areaList],   // 城市数据
        selectedIndex: [0, 0, 0],   // 默认选择第几个
        selectedText: ''     // 当前选择的地区
      }
    },
    created() {
      this.title = '选择地区'
      this.cancelTxt = '取消'
      this.confirmTxt = '确认'
    },
    mounted() {
    },
    methods: {
      _save() {
        this.$router.back()
      },
      showPicker() {
        let picker = this.$refs.picker
        picker.show()
      },
      handleSelect(index, args) {
        this.selectedText = args[2].join('，')
      }
    },
    components: {
      CityPicker
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/sass/variable";
  @import "../../common/sass/mixin";

  .location-form {
    display: flex;
    flex-direction: column;
    background-color: $color-background-e;
    .main {
      flex: 1;
      margin-top: .27rem /* 10/37.5 */;
    }
    .list {
      display: flex;
      padding: 0 .43rem /* 16/37.5 */;
      @include border-b-1px(0);
      height: 1.33rem /* 50/37.5 */;
      line-height: 1.33rem /* 50/37.5 */;
      background-color: #fff;
      .input {
        flex: 1;
        font-size: .4rem /* 15/37.5 */;
        color: $color-text-d;
        outline: none;
        border: 0;
      }
      .textarea {
        flex: 1;
        padding: .37rem /* 14/37.5 */ 0;
        border: 0;
        height: 1.07rem /* 40/37.5 */;
        line-height: 1.4;
        font-size: .4rem /* 15/37.5 */;
        color: $color-text-d;
        outline: none;
      }
    }
    .list-textarea {
      height: auto;
    }
    .default {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: .27rem /* 10/37.5 */;
      padding: 0 .43rem /* 16/37.5 */;
      height: 1.33rem /* 50/37.5 */;
      background-color: #fff;
    }
  }
  .title {
    min-width: 2.03rem /* 76/37.5 */;
    font-size: .4rem /* 15/37.5 */;
    color: $color-text;
  }
  .footer-btn {
    margin-top: .53rem /* 20/37.5 */;
    width: 100%;
    height: 1.33rem /* 50/37.5 */;
    line-height: 1.33rem /* 50/37.5 */;
    font-size: .43rem /* 16/37.5 */;
    text-align: center;
    background-color: $color-theme;
    color: #fff;
    width: 100%;
  }
</style>
