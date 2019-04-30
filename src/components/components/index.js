export default {
  install(Vue, options) {
    Vue.component('identify', () => import('./identify.vue')) // 图形验证码
    Vue.component('upload-images', () => import('./uploadImages.vue')) // 图形验证码
  }
}
