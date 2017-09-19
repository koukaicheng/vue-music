<template>
  <div v-if="!this.length">
    <span :class="['vux-badge', {'vux-badge-dot': typeof text === 'undefined', 'vux-badge-single': typeof text !== 'undefined' && text.toString().length === 1,'none':Number(text)===0}]">
      {{thisVlaue}}
    </span>
  </div>
  <div v-else-if="this.length&& /^[0-9]+.?[0-9]*$/.test(this.text)">
    <span class="big" style="display: inline-block;font-size: 55px;" @click="big">+</span>
    <span :class="['vux-badge', {'vux-badge-dot': typeof text === 'undefined', 'vux-badge-single': typeof text !== 'undefined' && text.toString().length === 1,'none':Number(text)===0}]">
      {{thisVlaue}}
    </span>
    <span class="small" style="display: inline-block;font-size: 55px;" @click="small">-</span>
  </div>
</template>

<script type="text/ecmascript-6">
const reg = /^[0-9]+.?[0-9]*$/
export default {
  data() {
    return {
      thisText: [String, Number]
    }
  },
  mounted() {
    this.thisText = this.text
  },
  props: {
    text: [String, Number],
    length: [String, Number]
  },
  methods: {
    big() {
      if (reg.test(this.thisText)) {
        this.thisText++
      } else {
        return
      }
    },
    small() {
      if (reg.test(this.thisText)) {
        this.thisText--
      } else {
        return
      }
    }
  },
  computed: {
    thisVlaue() {
      var maxnum = Math.pow(10, this.length) - 1
      if (typeof this.thisText === 'string') {
        if (reg.test(this.thisText)) {
          if (this.thisText > maxnum) {
            return String(maxnum + '+')
          } else {
            return this.thisText
          }
        } else {
          return this.thisText
        }
      }
      if (typeof this.thisText === 'number') {
        if (reg.test(this.thisText)) {
          if (this.thisText > maxnum) {
            return String(maxnum + '+')
          } else {
            return this.thisText
          }
        } else {
          return this.thisText
        }
      }
    }
  }
}
</script>


<style lang="stylus" rel="stylesheet/stylus">
 .vux-badge 
   display: inline-block
   text-align: center
   background:red
   color: #fff
   font-size: 12px
   height: 16px
   line-height: 16px
   border-radius: 8px
   padding: 0 6px
   background-clip: padding-box
   vertical-align: middle
 .vux-badge-single 
   padding: 0
   width: 16px
 .vux-badge-dot 
   height: auto
   padding: 5px  
 .none
   display: none    



</style>
