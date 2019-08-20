/*
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2019-06-17 10:28:18
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-21 01:51:22
 */
import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger' // 实时输出突变的动作和存储的状态
import state from './state'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production' // 开发模式开启，严格模式检查 vuex 数据

export default () => {
  const store = new Vuex.Store({
    state,
    mutations,
    getters,
    strict: debug,
    plugins: debug ? [createLogger()] : []
  })
  if (module.hot) { // vuex 热更换功能
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
