import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger' // output the mutation's action and the state of the store in real time
import state from './state'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production' // development mode is on, strict mode check vuex data

export default () => {
  const store = new Vuex.Store({
    state,
    mutations,
    getters,
    strict: debug,
    plugins: debug ? [createLogger()] : [],
    modules: {}
  })
  if (module.hot) { // vuex Hot replacement function
    module.hot.accept(
      [
        './state',
        './mutations',
        './getters'
      ],
      () => {
        const newState = require('./state').default
        const newMutations = require('./mutations').default
        const newGetters = require('./getters').default
        store.hotUpdate({
          state: newState,
          mutations: newMutations,
          getters: newGetters
        })
      }
    )
  }
  return store
}
