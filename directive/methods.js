let myMethods = {}
myMethods.install = function (Vue) {
  let methods = {
    /**
     * 移除localStorage里面一项
     * @author zhaoguoxu
     * @param  {[Sting]} name [description]
     */
    prefix (el, cla) {
      let pre = ['', '-webkit-', '-moz-', '-ms-', '-o-']
      for (let i = 0, t = pre.length; i < t; i++) {
        let vender = pre[i] + cla
        if (vender in el.style) {
          return vender
        }
      }
    }
  }
  Vue.prototype.$m = methods
}
export default myMethods
