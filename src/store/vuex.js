import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import state from './state'
import mutations from './mutations'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production' // development mode is on, strict mode check vuex data

// export default new Vuex.Store({
//   state,
//   mutations,
//   strict: debug,
//   plugins: debug ? [createLogger()] : [],
//   modules: {}
// })

export default () => {
  const store = new Vuex.Store({
    state,
    mutations,
    strict: debug,
    plugins: debug ? [createLogger()] : [],
    modules: {}
  })
  if (module.hot) { // vuex Hot replacement function
    module.hot.accept(
      [
        './state/state',
        './mutations/mutations',
        './actions/actions',
        './getters/getters'
      ],
      () => {
        const newState = require('./state/state').default
        const newMutations = require('./mutations/mutations').default
        const newActions = require('./actions/actions').default
        const newGetters = require('./getters/getters').default
        store.hotUpdate({
          state: newState,
          mutations: newMutations,
          getters: newGetters,
          actions: newActions
        })
      }
    )
  }
  return store
}
