const state = {
  listDetail: {},
  routerAnim: false,     // 全局匹配路由切换动画状态
  selectSizeColor: false,  // 打开或关闭，选择商品颜色、尺寸
  specificationData: {},  // 商品参数
  swiperFull: [],     // 全屏预览的轮播图片数据
  swiperFullIndex: 0,  // 全屏预览的轮播图片当前的 initialSlide
  alertHint: {},     // 弹出提示
  stateOrder: false    // 用户操作状态提示 之 订单提交
}

export default state
