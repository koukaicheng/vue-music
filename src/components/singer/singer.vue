<template>
 <!--歌手组件-->
  <div class="singer">
    <list-view @select="selectSinger" :data="singers"></list-view>
    <router-view :list="singers"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getSingerList} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import Singer from 'common/js/singer'
  import ListView from 'base/listview/listview'
  import {mapMutations} from 'vuex'

  const HOT_SINGER_LEN = 10
  const HOT_NAME = '热门'
  export default {
    data() {
      return {
        singers: []
      }
    },
    created() {
      this._getSingerList();
    },
    methods: {
      selectSinger(item) {
        this.$router.push({
          path: `/singer/${item.id}`
        });
        this.setSinger(item);
      },
      _getSingerList() {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singers = this._normalizeSinger(res.data.list)
          }
        })
      },
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LEN) {
            map.hot.items.push(new Singer({
              name: item.Fsinger_name,
              id: item.Fsinger_mid
            }))
          }
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        })
        let hot = []
        let ret = []
        for (let k in map) {
          let val = map[k]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.codePointAt(0) - b.title.codePointAt(0)
        })
        return hot.concat(ret)
      },
      ...mapMutations({
        setSinger: 'SET_SINGGER'
      })
    },
    components: {
      ListView
    }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
