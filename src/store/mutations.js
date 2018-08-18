import * as types from './mutations-type'

const matutaions = {
  [types.SET_LIST_DETAIL](state, listDetail) {
    state.listDetail = listDetail
  },
  [types.SET_ROUTER_ANIM](state, routerAnim) {
    state.routerAnim = routerAnim
  },
  [types.SET_SPECIFICATION_DATA](state, specificationData) {
    state.specificationData = specificationData
  },
  [types.SET_SWIPER_FULL](state, swiperFull) {
    state.swiperFull = swiperFull
  },
  [types.SET_SWIPER_FULL_INDEX](state, swiperFullIndex) {
    state.swiperFullIndex = swiperFullIndex
  },
  [types.SET_ALERT_HINT](state, alertHint) {
    state.alertHint = alertHint
  },
  [types.SET_STATE_ORDER](state, stateOrder) {
    state.stateOrder = stateOrder
  },
}

export default matutaions
