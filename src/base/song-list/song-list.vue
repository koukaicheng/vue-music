<template>
  <div class="song-list">
    <ul>
      <li @click="selectItem(song,index)" v-for="(song, index) in songs" class="item">
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
    <div class="loading-container" v-show="!off">
      <loading :title="'加载中，请稍候'"></loading>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Loading from 'base/loading/loading'
  export default {
    data() {
      return {
        off: false
      }
    },
    props: {
      songs: {
        type: Array,
        default: []
      }
    },
    created() {
      if (this.songs.length > 0) {
        this.off = true
      }
    },
    methods: {
      selectItem(item, index){
        console.log('0')
        this.$emit("slect",item,index)
      },
      getDesc(song) {
        return `${song.singer} · ${song.album}`
      },
    },
    components: {
      Loading
    },
    watch: {
      songs(val) {
        if (val.length !== 0) {
          this.off = true
        }
      }
    },
    created(){
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .song-list
    position: relative
    .loading-container
      position: absolute
      width: 100%
      top: 200px
      transform: translateY(-50%)
    .item
      display: flex
      align-items: center
      box-sizing: border-box
      height: 64px
      font-size: $font-size-medium
      .rank
        flex: 0 0 25px
        width: 25px
        margin-right: 30px
        text-align: center
        .icon
          display: inline-block
          width: 25px
          height: 24px
          background-size: 25px 24px
          &.icon0
            bg-image('first')
          &.icon1
            bg-image('second')
          &.icon2
            bg-image('third')
        .text
          color: $color-theme
          font-size: $font-size-large
      .content
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          no-wrap()
          color: $color-text
        .desc
          no-wrap()
          margin-top: 4px
          color: $color-text-d
</style>
