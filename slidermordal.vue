<style src="./less/slider.less" lang="less" scoped></style>
<style lang="less">
  .mynum {
    position: fixed;
    bottom: 84/75rem;
    left: 50%;
    transform: translate(-50%, 0);
    text-align: center;
    color: white;
  }
</style>
<template>
  <div v-if="myslider.state" v-cloak>
    <mordal :opac="1" @click="hide()"></mordal>
    <slider v-ref:slider :slider="myslider" :cla="'mynum'"></slider>
  </div>
</template>
<script>
  import slider from './slider.vue'
  import mordal from './mordal.vue'
  export default {
    data () {
      return {
        startX: '',
        transform: ''
      }
    },
    props: {
      myslider: {
        type: Object,
        default: function () {
          return {
            state: false,
            callback: true,
            items: []
          }
        }
      }
    },
    methods: {
      start (e) {
        this.startX = e.touches[0].clientX
      },
      hide () {
        this.myslider.callback = false
        this.myslider.state = false
      }
    },
    watch: {
      'myslider.state': function () {
        if (this.myslider.state) {
          let idx = this.myslider.idx
          let dom = this.$refs.slider.$els.slider
          this.transform = this.$m.prefix(dom, 'transform')
          this.$refs.slider.$data.idx = idx + 1
          dom.style[this.transform] = `translate(${-10 * (idx + 1)}rem, 0)`
        }
      }
    },
    components: {mordal, slider}
  }
</script>
