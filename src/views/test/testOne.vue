<template>
  <div>
    <identify v-model="aaa" />
    <verification-code />
    <qr-code />

    <copy-msg :msg="aaa" text="复制图形验证码"/>

    <copy-msg msg="13445"/>

    <!-- <ckeditor /> -->
    <div @click="aaaa">213123123123123</div>

  </copy-msg></div>

</template>

<script>
export default {
  data() {
    return {
      aaa: 'http://www-ailife-com.oss-cn-hangzhou.aliyuncs.com/case/case1/1553527101%281%29.jpg?OSSAccessKeyId=LTAIvttg6wOdyVpu&Expires=1560482618&Signature=vS4AEv29YtwSSoM3k7kCOK2hdiA%3D'
    }
  },
  methods: {
    aaaa() {
      window.open(this.aaa)
      // alert(1)
      // var alink = document.createElement('a')
      // // 将a的download属性设置为我们想要下载的图片名称
      // alink.download = 'aaa.jpg'
      // // 将生成的URL设置为a.href属性
      // alink.href = this.aaa
      // // // 触发a的单击事件
      // alink.click()
    }
  }
}

</script>

<style></style>
