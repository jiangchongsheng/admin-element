export default {
  install(Vue, options) {
    Vue.component('identify', () => import('./components/identify/identify.vue')) // 图形验证码
    Vue.component('upload-images', () => import('./components/uploadImages.vue')) // 上传图片

    Vue.component('pagination', () => import('./components/pagination.vue')) // 分页

    Vue.component('verification-code', () => import('./components/verificationCode.vue')) // 手机获取验证码
    Vue.component('qr-code', () => import('./components/qrCode/qrCode.vue')) // 二维码
    Vue.component('js-barcode', () => import('./components/jsBarcode.vue')) // 条形码

    Vue.component('my-chart-china', () => import('./components/myChartChina.vue')) // echarts 中国地图
    Vue.component('my-chart-cake', () => import('./components/myChartCake.vue')) // echarts 饼图
    Vue.component('my-chart-line', () => import('./components/myChartLine.vue')) // echarts 折线图

    Vue.component('copy-msg', () => import('./components/copyMsg/copyMsg.vue')) // 复制组件

    // myChartCake
  }
}
