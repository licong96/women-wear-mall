import * as types from './mutations-type'

const matutaions = {
  [types.SET_ROUTER_ANIM](state, routerAnim) {
    state.routerAnim = routerAnim
  },
  [types.SET_SELECT_SIZE_COLOR](state, selectSizeColor) {
    state.selectSizeColor = selectSizeColor
  },
  [types.SET_SWIPER_FULL](state, swiperFull) {
    state.swiperFull = swiperFull
  },
  [types.SET_SWIPER_FULL_INDEX](state, swiperFullIndex) {
    state.swiperFullIndex = swiperFullIndex
  }
}

export default matutaions
