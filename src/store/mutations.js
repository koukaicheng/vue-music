import * as types from './mutations-types'
const mutations = {
  [types.SET_SINGGER](state, singer) {
    state.singer = singer
  }
}
export default mutations