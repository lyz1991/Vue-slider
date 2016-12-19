// 自定义指令
/* eslint-disable no-unused-vars */
import tool from './tool.js'
let myDirective = {}
myDirective.install = (Vue) => {
  Vue.directive('scroll', {
    movestate: false,
    down: '',
    up: '',
    clientheight: document.documentElement.clientHeight,
    transform: '',
    startY: '',
    ajax: false,
    timer: null,
    bind () {
      this.transform = tool.prefix(this.el, 'transform')
      this.down = this.vm.$els['down']
      this.up = this.vm.$els['up']
    },
    update () {
      this.el.addEventListener('touchstart', (e) => {
        this.movestate = true
        this.ajax = false
        this.startY = e.touches[0].clientY
      })
      this.el.addEventListener('touchmove', (e) => {
        this.move(e)
      })
      this.move = function (e) {
        if (this.movestate) {
          let deltaX = e.changedTouches[0].clientY - this.startY
          if (deltaX > 0 && this.down) {
            let top = this.down.getBoundingClientRect().top
            Math.abs(top) - this.down.offsetHeight <= 10 ? this.expression.match('down') && this.trans(e) : ''
          }
          if (deltaX < 0 && this.up) {
            let offsettop = this.el.offsetParent.getBoundingClientRect().bottom
            offsettop - this.clientheight < 10 ? this.expression.match('up') && this.trans(e, '-') : ''
          }
        }
      }
      this.el.addEventListener('touchend', (e) => {
        this.timer = setTimeout(() => {
          this.ajax && this.vm.callback()
          this.el.style[this.transform] = 'translateY(0px)'
          this.timer = null
        }, 400)
      })
      this.trans = (e, dir = '+') => {
        e.stopPropagation()
        e.preventDefault()
        this.movestate = false
        this.ajax = true
        this.el.style[this.transform] = dir === '+' ? `translateY(${this.down.offsetHeight}px)` : `translateY(-${this.up.offsetHeight}px)`
      }
    },
    unbind () {
      clearTimeout(this.timer)
      this.timer = null
    }
  })
}

export default myDirective
