import * as types from './mutation-types'

const mutations = {
  [types.SET_BADCOMMENT](state, bool) {
    state.badComment = bool
  },
  [types.SET_SELLNAME](state, name) {
    state.sellerName = name
  },
  [types.SET_SELLIMAGE](state, image) {
    state.sellerImage = image
  },
  [types.SET_EVALUATEINDEX](state, num) {
    state.evaluateIndex = num
  }
}

export default mutations
