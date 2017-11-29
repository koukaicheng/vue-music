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
  },
  [types.SET_PLAYING_SATE](state, flag) {
    state.playing = flag
  },
  [types.SET_PULL_SCREEN](state, flag) {
    state.funllScreen = flag
  },
  [types.SET_PLAYLIST](state, list) {
    state.playList = list
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAT_MODE](state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  },
}
export default mutations
