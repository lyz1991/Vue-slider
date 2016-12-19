<style src='./less/slider.less' lang="less" scoped></style>
<template>
<div class="slidercontainer">
  <div class="slider" @touchstart="start($event)" @touchend="check($event)" @touchmove="move($event)" v-el:slider>
    <div class="slider_append"><img :src="items[slider.items.length - 1]"></div>
  <div v-for="item in slider.items" @click="show($index)">
    <img :src="item">
  </div>
    <div class="slider_append"><img :src="slider.items[0]"></div>
  </div>
  <div :class="cla">
    {{idx}}/{{slider.items.length}}
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      startX: '',
      timer: '',
      idx: 1,
      radio: ''
    }
  },
  ready () {
    this.autoslider()
  },
  props: {
    slider: {
      type: Object,
      default: function () {
        return {
          items: ['../../static/img/user/index-bg.png', '../../static/img/user/index_nav.png', '../../static/img/search/search_bg.png'],
          idx: 0,
          callback: false
        }
      }
    },
    cla: {
      type: String,
      default: 'num'
    }
  },
  computed: {
    clientX: function () {
      return document.documentElement.clientWidth
    },
    transform: function () {
      return this.$m.prefix(this.$els.slider, 'transform')
    },
    transition: function () {
      return this.$m.prefix(this.$els.slider, 'transition')
    }
  },
  methods: {
    autoslider () {
      if (!this.slider.callback) {
        this.timer = setInterval(() => {
          this.swipe('l')
        }, 1000)
      }
    },
    start (e) {
      this.startX = e.touches[0].clientX
      clearInterval(this.timer)
      this.timer = null
    },
    check (e) {
      let deltaX = e.changedTouches[0].clientX - this.startX
      Math.abs(this.radio) > 0.5 ? deltaX > 0 ? this.swipe('r') : this.swipe('l') : this.go(400, this.idx)
      this.radio = 0
      this.autoslider()
    },
    go (time, idx) {
      this.$els.slider.style[this.transition] = `all ${time}ms ease`
      this.$els.slider.style[this.transform] = `translate(${-10 * idx}rem, 0)`
    },
    move (e) {
      e.preventDefault()
      this.radio = (e.changedTouches[0].clientX - this.startX) / this.clientX
      this.$els.slider.style[this.transform] = `translate(${this.radio * 10 - 10 * this.idx}rem, 0)`
    },
    swipe (dir) {
      dir === 'r' ? this.go(400, --this.idx) : this.go(400, ++this.idx)
      if (this.idx <= 0 || this.idx > this.slider.items.length) {
        this.idx = this.idx > 0 ? 1 : this.slider.items.length
        this.$els.slider.addEventListener('webkitTransitionEnd', this.end)
      }
    },
    end () {
      this.go(0, this.idx)
      this.$els.slider.removeEventListener('webkitTransitionEnd', this.end)
    },
    show ($index) {
      this.slider = Object.assign({}, this.slider, {state: true, idx: $index, callback: true})
    }
  },
  beforeDestroy () {
    document.removeEventListener('webkitTransitionEnd', this.end)
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>
