import * as types from './mutations-types'

const mutations = {
  [types.SET_SINGGER](state, singer) {
    // let SINGER = window.localStorage.getItem('SINGER')
    // if (!SINGER) SINGER = {}
    // if (singer) {
    //   SINGER = singer
    //   state.singer = singer
    // }
    // window.localStorage.setItem('SINGER', JSON.stringify(SINGER));
    state.singer = singer
  }
}
export default mutations
