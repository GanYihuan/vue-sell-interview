import * as types from './mutation-types'

const mutations = {
  [types.SET_BADCOMMENT](state, bool) {
    state.badComment = bool
  }
}

export default mutations
