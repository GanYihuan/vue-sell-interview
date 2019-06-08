import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production' // development mode is on, strict mode check vuex data

export default new Vuex.Store({
  state: {
    dateType: 'YYYY-MM-DD hh:mm:ss'
  },
  mutations: {

  },
  actions: {

  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
