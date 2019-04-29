export default {
  install(Vue, options) {
    Vue.component('identify', () => import('./identify.vue')) // 图形验证码
  }
}
