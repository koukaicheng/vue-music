<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div ref="play" class="play-wrapper">
        <div class="play" v-show="songs.length>0">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scorll @scroll="scroll" :probe-type="probeType" :listen-scroll="listenScroll" :data="songs" class="list"
            ref="list">
      <div class="song-list-wrapper">
        <song-list @slect="slectItem" :songs="songs"></song-list>
      </div>
    </scorll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scorll from 'base/scroll/scroll'
  import SongList from 'base/song-list/song-list'
  import {prefixStyle, domStyle} from 'common/js/dom'
  import {mapActions} from 'vuex'
//  const transform = prefixStyle('transform')
//  const backdrop = prefixStyle('backdrop-filter')
  const RESERVED_HEIGHT = 40
  export default {
    props: {
      bgImage: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        scrollY: 0
      }
    },
    created() {
      this.probeType = 3
      this.listenScroll = true
    },
    methods: {
      back() {
        this.$router.back()
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      slectItem(item, index) {
         console.log('1')
        this.selectPlay({
          list: this.songs,
          index: index
        })
      },
      ...mapActions([
        'selectPlay'
      ])
    },
    watch: {
      scrollY(newY) {
        let tranlateY = Math.max(this.minTranslateY, newY)
        let zIndex = 0
        let scale = 1
        let blur = 0
        domStyle({"transform": {dom: this.$refs.layer, val: `translate3d(0,${tranlateY}px, 0)`}})
        const percent = Math.abs(newY / this.imageHright)
        if (newY > 0) {
          scale += percent
          zIndex = 10
        } else {
          blur = Math.min(20 * percent, 20)
        }
        domStyle({"backdrop-filter": {dom: this.$refs.filter, val: `blur(${blur}px)`}})
        domStyle()
        if (newY < tranlateY) {
          zIndex = 10
          domStyle({
            'display': {dom: this.$refs.play, val: 'none'},
            "paddingTop": {dom: this.$refs.bgImage, val: 0},
            "height": {dom: this.$refs.bgImage, val: `${RESERVED_HEIGHT}px`}
          })
        } else {
          domStyle({
            'display': {dom: this.$refs.play, val: 'block'},
            "paddingTop": {dom: this.$refs.bgImage, val: '70%'},
            "height": {dom: this.$refs.bgImage, val: 0}
          })
        }
        domStyle({
          'zIndex': {dom: this.$refs.bgImage, val: zIndex},
          'transform': {dom: this.$refs.bgImage, val: `scale(${scale})`}
        })
      }
    },
    mounted() {
      this.imageHright = this.$refs.bgImage.clientHeight
      this.minTranslateY = -this.imageHright + RESERVED_HEIGHT
      this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`
    },
    computed: {
      bgStyle() {
        return `background-image:url(${this.bgImage})`
      }
    },
    components: {
      Scorll,
      SongList
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
