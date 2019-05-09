export default {
  install(Vue, options) {
    Vue.component('identify', () => import('./components/identify.vue')) // 图形验证码
    Vue.component('upload-images', () => import('./components/uploadImages.vue')) // 上传图片
    Vue.component('pagination', () => import('./components/pagination.vue')) // 图形验证码
    Vue.component('verification-code', () => import('./components/verificationCode.vue')) // 手机获取验证码
    Vue.component('qr-code', () => import('./components/qrCode.vue')) // 二维码
  }
}
