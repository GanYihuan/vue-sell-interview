import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import state from './state'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production' // development mode is on, strict mode check vuex data

export default new Vuex.Store({
  state,
  getters,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
