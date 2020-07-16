<template>
  <div>
    <vue-qr :text="value" :size="Size" :logo-src="LogoSrc" :bg-src="BgSrc" :margin="10" />
  </div>
</template>
<script>

import VueQr from 'vue-qr'

export default {
  name: 'SIdentify',
  components: {
    VueQr
  },
  props: {
    value: { // 显示的值、跳转的地址
      type: String,
      default: 'http://www.baidu.com'
    },
    Size: { // 大小
      type: Number,
      default: 200
    },
    LogoSrc: { // 中心图片url
      type: String,
      // default: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'
      default: ''
    },
    BgSrc: { // 背景图片 url
      type: String,
      // default: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'
      default: ''
    }
  },
  data() {
    return {
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {

  }
}
</script>
