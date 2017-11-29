import {playMode} from 'common/js/config'

const state = {
  // get singer() {
  //   return JSON.parse(window.localStorage.getItem('SINGER')) || {}
  // }
  singer: {},  //  歌手详情
  playing: false, //  播放状态
  funllScreen: false, //  播放器展开状态
  playList: [], // 播放列表
  sequenceList: [], // 顺序列表
  mode: playMode.sequence,  //  播放模式
  currentIndex: -1 //  播放歌曲索引
}

export default state
